import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fileDownload from 'js-file-download';

import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  async function createPdf() {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;
    page.drawText(name, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();
    fileDownload(pdfBytes, 'pdf-lib_creation_example.pdf');
  }

  const cleanUp = () => {
    setName('');
    setTopic('');
    setSelectedFile(null);
  };

  async function modifyPdf() {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const existingPdfBytes = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const page = pages[0];

    const jpgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=jpg&data=${name} ${topic} date: ${new Date()}`;

    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());

    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

    const jpgDims = jpgImage.scale(0.75);

    page.drawImage(jpgImage, {
      x: 130,
      y: 100,
      width: jpgDims.width,
      height: jpgDims.height,
    });

    const pdfBytes = await pdfDoc.save();
    fileDownload(pdfBytes, `Certificate for ${name}.pdf`);
    cleanUp();
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={() => modifyPdf()}>Modify PDF</button>
      </div>
    </>
  );
};

export default App;

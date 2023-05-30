import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fileDownload from 'js-file-download';

import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [stamped, setStamped] = useState('');

  const cleanUp = () => {
    setName('');
    setTopic('');
    setStamped('');
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

    setStamped(pdfBytes);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const downloadFile = () => {
    fileDownload(stamped, `Certificate for ${name}.pdf`);
    cleanUp();
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
        {stamped && (
          <object
            data={URL.createObjectURL(
              new Blob([stamped], { type: 'application/pdf' })
            )}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>PDF preview is not available</p>
          </object>
        )}
        {!stamped ? (
          <button onClick={() => modifyPdf()}>Preview PDF</button>
        ) : (
          <button onClick={() => downloadFile()}>Download PDF</button>
        )}
      </div>
    </>
  );
};

export default App;

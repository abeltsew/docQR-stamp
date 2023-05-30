import { useEffect, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fileDownload from 'js-file-download';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');

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

  async function modifyPdf() {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const page = pages[0];

    const jpgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=jpg&data=${
      name + topic
    }`;

    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());

    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

    const jpgDims = jpgImage.scale(0.5);

    page.drawImage(jpgImage, {
      x: 200,
      y: 400,
      width: jpgDims.width,
      height: jpgDims.height,
    });

    const pdfBytes = await pdfDoc.save();
    fileDownload(pdfBytes, 'pdf-lib_creation_example.pdf');
  }

  return (
    <>
      <div>
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
        <button onClick={() => createPdf()}>Create PDF</button>
        <button onClick={() => modifyPdf()}>Modify PDF</button>
        {/* {name && (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=jpg&data=${name}`}
          />
        )} */}
      </div>
    </>
  );
};

export default App;

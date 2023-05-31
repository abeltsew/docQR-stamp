import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fileDownload from 'js-file-download';

import './stamper.css';

const Stamper = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [x, setX] = useState(130);
  const [y, setY] = useState(100);
  const [stamped, setStamped] = useState('');

  const [jpgBytes, setJpgBytes] = useState('');

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

    let jpgImage;

    if (!jpgBytes) {
      const jB = await fetch(jpgUrl).then((res) => res.arrayBuffer());
      setJpgBytes(jB);
      jpgImage = await pdfDoc.embedJpg(jB);
    } else {
      jpgImage = await pdfDoc.embedJpg(jpgBytes);
    }

    const jpgDims = jpgImage.scale(0.75);

    page.drawImage(jpgImage, {
      x,
      y,
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
    <main className="flex flex-col flex-wrap justify-center md:items-center md:flex-row pt-14">
      <div className="flex flex-col justify-center items-center text-center gap-5 flex-1 ">
        <img className="w-[10rem] h-[10rem]" src="logo.png" alt="logo" />
        <h2>Fill in the information to include in the QR code</h2>
        <label htmlFor="name">Name</label>
        <input
          className="p-[1rem] w-3/4 md:w-1/2"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="content">Content</label>
        <input
          className="p-[1rem] w-3/4 md:w-1/2"
          id="content"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <label htmlFor="upload">Load Original</label>
        <input
          id="upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <p className="w-3/4 md:w-1/2 text-yellow-500">
          Please be assured that your document remains strictly on your device,
          ensuring utmost privacy and confidentiality.
        </p>
        {!stamped && <button onClick={() => modifyPdf()}>Preview PDF</button>}
      </div>
      <div className="flex justify-center flex-1 md:h-screen">
        {stamped && (
          <>
            <div className="flex relative w-full px-10">
              <input
                className="vertical-slider"
                type="range"
                min="0"
                max="500"
                value={y}
                onChange={(e) => {
                  setY(Number(e.target.value));
                  modifyPdf();
                }}
              />
              <div className="w-full h-screen">
                {' '}
                <h2 className="text-center pb-5">
                  Move the sliders to adjust th QR code's position
                </h2>
                <object
                  className="flex-1 w-full "
                  data={URL.createObjectURL(
                    new Blob([stamped], { type: 'application/pdf' })
                  )}
                  type="application/pdf"
                  width="100%"
                  height="75%"
                >
                  <p>PDF preview is not available</p>
                </object>
                <input
                  className="py-[2rem] w-full"
                  type="range"
                  min="0"
                  max="500"
                  value={x}
                  onChange={(e) => {
                    setX(Number(e.target.value));
                    modifyPdf();
                  }}
                />
                {stamped && (
                  <button
                    className="flex m-auto"
                    onClick={() => downloadFile()}
                  >
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Stamper;

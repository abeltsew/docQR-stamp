import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fileDownload from 'js-file-download';

import Stamper from './components/Stamper';
import Header from './components/header';

const App = () => {
  return (
    <>
      <Header />
      <Stamper />
    </>
  );
};

export default App;

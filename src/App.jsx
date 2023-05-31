import Stamper from './components/Stamper';
import Header from './components/header';

const App = () => {
  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center pt-14 text-center">
        <div className="flex justify-center items-center w-full  ">
          <div className="flex flex-col gap-10 justify-center items-center w-full">
            <p className="text-5xl ">
              The easiest way to Stamp a QR code on a document
            </p>
            <p className="text-2xl ">
              Stamp your Document with QR code to accredit it, its completly
              free!!
            </p>
            <button>
              <a href="#main">Get Started</a>
            </button>
          </div>

          <img
            className="hidden md:flex justify-center items-center w-1/2 shadow-2xl m-14 animate-pulse"
            src="QR-Stamper.png"
            alt="demo"
          />
        </div>
        <div className=" w-full p-16 md:p-16 md:px-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <h2 className="text-4xl pb-10">How It Works</h2>
          <ul className="flex flex-wrap gap-10 justify-between text-left">
            <li className=" flex gap-3 text-black bg-white p-4 rounded-lg flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>
                <h2 className="text-3xl">1. Load Document</h2>
                <p>
                  Load document and enter the text that you want to be in the QR
                  code.
                </p>
              </div>
            </li>
            <li className=" flex gap-3  text-black bg-white p-4 rounded-lg flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              <div>
                <h2 className="text-3xl">2. Adjust QR code Position</h2>
                <p>
                  Adjust the QR code in the document preview using the sliders.
                </p>
              </div>
            </li>
            <li className=" flex gap-3  text-black bg-white p-4 rounded-lg flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <div>
                <h2 className="text-3xl">3. Download</h2>
                <p>Download your file with the QR code stamped.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <Stamper />
    </>
  );
};

export default App;

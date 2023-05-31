const Header = () => {
  return (
    <ul className="flex p-3 justify-between items-center bg-slate-900 w-screen fixed z-50">
      <li className="flex-1">Doc-QR-Stamper</li>
      <li className="px-5">Email</li>
      <li>
        <button>
          <a href="#main">Get Started</a>
        </button>
      </li>
    </ul>
  );
};

export default Header;

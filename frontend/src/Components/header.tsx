import MenuButton from "./menuButton";

const Header: React.FC = function () {
  return (
    <header className="w-full h-20 bg-white fixed top-0 left-0 shadow-md flex items-center px-6  justify-between z-20">
      <div>
        <img src="logo.png" alt="logo" className="w-20"/>
      </div>
      <div>
        <p className="text-2xl font-bold ml-4">Teste 2</p>
      </div>
      <div>
        <MenuButton label="Menu" />
      </div>
    </header>
  );
}

export default Header;
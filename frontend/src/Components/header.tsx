import MenuButton from "./menuButton";

const Header: React.FC = function () {
  return (
    <header className="w-full h-20 bg-white fixed top-0 left-0 shadow-md flex items-center px-6 border justify-between border-white rounded-sm z-20">
      <div>
        <p>Logo</p>
      </div>
      <div>
        <p className="text-2xl font-bold ml-4">Teste2</p>
      </div>
      <div>
        <MenuButton label="Menu" />
      </div>
    </header>
  );
}

export default Header;
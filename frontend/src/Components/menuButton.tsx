import { Menu } from "lucide-react";

interface Props {
    label?: string;
    onClick?: () => void;
}
const MenuButton: React.FC<Props> = ({onClick}) => {
    return (
        <button className="w-[150%] items-center justify-center flex h-10 ml-auto border border-black rounded-md bg-white hover:bg-blue-400"
            onClick={onClick}>
            <Menu />
        </button>
    )
}

export default MenuButton;
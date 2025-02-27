import { render, screen, fireEvent } from "@testing-library/react";
import MenuButton from "./menuButton";
import "@testing-library/jest-dom"; // Para o toBeInTheDocument

describe("MenuButton", () => {
  test("deve renderizar com o texto padrão 'Menu'", () => {
    render(<MenuButton />);  
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  test("deve permitir alterar o texto do botão via prop", () => {
    render(<MenuButton label="Abrir" />);
    expect(screen.getByText("Abrir")).toBeInTheDocument();
  });

  test("deve chamar a função onClick ao ser clicado", () => {
    const handleClick = jest.fn();
    render(<MenuButton label="Menu" onClick={handleClick} />);

    const button = screen.getByText("Menu");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

export {};
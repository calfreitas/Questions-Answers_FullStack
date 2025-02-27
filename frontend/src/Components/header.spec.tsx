import {act, render, screen } from "@testing-library/react";
import Header from "./header"; // Corrija o caminho se necessário
import "@testing-library/jest-dom";

describe("Header", () => {
  test("deve renderizar o componente sem erros", () => {
    act(() => {
      render(<Header />);
    });
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    const menuButton = screen.getByText("Menu");
    expect(menuButton).toBeInTheDocument();
  });
});

export {};
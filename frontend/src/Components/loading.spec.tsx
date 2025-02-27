import { render, screen, fireEvent } from "@testing-library/react";
import Loading from "./menuButton";
import "@testing-library/jest-dom"; // Para o toBeInTheDocument

describe('Teste para o componente loading', () => {
    test('deve renderizar o componente sem erros', () => {
        render(<Loading label="loading..."/>);
        expect(screen.getByText('loading...')).toBeInTheDocument();
    });
});

export {};
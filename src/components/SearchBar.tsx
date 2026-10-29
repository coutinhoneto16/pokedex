import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onBuscar: (termo: string) => void;
}

export default function SearchBar({ onBuscar }: SearchBarProps) {
  const [valor, setValor] = useState("");

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    onBuscar(valor.toLowerCase().trim());
  }

  return (
    <form className="search-bar" onSubmit={enviar}>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Digite o nome (ex.: pikachu)"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

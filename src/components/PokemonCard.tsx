import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.nome.toUpperCase()}</h2>
      <img src={pokemon.imagem ?? ""} alt={pokemon.nome} width="180" />
      <p>Altura: {pokemon.altura}</p>
      <p>Peso: {pokemon.peso}</p>
    </div>
  );
}

import type { Evolucao, Pokemon } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  species: { url: string };
}

interface SpeciesApiResponse {
  evolution_chain: { url: string };
}

interface ChainLink {
  species: { name: string };
  evolves_to: ChainLink[];
}

interface EvolutionChainApiResponse {
  chain: ChainLink;
}

async function buscarJson<T>(url: string): Promise<T> {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error("Falha ao consultar a PokéAPI.");
  }
  return (await resposta.json()) as T;
}

// Percorre a cadeia seguindo apenas evolves_to[0] em cada nível.
function extrairNomes(chain: ChainLink): string[] {
  const nomes: string[] = [];
  let atual: ChainLink | undefined = chain;
  while (atual) {
    nomes.push(atual.species.name);
    atual = atual.evolves_to[0];
  }
  return nomes;
}

export async function buscarPokemon(nome: string): Promise<Pokemon> {
  const resposta = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(nome)}`);
  if (!resposta.ok) {
    throw new Error("Pokémon não encontrado.");
  }
  const dados = (await resposta.json()) as PokemonApiResponse;

  const especie = await buscarJson<SpeciesApiResponse>(dados.species.url);
  const cadeia = await buscarJson<EvolutionChainApiResponse>(especie.evolution_chain.url);
  const nomes = extrairNomes(cadeia.chain);

  const evolucoes: Evolucao[] = await Promise.all(
    nomes.map(async (n) => {
      const evo = await buscarJson<PokemonApiResponse>(`${BASE_URL}/pokemon/${n}`);
      return { id: evo.id, nome: evo.name, imagem: evo.sprites.front_default };
    }),
  );

  return {
    id: dados.id,
    nome: dados.name,
    imagem: dados.sprites.front_default,
    altura: dados.height,
    peso: dados.weight,
    evolucoes,
  };
}

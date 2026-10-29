export interface Evolucao {
  id: number;
  nome: string;
  imagem: string | null;
}

export interface Pokemon {
  id: number;
  nome: string;
  imagem: string | null;
  altura: number;
  peso: number;
  evolucoes: Evolucao[];
}

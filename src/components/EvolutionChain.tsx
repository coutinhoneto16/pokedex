import type { Evolucao } from "../types/pokemon";

interface EvolutionChainProps {
  evolucoes: Evolucao[];
}

export default function EvolutionChain({ evolucoes }: EvolutionChainProps) {
  if (evolucoes.length <= 1) {
    return null;
  }

  return (
    <section>
      <h3>Cadeia de evolução</h3>
      <div className="evolucoes-lista">
        {evolucoes.map((evolucao, index) => (
          <div key={evolucao.id} className="evolucao-item">
            <div className="evolucao-card">
              <img src={evolucao.imagem ?? ""} alt={evolucao.nome} width="120" />
              <p>{evolucao.nome.toUpperCase()}</p>
            </div>
            {index < evolucoes.length - 1 && <span className="seta">→</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

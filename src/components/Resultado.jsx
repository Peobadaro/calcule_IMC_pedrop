const classificacoes = {
  masculino: [
    { faixa: [2, 5], texto: 'Essencial' },
    { faixa: [6, 13], texto: 'Atleta' },
    { faixa: [14, 17], texto: 'Fitness' },
    { faixa: [18, 24], texto: 'Média (normal)' },
    { faixa: [25, 100], texto: 'Acima do ideal' },
  ],
  feminino: [
    { faixa: [10, 13], texto: 'Essencial' },
    { faixa: [14, 20], texto: 'Atleta' },
    { faixa: [21, 24], texto: 'Fitness' },
    { faixa: [25, 31], texto: 'Média (normal)' },
    { faixa: [32, 100], texto: 'Acima do ideal' },
  ],
};

function classificaGordura(imc, sexo) {
  const lista = classificacoes[sexo];
  for (let i of lista) {
    if (imc >= i.faixa[0] && imc <= i.faixa[1]) return i.texto;
  }
  return 'Valor fora da faixa estimada';
}

function Resultado({ imc, sexo }) {
  return (
    <div>
      <h2>Seu IMC: {imc}</h2>
      <p>Classificação: {classificaGordura(imc, sexo)}</p>
    </div>
  );
}

export default Resultado;

import { useState } from 'react';
import estilos from '../styles/form.module.css';
import Resultado from './Resultado';

function Formulario() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState('masculino');

  const alturaM = parseFloat(altura) / 100;
  const imc = alturaM && peso ? (peso / (alturaM * alturaM)).toFixed(1) : null;

  return (
    <div className={estilos.container}>
      <h1>Calculadora de IMC</h1>
      <input type="number" placeholder="Altura (cm)" value={altura} onChange={e => setAltura(e.target.value)} />
      <input type="number" placeholder="Peso (kg)" value={peso} onChange={e => setPeso(e.target.value)} />
      <select value={sexo} onChange={e => setSexo(e.target.value)}>
        <option value="masculino">Homem</option>
        <option value="feminino">Mulher</option>
      </select>

      {imc && <Resultado imc={imc} sexo={sexo} />}
    </div>
  );
}

export default Formulario;

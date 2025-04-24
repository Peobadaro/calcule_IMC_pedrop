import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #f5f5f7;
  padding: 2rem;
  border-radius: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #1d1d1f;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071e3;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
  }
`;

const Button = styled(motion.button)`
  background: #0071e3;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0077ed;
  }
`;

const ResultContainer = styled(motion.div)`
  margin-top: 2rem;
  padding: 2rem;
  background: #f5f5f7;
  border-radius: 12px;
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  color: #1d1d1f;
  margin-bottom: 1rem;
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
`;

const ClassificationTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #d2d2d7;
  color: #1d1d1f;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #d2d2d7;
  color: #1d1d1f;
`;

const BMI_RANGES = {
  male: {
    essential: { min: 2, max: 5 },
    athlete: { min: 6, max: 13 },
    fitness: { min: 14, max: 17 },
    normal: { min: 18, max: 24 },
    aboveIdeal: { min: 25, max: 100 }
  },
  female: {
    essential: { min: 10, max: 13 },
    athlete: { min: 14, max: 20 },
    fitness: { min: 21, max: 24 },
    normal: { min: 25, max: 31 },
    aboveIdeal: { min: 32, max: 100 }
  }
};

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [classification, setClassification] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    const ranges = BMI_RANGES[gender];
    let classification = '';

    if (bmiValue >= ranges.aboveIdeal.min) {
      classification = 'Acima do ideal';
    } else if (bmiValue >= ranges.normal.min && bmiValue <= ranges.normal.max) {
      classification = 'Média (normal)';
    } else if (bmiValue >= ranges.fitness.min && bmiValue <= ranges.fitness.max) {
      classification = 'Fitness';
    } else if (bmiValue >= ranges.athlete.min && bmiValue <= ranges.athlete.max) {
      classification = 'Atleta';
    } else if (bmiValue >= ranges.essential.min && bmiValue <= ranges.essential.max) {
      classification = 'Essencial';
    }

    setClassification(classification);
  };

  return (
    <Container>
      <Title>Calculadora de IMC</Title>
      <Form onSubmit={calculateBMI}>
        <InputGroup>
          <Label>Gênero</Label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d2d2d7',
              borderRadius: '8px',
              fontSize: '1rem',
              background: 'white'
            }}
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </InputGroup>
        <InputGroup>
          <Label>Altura (cm)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Digite sua altura em centímetros"
          />
        </InputGroup>
        <InputGroup>
          <Label>Peso (kg)</Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Digite seu peso em quilogramas"
          />
        </InputGroup>
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Calcular IMC
        </Button>
      </Form>

      {bmi && (
        <ResultContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResultTitle>Resultado</ResultTitle>
          <ResultText>Seu IMC: {bmi}</ResultText>
          <ResultText>Classificação: {classification}</ResultText>

          <ClassificationTable>
            <thead>
              <tr>
                <TableHeader>Faixa de gordura corporal</TableHeader>
                <TableHeader>Classificação</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>Essencial</TableCell>
                <TableCell>{gender === 'male' ? '2-5%' : '10-13%'}</TableCell>
              </tr>
              <tr>
                <TableCell>Atleta</TableCell>
                <TableCell>{gender === 'male' ? '6-13%' : '14-20%'}</TableCell>
              </tr>
              <tr>
                <TableCell>Fitness</TableCell>
                <TableCell>{gender === 'male' ? '14-17%' : '21-24%'}</TableCell>
              </tr>
              <tr>
                <TableCell>Média (normal)</TableCell>
                <TableCell>{gender === 'male' ? '18-24%' : '25-31%'}</TableCell>
              </tr>
              <tr>
                <TableCell>Acima do ideal</TableCell>
                <TableCell>{gender === 'male' ? '>25%' : '>32%'}</TableCell>
              </tr>
            </tbody>
          </ClassificationTable>
        </ResultContainer>
      )}
    </Container>
  );
}

export default App; 
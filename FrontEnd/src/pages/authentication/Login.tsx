import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Login Dogmunity</h1>
      <p><em>(Espacio reservado para el formulario de tus colaboradores)</em></p>
      
      {/* Botón temporal para probar el flujo */}
      <button 
        onClick={() => navigate('/home')}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Ingresar (Simular)
      </button>
    </div>
  );
}
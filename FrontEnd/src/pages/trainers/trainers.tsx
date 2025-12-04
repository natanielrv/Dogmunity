import { useEffect, useState } from 'react';
import Calendario1 from '../../components/Calendario1';

// Interfaz rápida para los datos que vienen del back
interface Trainer {
  id: number;
  name: string;
  location: string;
  price: number;
}

export const Home = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Conectando con tu NestJS local
    fetch('http://localhost:3000/api/trainers')
      .then(res => res.json())
      .then(data => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(err => console.error("Error conectando al back:", err));
  }, []);

  const handleShowCalendar = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
    setSelectedTrainer(null);
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: 0,
          color: '#333'
        }}>
          Entrenadores Disponibles
        </h1>
        <button 
          onClick={() => window.location.href = 'http://localhost:5173/home'}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1a252f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2c3e50';
          }}
        >
          🏠 Inicio
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Cargando datos...</p>
      ) : showCalendar && selectedTrainer ? (
        <div>
          <button 
            onClick={handleCloseCalendar}
            style={{
              padding: '10px 20px',
              marginBottom: '20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Volver a entrenadores
          </button>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
            Disponibilidad de {selectedTrainer.name}
          </h2>
          <Calendario1 
            trainerId={selectedTrainer.id} 
            trainerName={selectedTrainer.name}
            trainerPrice={selectedTrainer.price}
          />
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px' 
        }}>
          {trainers.map((t) => (
            <div 
              key={t.id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '20px', 
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              <h3 style={{ 
                margin: '0 0 10px 0', 
                color: '#2c3e50',
                fontSize: '1.3rem'
              }}>
                {t.name}
              </h3>
              <p style={{ 
                margin: '5px 0', 
                color: '#555',
                fontSize: '1rem'
              }}>
                📍 {t.location}
              </p>
              <p style={{ 
                margin: '10px 0 15px 0', 
                color: '#27ae60',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                Precio: ${t.price.toLocaleString()}
              </p>
              <button
                onClick={() => handleShowCalendar(t)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#87ce36',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6fb828';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#87ce36';
                }}
              >
                📅 Disponibilidad
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
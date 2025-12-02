import { useEffect, useState } from 'react';

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Entrenadores Disponibles</h1>
      
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {trainers.map((t) => (
            <div key={t.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <strong>{t.name}</strong> - {t.location} <br />
              Precio: ${t.price}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
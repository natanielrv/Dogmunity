import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, Castle, User, Dumbbell } from 'lucide-react';
// Asegúrate de tener tu imagen guardada en esta ruta o ajusta el import
import dogImage from '../../assets/dog-post.jpg'; 

// --- DATOS DE PRUEBA (MOCK DATA) ---
const POSTS = [
  {
    id: 1,
    username: 'nataniel',
    action: 'ha subido',
    image: dogImage, // Tu foto
    likes: 124,
    caption: 'Disfrutando del sol ☀️🐕 #Dogmunity',
    time: 'Hace 5 horas'
  },
  {
    id: 2,
    username: 'maria_vet',
    action: 'ha subido',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    likes: 89,
    caption: '¡Pacientes felices hoy en la clínica! 🩺',
    time: 'Hace 2 horas'
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* --- HEADER SUPERIOR --- */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <Castle size={24} color="#000" /> {/* Icono tipo castillo/comunidad */}
          <h1 style={styles.logoText}>Dogmunity</h1>
        </div>
        
        {/* Botón para ir a los Entrenadores (Tu antiguo Home) */}
        <button onClick={() => navigate('/trainers')} style={styles.trainersButton}>
          <Dumbbell size={16} style={{ marginRight: '5px' }} />
          Entrenadores
        </button>
      </header>

      {/* --- FEED DE PUBLICACIONES --- */}
      <div style={styles.feedContainer}>
        {POSTS.map((post) => (
          <article key={post.id} style={styles.card}>
            
            {/* Cabecera del Post */}
            <div style={styles.postHeader}>
              <div style={styles.avatar}>
                <User size={20} color="#666" />
              </div>
              <div style={styles.userInfo}>
                <span style={styles.username}>{post.username}</span>
                <span style={styles.actionText}>{post.action}</span>
              </div>
            </div>

            {/* Imagen del Post */}
            <div style={styles.imageContainer}>
              <img src={post.image} alt="Post" style={styles.postImage} />
            </div>

            {/* Acciones (Likes, Comentarios) */}
            <div style={styles.actionsBar}>
              <div style={styles.leftActions}>
                <Heart size={24} style={styles.iconBtn} />
                <MessageCircle size={24} style={styles.iconBtn} />
                <Send size={24} style={styles.iconBtn} />
              </div>
              {/* Aquí podrías poner un icono de guardar a la derecha */}
            </div>

            {/* Info de Likes y Caption */}
            <div style={styles.postFooter}>
              <p style={styles.likesText}>{post.likes} Me gusta</p>
              <p style={styles.caption}>
                <span style={styles.username}>{post.username}</span> {post.caption}
              </p>
              <p style={styles.timeText}>{post.time}</p>
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}

// --- ESTILOS (Basados en tu Login) ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fafafa', // Un gris muy clarito tipo IG
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: '60px',
  },
  header: {
    position: 'sticky',
    top: 0,
    width: '100%',
    maxWidth: '500px', // Limitamos el ancho para que parezca app móvil
    backgroundColor: '#fff',
    borderBottom: '1px solid #dbdbdb',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    boxSizing: 'border-box',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    fontFamily: 'cursive', // Opcional, para darle toque de logo
  },
  trainersButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#000', // Mismo negro que tu login
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  feedContainer: {
    width: '100%',
    maxWidth: '500px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #dbdbdb',
    borderRadius: '8px',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px',
    gap: '10px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #dbdbdb',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#262626',
    marginRight: '5px',
  },
  actionText: {
    fontSize: '12px',
    color: '#666',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#efefef',
    // Esto ayuda a mantener el espacio si la imagen tarda en cargar
    minHeight: '300px', 
    display: 'flex',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
  },
  actionsBar: {
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftActions: {
    display: 'flex',
    gap: '16px',
  },
  iconBtn: {
    cursor: 'pointer',
    color: '#262626',
    transition: 'color 0.2s',
  },
  postFooter: {
    padding: '0 14px 14px 14px',
  },
  likesText: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '8px',
  },
  caption: {
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '6px',
  },
  timeText: {
    fontSize: '10px',
    color: '#8e8e8e',
    textTransform: 'uppercase',
  }
};
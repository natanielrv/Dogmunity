import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  
  // ESTADOS DEL FLUJO
  // 'check'    -> Pantalla inicial (Pide correo)
  // 'login'    -> El usuario existe (Pide contraseña)
  // 'register' -> El usuario es nuevo (Pide datos de perfil)
  const [step, setStep] = useState<'check' | 'login' | 'register'>('check');
  const [loading, setLoading] = useState(false);

  // DATOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: ''
  });

  // Manejador de Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- PASO 1: VERIFICAR EL CORREO ---
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ¡IMPORTANTE! Agregamos '/api' a la ruta
      const response = await fetch('http://localhost:3000/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      
      if (data.nextStep === 'login') {
        // CAMINO A: El usuario existe -> Vamos al Login
        setStep('login');
      } else {
        // CAMINO B: El usuario es nuevo -> Vamos al Registro
        setStep('register');
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor (Revisar consola)');
    } finally {
      setLoading(false);
    }
  };

  // --- PASO 2A: LOGIN (USUARIO EXISTENTE) ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        navigate('/home'); // ¡Éxito! Vamos al home
      } else {
        alert('Contraseña incorrecta');
      }
    } catch (error) {
      alert('Error en el login');
    } finally {
      setLoading(false);
    }
  };

  // --- PASO 2B: REGISTRO (USUARIO NUEVO) ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        navigate('/home'); // ¡Éxito! Vamos al home
      } else {
        // Aquí atrapamos el error si pasa algo
        alert('Error al registrar: ' + (data.message || 'Datos inválidos'));
      }
    } catch (error) {
      alert('Error de conexión en el registro');
    } finally {
      setLoading(false);
    }
  };

  // Volver atrás (resetear flujo)
  const goBack = () => {
    setStep('check');
    setFormData(prev => ({ ...prev, password: '', name: '', lastName: '' }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header con botón de volver */}
        <div style={{ position: 'relative' }}>
          {step !== 'check' && (
            <button onClick={goBack} style={styles.backButton} type="button">
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 style={styles.logo}>Dogmunity</h1>
        </div>
        
        {/* Títulos Dinámicos según el paso */}
        <h2 style={styles.title}>
          {step === 'register' ? 'Bienvenido a la manada' : 
           step === 'login' ? 'Hola de nuevo' : 
           ''}
        </h2>
        
        <p style={styles.subtitle}>
          {step === 'check' ? 'Ingresa tu correo electrónico para comenzar' : 
           step === 'login' ? `Ingresa tu contraseña para entrar` : 
           'Completa tus datos para crear tu perfil'}
        </p>

        {/* --- FORMULARIO 1: CHECK EMAIL --- */}
        {step === 'check' && (
          <form onSubmit={handleCheckEmail} style={styles.form}>
            <input
              name="email"
              type="email"
              placeholder="correoelectronico@dominio.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.primaryButton} disabled={loading}>
              {loading ? 'Verificando...' : 'Continuar'}
            </button>
          </form>
        )}

        {/* --- FORMULARIO 2: LOGIN --- */}
        {step === 'login' && (
          <form onSubmit={handleLogin} style={styles.form}>
            {/* Mostramos el email como lectura para que sepa quién es */}
            <div style={styles.readOnlyEmail}>{formData.email}</div>
            
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              autoFocus
              required
            />
            <button type="submit" style={styles.primaryButton} disabled={loading}>
              {loading ? 'Entrando...' : 'Iniciar Sesión'}
            </button>
          </form>
        )}

        {/* --- FORMULARIO 3: REGISTRO --- */}
        {step === 'register' && (
          <form onSubmit={handleRegister} style={styles.form}>
            <div style={styles.readOnlyEmail}>{formData.email}</div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <input
              name="password"
              type="password"
              placeholder="Crea una contraseña"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
              minLength={6}
            />
            
            <button type="submit" style={styles.primaryButton} disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Completar Registro'}
            </button>
          </form>
        )}

        {/* Separador y Redes Sociales (Solo visible al inicio) */}
        {step === 'check' && (
          <>
            <div style={styles.dividerContainer}>
              <div style={styles.line}></div>
              <div style={styles.circle}></div>
              <div style={styles.line}></div>
            </div>

            <button style={styles.socialButton} type="button">
              <FcGoogle size={20} style={{ marginRight: '10px' }} />
              Continuar con Google
            </button>

            <button style={styles.socialButton} type="button">
              <FaApple size={20} style={{ marginRight: '10px' }} />
              Continuar con Apple
            </button>
          </>
        )}

        {/* Footer Legal */}
        <p style={styles.legalText}>
          Al hacer clic en continuar, aceptas nuestros <a href="#" style={styles.link}>Términos de servicio</a> y <a href="#" style={styles.link}>Política de privacidad</a>
        </p>
      </div>
    </div>
  );
}

// ESTILOS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
  },
  logo: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#000',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#000',
  },
  subtitle: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '30px',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  readOnlyEmail: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '8px',
    color: '#666',
    fontSize: '14px',
    marginBottom: '5px',
    border: '1px solid #eee',
  },
  primaryButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0',
    position: 'relative',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e0e0e0',
  },
  circle: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    margin: '0 10px',
  },
  socialButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '30px',
    lineHeight: '1.4',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};
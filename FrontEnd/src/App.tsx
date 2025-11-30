import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importación Default (porque en el archivo dice export default function Login)
import Login from './pages/authentication/Login';

// Importación Nombrada (porque en el archivo dice export const Home)
import { Home } from './pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Al entrar, mandar al Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 2. Pantalla de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* 3. Pantalla de Home */}
        <Route path="/home" element={<Home />} />
        
        {/* 4. Ruta comodín para errores 404 */}
        <Route path="*" element={<h3>Página no encontrada</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
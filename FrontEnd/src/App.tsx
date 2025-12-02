import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Importación del Login
import Login from './pages/authentication/Login';

// 2. Importación del NUEVO Home (El Feed tipo Instagram)
// Asumo que guardaste el archivo nuevo como 'Home.tsx' dentro de 'pages/Home'
// Si lo guardaste suelto en pages, borra el '/Home' del final.
import NewHome from './pages/home/Home'; 

// 3. Importación del ANTIGUO Home (Entrenadores)
// Como en ese archivo se llama "Home", usamos "as" para renombrarlo a "Trainers" y evitar confusiones
import { Home as Trainers } from './pages/trainers/trainers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Al entrar, mandar al Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 2. Pantalla de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* 3. Pantalla de Home NUEVO (Feed de perros) */}
        <Route path="/home" element={<NewHome />} />
        
        {/* 4. Pantalla de Entrenadores (Antiguo Home) */}
        <Route path="/trainers" element={<Trainers />} />
        
        {/* 5. Ruta comodín para errores 404 */}
        <Route path="*" element={<h3>Página no encontrada</h3>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
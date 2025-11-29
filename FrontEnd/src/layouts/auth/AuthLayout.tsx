import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function AuthLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Simula la verificación de inicio de sesión desde el caché
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        // Redirige a la ruta home si está logeado
        // navigate("/app/dashboard", { replace: true }) por ejemplo
      }
    };

    setTimeout(() => {
      checkLoginStatus();
      setIsLoading(false);
    }, 500); // Simula una carga de 0.5 segundos
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes personalizar este componente de carga con spinner
  }

  return <Outlet />;
}

export default AuthLayout;

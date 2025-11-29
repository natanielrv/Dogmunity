import Router from "./routes/Routes";

import { useRoutes } from "react-router-dom";

function App() {
  const routing = useRoutes(Router);

  return <>{routing}</>;
}

export default App;

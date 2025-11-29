import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Link,
} from "@mui/material";
import useWindowDimensions from "../../scripts/useWindowDimensions";
import InputLogin from "../../components/mui/InputLogin";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import InputPassWord from "../../components/mui/InputPassWord";
import logo from "../../assets/EII_logo.png";
import imagenlogin from "../../assets/login/default.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center h-screen">
      <div
        className="size-full flex flex-col justify-center items-center h-full sm:[w-full] md:w-[w-full] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] bg-white
"
      >
        <Box
          width="100%"
          className="flex flex-col justify-center align-center max-w-[430px]"
          p={4}
          gap={width < 960 ? "16px" : "24px"}
        >
          <Box
            width="100%"
            gap="16px"
            className="flex flex-col justify-center items-center"
          >
            <img alt="logo" className="h-30" src={logo} />

          </Box>
          <Box
            className="flex flex-col w-full max-w-[400px]"
            sx={{
              gap: width < 960 ? "16px" : "24px",
              flexGrow: 1,
            }}
          >
            <FormControl variant="standard">
              <InputLabel
                sx={{
                  fontSize: "18px",
                }}
                shrink
              >
                Correo
              </InputLabel>
              <InputLogin
                id="usuario"
                type="text"
                autoComplete="off"
                name={`email-${Date.now()}`}
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                sx={{
                  fontSize: "18px",
                }}
                shrink
              >
                Contraseña
              </InputLabel>
              <InputPassWord
                id="passwordLogin"
                type={showPassword ? "text" : "password"}
                name={`passLogin-${Date.now()}`}
                autoComplete="off"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 30) {
                    setPassword(e.target.value);
                  }
                }}
                endAdornment={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    style={{ marginRight: "10px" }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <RemoveRedEyeOutlinedIcon />
                    )}
                  </IconButton>
                }
              />
            </FormControl>
          </Box>

          <Button variant="contained" sx={{ width: "100%" }} onClick={() => {}}>
            Ingresar
          </Button>

          <Box className="flex flex-col justify-centeritems-center" gap={2}>
            <Link
              fontSize={14}
              fontWeight={500}
              textAlign="center"
              onClick={() => {
                // redirecciona a la ruta /register
                navigate("/auth/register");
              }}
              sx={{
                cursor: "pointer",
              }}
              underline="none"
            >
              Registrate aquí
            </Link>
            <Link
              fontSize={14}
              fontWeight={500}
              textAlign="center"
              onClick={() => {
                // redirecciona a la ruta /auth/forgot-password
                navigate("/auth/forgot-password");
              }}
              sx={{
                cursor: "pointer",
              }}
              underline="none"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Box>
      </div>
      <div className="justify-center items-center bg-gray-100 h-full w-[50%] hidden lg:flex">
        <img
          src={imagenlogin}
          alt="Imagen GPI"
          className="object-cover h-full w-full "
        />
      </div>
    </div>
  );
}

export default Login;

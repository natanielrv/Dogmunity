import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputLogin from "../../components/mui/InputLogin";
import InputPassWord from "../../components/mui/InputPassWord";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import imagenregister from "../../assets/login/default.png";
import logo from "../../assets/EII_logo.png";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


  return (
    <div className="flex flex-row justify-center items-center">
      <div className="hidden lg:flex justify-center items-center w-[40%] xl:w-[40%] 2xl:w-[50%] ">
        <img
          src={imagenregister}
          alt="Imagen GPI"
          className="object-cover h-full w-full"
          style={{
            maxHeight: "600px",
            maxWidth: "fit-content",
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-[100%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%] bg-white overflow-auto py-8 flex-1  min-h-screen">
        <Box
          width="100%"
          className="flex flex-col justify-center items-center max-w-[540px] gap-4"
          p={4}        >
          <Box className="flex flex-col justify-center items-center gap-4">
            <Typography
              fontSize={22}
              lineHeight={"32px"}
              letterSpacing={"3px"}
              fontWeight={600}
              className="uppercase le"
            >
              Registro
            </Typography>
          </Box>
          <Box className="flex flex-col w-full max-w-[600px] flex-1 gap-4">
            <FormControl variant="standard">
              <InputLabel
                sx={{
                  fontSize: "22px",
                }}
                shrink
              >
                Nombres
              </InputLabel>
              <InputLogin
                id="nombres"
                type="text"
                autoComplete="off"
                name={`nombres-${Date.now()}`}
                required
                value={nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNombre(e.target.value);
                }}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                sx={{
                  fontSize: "22px",
                }}
                shrink
              >
                Apellidos
              </InputLabel>
              <InputLogin
                id="apellidos"
                type="text"
                autoComplete="off"
                name={`apellidos-${Date.now()}`}
                required
                value={apellido}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setApellido(e.target.value);
                }}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                sx={{
                  fontSize: "22px",
                }}
                shrink
              >
                Correo institucional
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
                  fontSize: "22px",
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
            <FormControl variant="standard">
              <InputLabel
                sx={{
                  fontSize: "22px",
                }}
                shrink
              >
                Repite contraseña
              </InputLabel>
              <InputPassWord
                id="repasswordLogin"
                type={showPassword ? "text" : "password"}
                name={`repassLogin-${Date.now()}`}
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

          <Button variant="outlined" sx={{ width: "100%" }} onClick={() => {}}>
            Crear cuenta
          </Button>

          <Box className="flex flex-col justify-center items-center gap-2">
            <Link
              fontSize={14}
              fontWeight={500}
              textAlign="center"
              onClick={() => {
                navigate("/auth/login");
              }}
              sx={{
                cursor: "pointer",
              }}
              underline="none"
            >
              ¿Ya tienes una cuenta de docente?
            </Link>
          </Box>
          <Box
            width="100%"
            className=" flex flex-col justify-center items-center mt-3 lg:hidden"
          >
            <img alt="logo" className="h-20" src={logo} />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Register;

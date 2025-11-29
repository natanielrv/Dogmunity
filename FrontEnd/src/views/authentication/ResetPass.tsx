import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles"; 
import logo from "../../assets/EII_logo.png";

// Estilos personalizados con styled para el botón
const ResetButton = styled(Button)(() => ({
  backgroundColor: "#1F4D5D", 
  color: "#FFFFFF", 
  "&:hover": {
    backgroundColor: "#21484A", 
  },
  textTransform: "none",
}));

const ResetPass = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    // 1. Verificar que el email no esté vacío
    if (!email) {
      alert("Por favor, introduce tu email.");
      return;
    }
    // }
    console.log(`Solicitud de reseteo de contraseña para el email: ${email}`); // Simulación
  };

  return (
    <Box
      sx={{
        bgcolor: "#EBEBEB",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="bg-white rounded-xl shadow-xl p-8 pt-6 max-w-[500px] md:p-12 md:pt-8"
        sx={{
          maxWidth: {
            xs: "95%",
            sm: 500,
          },
        }}
      >
        <Box
          width="100%"
          className=" flex flex-col justify-center items-center mb-4 md:mb-5"
        >
          <img alt="logo" className="h-15 sm:h-20" src={logo} />
        </Box>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: {
              xs: "1.3rem",
              sm: "1.5rem",
            },
          }}
        >
          Reinicia tu contraseña
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 1,
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            },
          }}
        >
          Te enviaremos un email con instrucciones para restablecer tu
          contraseña. Por favor, introduce tu email asociado.
        </Typography>

        <TextField
          label="Email asociado"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", // Bordes redondeados
              "& fieldset": {
                borderColor: "#EBEBEB", // Color 4 para el borde del input
              },
              "&:hover fieldset": {
                borderColor: "#21484A", // Color 1 para el borde hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1F4D5D", // Color 5 para el borde focused
              },
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "13px",
            },
            "& .MuiInputLabel-root": {
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
              },
            },
          }}
        />

        <Box mt={1} display="flex" justifyContent="center">
          <ResetButton
            variant="contained"
            onClick={handleResetPassword}
            sx={{
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
              },
            }}
          >
            Enviar email
          </ResetButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPass;

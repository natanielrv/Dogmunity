import { InputBase } from "@mui/material";
import {
  alpha,
  styled,
} from "@mui/material/styles";

const InputLogin = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#2b2b2b",
    border: 1,
    borderStyle: "solid",
    fontSize: 13,
    fontWeight: 500,
    width: "100%",
    padding: "14px 18px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 0.05rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default InputLogin;
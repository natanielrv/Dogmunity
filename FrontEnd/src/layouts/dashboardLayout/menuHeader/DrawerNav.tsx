import { Avatar, Box, Drawer, Typography } from "@mui/material";
import logo from "../../../assets/EII_logo.png";
import { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface DrawerNavProps {
  closeMenuAction: () => void;
  openMenu: boolean;
  menuItems: {
    name: string;
    href: string; // Path to navigate
    icon: JSX.Element; // Icon heroicons
  }[];
}

function DrawerNav({ closeMenuAction, openMenu, menuItems }: DrawerNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer anchor={"right"} open={openMenu} onClose={closeMenuAction}>
      <Box className="flex flex-col justify-between bg-(--color-white-smoke) p-4 w-[100vw] h-[100vh]">
        <div>
          <Box className="flex flex-row justify-between p-4 items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-15 h-15 rounded-full" alt="avatar">
                  {" "}
                  JD
                </Avatar>
                <div className="ml-4">
                  <h4 className="text-md font-medium text-(--color-blue)">
                    John Doe
                  </h4>
                  <p className="text-sm font-light text-(--color-blue">Admin</p>
                </div>
              </div>
            </div>
            <div onClick={closeMenuAction}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </Box>
          <Box className="flex flex-col p-6 pl-10 gap-10 mt-20">
            {menuItems.map((item, index) => {
              return (
                <Box
                  className="flex flex-row justify-between items-center"
                  key={index}
                  onClick={() => navigate(item.href)}
                >
                  <Box className="flex flex-row items-center gap-4">
                    {item.icon}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  {String(location.pathname).includes(item.href) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </Box>
              );
            })}
          </Box>
        </div>
        <Box className="flex flex-col items-center p-4 gap-3">
          <img
            src={logo}
            className="w-[60%] max-w-[380px]"
          />
          <p
            className=" text-md font-normal leading-6 cursor-pointer underline p-1 text-(--color-darkgreen)"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Cerrar sesión
          </p>
        </Box>
      </Box>
    </Drawer>
  );
}

export default DrawerNav;

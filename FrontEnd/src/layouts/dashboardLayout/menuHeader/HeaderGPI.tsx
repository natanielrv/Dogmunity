/**
 * Menu basico para el layout de la aplicacion desarrollada por Diego Monsalves
 */

import { Avatar, Box, Typography } from "@mui/material";
import logo from "../../../assets/EII_logo.png";
import DrawerNav from "./DrawerNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderGPIProps {
  isMobile?: boolean;
}

/**
 * Componente que contiene el menu de la aplicacion
 * @param isMobile Indica si el menu es para movil o no
 * @returns JSX.Element
 *
 * @example
 * <HeaderGPI isMobile={true} />
 * <HeaderGPI />
 *
 * @version 1.0.0
 * */

function HeaderGPI({ isMobile = false }: HeaderGPIProps) {
  const actionsMenu = [
    {
      name: "Item 1",
      href: "/", // Path to navigate
      icon: (
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ), // Icon heroicons
    },
    {
      name: "Item 2",
      href: "/", // Path to navigate
      icon: (
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
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      ), // Icon
    },
    {
      name: "Item 3",
      href: "/", // Path to navigate
      icon: (
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
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
          />
        </svg>
      ), // Icon
    },
    {
      name: "Item 4",
      href: "/", // Path to navigate
      icon: (
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
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ), // Icon
    },
  ];
  const navigate = useNavigate();
  const openMenuAction = () => {
    setOpenMenu(true);
  };
  const closeMenuAction = () => {
    setOpenMenu(false);
  };

  const redirectTo = (path: string) => {
    navigate(path);
  };

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {isMobile ? (
        <nav>
          <div className="h-16 w-full bg-(--color-darkgreen)">
            <div className="flex w-full h-full items-center justify-end p-4 py-0">
              <div
                onClick={openMenuAction}
                className="cursor-pointer p-2 text-white hover:bg-white rounded-full hover:bg-opacity-10 hover:text-(--color-darkgreen)"
              >
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <DrawerNav
            closeMenuAction={closeMenuAction}
            openMenu={openMenu}
            menuItems={actionsMenu}
          ></DrawerNav>
        </nav>
      ) : (
        <nav className="flex flex-col bg-(--color-darkgreen) w-80 h-full overflow-auto">
          <div className="flex flex-col justify-between p-4 h-full">
            <div className="flex flex-col items-center pt-10 justify-center gap-2">
              <Box
                width="100%"
                gap="16px"
                className="flex flex-col justify-center items-center"
              >
                <img alt="logo" className="h-30 invert" src={logo} />
                <Typography
                  fontSize={22}
                  lineHeight={"32px"}
                  letterSpacing={"-0.3px"}
                  fontWeight={600}
                  color="#ebebeb"
                >
                  GPI project
                </Typography>
              </Box>
              <Box className="flex flex-col pt-16 p-6 gap-6 w-full">
                {actionsMenu.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => redirectTo(item.href)}
                    className="group flex items-center gap-4 p-3 border-2 rounded-lg border-transparent hover:border-[#FFFFFF] hover:border-opacity-100 cursor-pointer"
                  >
                    <div className="text-white group-hover:text-[#FFFFFF]">
                      {item.icon}
                    </div>
                    <Typography
                      fontSize={18}
                      lineHeight={"24px"}
                      fontWeight={400}
                      className="text-[#ebebeb] group-hover:text-[#FFFFFF]"
                    >
                      {item.name}
                    </Typography>
                  </div>
                ))}
              </Box>
            </div>
            <div className="group flex items-center justify-between border-2 rounded-lg border-transparent p-2 hover:border-white">
              <div className="flex items-center">
                <Avatar className="w-25 h-25 rounded-full" alt="avatar">
                  JD
                </Avatar>
                <div className="ml-4">
                  <h4 className="text-md font-medium text-white group-hover:text-(--color-white)">
                    John Doe
                  </h4>
                  <p className="text-sm font-light text-white group-hover:text-(--color-white)">
                    Admin
                  </p>
                </div>
              </div>
              <button className="text-white cursor-pointer group-hover:text-(--color-white)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default HeaderGPI;

import { Outlet } from "react-router-dom";
import useWindowDimensions from "../../scripts/useWindowDimensions";
import HeaderGPI from "./menuHeader/HeaderGPI";

function MainLayout() {
  const { width } = useWindowDimensions();
  return (
    <>
      <div className="flex flex-1 w-full max-h-screen">
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row max-h-screen">
          {width > 1024 ? <HeaderGPI /> : <HeaderGPI isMobile />}

          <main className="flex-1 overflow-y-auto">
            <div className="flex-1 px-6 py-8 overflow-y-auto w-full max-h-screen  h-full">
              {<Outlet />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default MainLayout;

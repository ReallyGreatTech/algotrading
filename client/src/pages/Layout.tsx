import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

const Layout = () => {
  return (
    <div className="px-5 lg:px-10 min-h-screen    ">
      <header>
        <TopNav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;

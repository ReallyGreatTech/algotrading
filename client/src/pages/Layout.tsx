import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MobileNav from '../components/MobileNav';
import StatsWarning from '../components/StatsWarning';

const Layout = () => {
  return (
    <div className="px-5 lg:px-10 min-h-screen">
      <header className="hidden md:block">
        <TopNav />
      </header>
      <StatsWarning />
      <div className="block md:hidden">
        <MobileNav />
      </div>
      <main className="">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;

import { useEffect, useState } from 'react';
import Overlay from './Overlay';
import { Link, useLocation } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { IoClose, IoMenu } from 'react-icons/io5';

const menuItems = [
  { label: 'Funding Rate', link: '/' },
  { label: 'Positions', link: '/positions' },
  { label: 'Chart', link: '/chart' },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="flex justify-center items-center py-5 text-white/90">
        <button
          onClick={() => setOpen(true)}
          className="text-xl text-white/90 p-4 bg-white/5 rounded-lg"
        >
          <IoMenu />
        </button>

        <span className="ms-auto">
          <PrimaryButton buttonText="Connect Wallet" />
        </span>
      </div>

      <Overlay open={open} className="z-50" onClose={() => setOpen(false)}>
        <div className="min-w-[100vw] min-h-screen h-full text-white bg-black/95 p-5">
          <div className="flex justify-start py-5 pt-3">
            <button
              onClick={() => setOpen(false)}
              className="text-xl text-white/90 p-4 bg-white/5 rounded-lg"
            >
              <IoClose />
            </button>
          </div>

          <div>
            <u className="flex flex-col gap-y-2 no-underline">
              {menuItems.map((m) => (
                <li className="inline-block w-full" key={m.link}>
                  <Link
                    className={`w-full block py-4 px-4 rounded-xl no-underline  ${
                      m.link === location.pathname
                        ? 'text-white/90 bg-white/10'
                        : 'text-white/50 bg-white/5'
                    }`}
                    to={m.link}
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </u>
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default MobileNav;

import { Link, NavLink } from "react-router-dom";
import { navigation } from "../constants/navigation";
import PrimaryButton from "./PrimaryButton";


const TopNav = () => {
  return (
    <nav className="hidden lg:flex gap-6 text-white   items-center py-4 ">
      <Link to="/" className="text-[24px] font-[700] mr-10">
        Ripley
      </Link>
      <ul className="flex gap-4 ">
        {navigation.map((navItem) => {
          return (
            <li key={navItem.label}>
              <NavLink
                to={navItem.href}
                className={({ isActive }) =>
                  `dsdsd  text-[16px] font-[600] ${
                    isActive ? "text-primary-light" : ""
                  }`
                }
              >
                {navItem.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <span className="ms-auto hidden">
        <PrimaryButton buttonText="Connect Wallet"   />
      </span>
    </nav>
  );
};

export default TopNav;

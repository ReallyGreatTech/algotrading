
import { NavLink } from "react-router-dom";
import { navigation } from "../constants/navigation";

const TopNav = () => {
  return (
    <nav className="hidden lg:flex gap-2">
      {navigation.map((navItem) => {
        return (
          <div key={navItem.label}>
            <NavLink
              to={navItem.href}
              className={({ isActive }) =>
                `hover:bg-opacity-80 flex py-3 justify-center bg-[#6558F5] text-white min-w-[150px] rounded-md ${
                  isActive ? "bg-[#AC6363] font-bold" : ""
                }`
              }
            >
              {navItem.label}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );

};

export default TopNav;

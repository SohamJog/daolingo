import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ArrowUpOnSquareIcon, MegaphoneIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { connectWalletHandler } from "../../scripts/wallet";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <div>
    <ul className="mx-4 mb-4 mt-2 flex flex-row gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
       <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          <Link
            to="/inputs"
            target="_blank"
            className="flex items-center gap-1 p-1 font-normal"
          >
            <ArrowUpOnSquareIcon className="w-6 h-6 opacity-75 mr-1" />
            Contribute
          </Link>
        </Typography>

        <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          <Link
            to="/voterpage"
            target="_blank"
            className="flex items-center gap-1 p-1 font-normal"
          >
            <MegaphoneIcon className="w-6 h-6 opacity-75 mr-1" />
            Current Proposals
          </Link>
        </Typography>

        <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          <Link
            to="/archive"
            target="_blank"
            className="flex items-center gap-1 p-1 font-normal"
          >
            <BuildingLibraryIcon className="w-6 h-6 opacity-75 mr-1" />
            Archive
          </Link>
        </Typography>

      
    </ul>
    </div>
  );

  return (
    <MTNavbar color="transparent" className="p-3 pt-6 bg-black/75">
      <div className="container mx-auto flex items-center justify-between text-white ">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-4xl text-white tracking-wider uppercase">
            DAO<span className="text-lime-500 font-fancy">LINGO</span>
          </Typography>
        </Link>
        
        <div className="hidden gap-2 lg:flex">
          {navList}
          {React.cloneElement(action, {
            className: "hidden lg:inline-block text-2xl",
          })}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {React.cloneElement(action, {
            className: "w-full mt-4",
          })}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "DAOLINGO",
  action: (
    <Button variant="gradient" size="sm" fullWidth onClick={connectWalletHandler}>
      Connect Wallet
    </Button>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;

import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import { FaTwitter } from "react-icons/fa";


const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
  <div className="container mx-auto">
    {/* Existing code */}
    <hr className="my-6 border-gray-300" />
    <div className="flex flex-wrap items-center justify-center md:justify-between">
      <div className="mx-auto w-full px-4 text-center">
        <Typography variant="small" className="font-normal text-blue-gray-500">
          {copyright}
        </Typography>
        <a
          href="https://twitter.com/jog_soham"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center mt-4 text-blue-500 hover:text-blue-700"
        >
          <FaTwitter className="mr-2" />
          Follow us on Twitter
        </a>
      </div>
    </div>
  </div>
</footer>
  );
}

Footer.defaultProps = {
  title: "DAOlingo",
  
  
  copyright: (
    <>
      ©{year} DAOlingo
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;

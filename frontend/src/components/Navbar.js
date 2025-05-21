import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Koleksioni", path: "/catalog" },
  ];

  return (
    <motion.nav
      className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed w-full top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo + Emër */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Soar Store Logo"
          className="h-10 w-10 object-cover rounded-full shadow-sm"
        />
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-vishnje hover:text-vishnje/80 transition"
        >
          Soar Store
        </Link>
      </div>

      {/* Menutë + Vendndodhja */}
      <div className="flex space-x-6 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-lg font-medium hover:text-vishnje transition ${
              location.pathname === item.path ? "text-vishnje" : "text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* Vendndodhja në Google Maps */}
        <a
          href="https://maps.app.goo.gl/T1gFggCtzT1xAYun8"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block text-sm text-gray-600 italic ml-6 hover:text-vishnje transition"
        >
          📍 Tiranë, Shqipëri
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;

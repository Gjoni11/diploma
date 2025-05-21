import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-vishnje text-white py-8 mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
        <p className="text-xl font-bold">Soar Store</p>

        {/* Ikonat e rrjeteve sociale */}
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://instagram.com/soarstore" // zëvendëso me linkun real
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-nude transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://tiktok.com/@soarstore" // zëvendëso me linkun real
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-nude transition"
          >
            <FaTiktok />
          </a>
        </div>

        {/* Informacion shtesë */}
        <div className="text-sm space-y-1">
          <p>© {new Date().getFullYear()} Të gjitha të drejtat e rezervuara.</p>
          <p>
            Na kontaktoni në:{" "}
            <a href="mailto:info@soarstore.com" className="underline">
              info@soarstore.com
            </a>
          </p>
          <p className="flex justify-center items-center gap-2 text-xs mt-2">
            <FaMapMarkerAlt className="text-nude" />
            Rr. Loni Ligori, Astir ,Tiranë, Shqipëri
          </p>
          <p className="flex justify-center items-center gap-2 text-xs">
            <FaPhoneAlt className="text-nude" />
            +355 69 123 4567
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

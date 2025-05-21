import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";

const Home = () => {
  const [headline, setHeadline] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/home")
      .then((res) => {
        if (res.data) {
          setHeadline(res.data.headline || "");
          setImages(res.data.imageUrls || []);
        }
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së të dhënave nga backend:", err);
      });
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    dots: true,
    arrows: false,
    infinite: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    fade: false,
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#f5ebdd] to-[#fffaf6]">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-36 pb-16">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-vishnje mb-4 tracking-tight drop-shadow-lg"
        >
          Soar Store
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-[#7c2d37] mb-8 max-w-xl italic"
        >
          {headline || "Mirësevini në dyqanin tonë të qirasë së fustaneve dhe kostumeve."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-x-4"
        >
          <Link
            to="/catalog"
            className="bg-vishnje hover:bg-[#57133f] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg"
          >
            Shfleto Koleksionin
          </Link>
        </motion.div>

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-12 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden"
          >
            <Slider {...settings}>
              {images.map((url, i) => (
                <div key={i} className="overflow-hidden">
                  <img
                    src={url}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-[500px] object-cover rounded-xl transition duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </Slider>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;

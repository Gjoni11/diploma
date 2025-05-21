import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) =>
        console.error("Gabim gjatë marrjes së produktit:", err)
      );
  }, [id]);

  if (!product || !Array.isArray(product.imageUrls)) {
    return (
      <p className="text-center mt-10 text-[#7b2141]">
        Produkti nuk u gjet ose nuk ka foto të vlefshme.
      </p>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-36 p-8 bg-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Galeria */}
      <motion.div
        className="mb-10 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="rounded-xl"
        >
          {product.imageUrls.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Foto ${index + 1}`}
                className="w-full h-[500px] object-cover rounded-xl transition duration-500"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Detajet */}
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold text-[#6B1E52]">
          {product.title}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>
        <p className="text-3xl font-bold text-[#6B1E52]">
          {product.price}€
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Gabim gjatë marrjes së produkteve:", err));
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.type.toLowerCase() === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f3] to-[#fffaf6] px-6 pt-36 pb-16">
      <motion.h1
        className="text-5xl font-extrabold text-[#6b0f1a] text-center mb-10 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Katalogu i Produkteve
      </motion.h1>

      <motion.div
        className="flex justify-center gap-4 mb-12 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {["all", "Fustan", "Kostum"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 shadow-sm ${
              filter === type
                ? "bg-[#6b0f1a] text-white shadow-md"
                : "border border-[#6b0f1a] text-[#6b0f1a] hover:bg-[#6b0f1a]/10"
            }`}
          >
            {type === "all" ? "Të Gjitha" : type}
          </button>
        ))}
      </motion.div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 mt-12">
          Nuk ka produkte për këtë kategori.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg transition duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
            >
              <img
                src={product.imageUrls?.[0]}
                alt={product.title}
                className="w-full h-72 object-cover rounded-t-3xl transition duration-300"
              />
              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-bold text-[#6b0f1a]">
                  {product.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-[#7c2d37] font-extrabold text-xl">
                  {product.price}€
                </p>
                <Link
                  to={`/product/${product._id}`}
                  className="inline-block mt-2 bg-[#6b0f1a] text-white px-5 py-2 rounded-full hover:bg-[#8a1c2c] transition"
                >
                  Shiko Detajet
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;

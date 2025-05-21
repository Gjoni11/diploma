import { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Fustan",
    description: "",
    price: "",
    imageUrls: [],
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const [sliderImages, setSliderImages] = useState([]);
  const [headline, setHeadline] = useState("");
  const [homeMessage, setHomeMessage] = useState("");
  const [currentSliderUrls, setCurrentSliderUrls] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Duhet të jesh i loguar si admin.");
      window.location.href = "/login";
    } else {
      fetchProducts();
      fetchHomeContent();
    }
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Gabim gjatë marrjes së produkteve:", err));
  };

  const fetchHomeContent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/home");
      if (res.data) {
        setHeadline(res.data.headline || "");
        setCurrentSliderUrls(res.data.imageUrls || []);
      }
    } catch (err) {
      console.error("Gabim gjatë marrjes së përmbajtjes së faqes kryesore:", err);
    }
  };

  const handleImageUpload = async (files) => {
    const form = new FormData();
    files.forEach((img) => form.append("images", img));

    const res = await axios.post("http://localhost:5000/api/upload/images", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.images;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await handleImageUpload(images);
      await axios.post(
        "http://localhost:5000/api/products",
        { ...formData, imageUrls },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Produkti u shtua me sukses!");
      setFormData({
        title: "",
        type: "Fustan",
        description: "",
        price: "",
        imageUrls: [],
      });
      setImages([]);
      fetchProducts();
    } catch (err) {
      console.error("Gabim gjatë shtimit të produktit:", err);
      setMessage("Gabim gjatë shtimit të produktit.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("A jeni i sigurt që doni ta fshini këtë produkt?")) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  const handleEdit = (p) => {
    setEditing(p._id);
    setFormData({
      title: p.title,
      type: p.type,
      description: p.description,
      price: p.price,
      imageUrls: p.imageUrls || [],
    });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/products/${editing}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditing(null);
    setFormData({
      title: "",
      type: "Fustan",
      description: "",
      price: "",
      imageUrls: [],
    });
    fetchProducts();
  };

  const handleUpdateHomeContent = async () => {
    try {
      const updatedToken = localStorage.getItem("token");

      let uploadedUrls = currentSliderUrls;

      if (sliderImages.length > 0) {
        uploadedUrls = await handleImageUpload(sliderImages);
      }

      await axios.put(
        "http://localhost:5000/api/home",
        {
          headline,
          imageUrls: uploadedUrls || [],
        },
        {
          headers: {
            Authorization: `Bearer ${updatedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setHomeMessage("Përmbajtja u përditësua me sukses!");
      setSliderImages([]);
    } catch (err) {
      console.error("Gabim gjatë përditësimit të përmbajtjes në Home:", err.response?.data || err);
      setHomeMessage("Gabim gjatë përditësimit të përmbajtjes.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-16">
      <h1 className="text-3xl font-bold text-[#7b2141]">Paneli i Administratorit</h1>

      {/* ============ SHTO PRODUKT ============ */}
      <section>
        <h2 className="text-xl font-semibold text-[#7b2141] mb-4">Shto Produkt të Ri</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4" encType="multipart/form-data">
          <input type="text" placeholder="Titulli" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="border p-2 rounded" />
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="border p-2 rounded">
            <option value="Fustan">Fustan</option>
            <option value="Kostum">Kostum</option>
          </select>
          <input type="text" placeholder="Përshkrimi" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="border p-2 rounded col-span-2" />
          <input type="number" placeholder="Çmimi" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="border p-2 rounded" />
          <input type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files))} required className="border p-2 rounded" />
          <button type="submit" className="bg-[#7b2141] text-white px-4 py-2 rounded hover:bg-[#611730] col-span-2">
            Shto Produktin
          </button>
          {message && <p className="text-green-600 font-medium col-span-2">{message}</p>}
        </form>
      </section>

      {/* ============ LISTA E PRODUKTEVE ============ */}
      <section>
        <h2 className="text-xl font-semibold text-[#7b2141] mb-4">Produktet ekzistuese</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f6f1ed] text-[#7b2141]">
              <th className="p-2 border">Foto</th>
              <th className="p-2 border">Titulli</th>
              <th className="p-2 border">Lloji</th>
              <th className="p-2 border">Çmimi</th>
              <th className="p-2 border">Veprime</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-[#fdf7f2]">
                <td className="p-2 border">
                  {p.imageUrls?.[0] && (
                    <img src={p.imageUrls[0]} alt={p.title} className="h-16 w-auto rounded object-cover" />
                  )}
                </td>
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">{p.type}</td>
                <td className="p-2 border">{p.price}€</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Ndrysho</button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Fshi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editing && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-bold text-[#7b2141] mb-2">Ndrysho Produktin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Titulli" className="border p-2 rounded" />
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="border p-2 rounded">
                <option value="Fustan">Fustan</option>
                <option value="Kostum">Kostum</option>
              </select>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Çmimi" className="border p-2 rounded" />
              <input type="text" value={formData.imageUrls.join(",")} onChange={(e) => setFormData({ ...formData, imageUrls: e.target.value.split(",") })} placeholder="URL-t e fotove (me ,)" className="border p-2 rounded" />
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Përshkrimi" className="border p-2 rounded col-span-2" />
            </div>
            <div className="mt-4 space-x-2">
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ruaj</button>
              <button onClick={() => setEditing(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Anulo</button>
            </div>
          </div>
        )}
      </section>

      {/* ============ PËRDITËSIMI I HOME SLIDER ============ */}
      <section className="pt-10 border-t">
        <h2 className="text-xl font-semibold text-[#7b2141] mb-4">Ndrysho Slider & Tekstin në Home</h2>
        <div className="space-y-4">
          <textarea
            placeholder="Teksti që shfaqet në faqen Home..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSliderImages(Array.from(e.target.files))}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleUpdateHomeContent}
            className="bg-vishnje text-white px-4 py-2 rounded hover:bg-[#5a1c45]"
          >
            Përditëso Slider dhe Tekstin
          </button>
          {homeMessage && <p className="text-green-700 font-medium">{homeMessage}</p>}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;

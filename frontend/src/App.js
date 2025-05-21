import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import AdminPanel from "./pages/AdminPanel";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    let lastKey = "";

    const handleKeyCombo = (e) => {
      if (e.ctrlKey && lastKey === "a" && e.key.toLowerCase() === "s") {
        e.preventDefault();
        navigate("/admin-secret");
      }
      lastKey = e.key.toLowerCase();
    };

    window.addEventListener("keydown", handleKeyCombo);
    return () => window.removeEventListener("keydown", handleKeyCombo);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/admin-secret" element={<AdminPanel />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

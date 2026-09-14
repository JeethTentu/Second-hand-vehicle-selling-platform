import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastStack from "./components/ToastStack";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import SellVehicle from "./pages/SellVehicle";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-cream">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/sell" element={<SellVehicle />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastStack />
      </BrowserRouter>
    </AppProvider>
  );
}

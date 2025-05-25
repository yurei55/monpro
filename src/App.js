// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import FindPage from "./pages/FindPage";
import JoinPage from "./pages/JoinPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ComfirmationPage";
import ReservationPage from "./pages/ReservationPage";
import ProfilePage from "./pages/ProfilePage";
import HotelDetailPage from "./pages/HotelDetailPage";
// ...other imports

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find"  element={<FindPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/comfirmation" element={<ConfirmationPage />} />
        <Route path="/orders" element={<ReservationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

export default App;
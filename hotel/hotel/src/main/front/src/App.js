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
// ...other imports
import SearchResultPage from "./pages/SearchResultPage";
import HotelDetailPage  from "./pages/HotelDetailPage";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/search" element={<SearchResultPage />} />  {/* ✅ 추가 */}

                <Route path="/login" element={<LoginPage />} />
                <Route path="/find"  element={<FindPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/orders" element={<ReservationPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/hotels/:id" element={<HotelDetailPage />} />
                {/* ...other routes */}
            </Routes>
        </Router>
    );
}

export default App;
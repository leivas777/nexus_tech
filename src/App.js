//CSS
import "./App.css";

//Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

//Pages
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthPage from "./pages/LoginPages/AuthPage";
import DashboardFooter from "./components/DashboardFooter/DashboardFooter";
import Agenda from "./pages/Agenda/Agenda";
import AuthSuccess from "./pages/Auth/AuthSuccess";
import ServicesPage from "./pages/Dashboard/services";
import SettingsPage from "./pages/Agenda/settings";
import InstagramMessages from "./pages/InstagramMessages/InstagramMessages";
import PricingPage from "./pages/PricingPage/PricingPage";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {" "}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfService />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<AuthPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/business/services" element={<ServicesPage />} />
        <Route path="/business/settings" element={<SettingsPage />} />
        <Route
          path="/business/messages-center"
          element={<InstagramMessages />}
        />
        <Route path="/subscription/plans" element={<PricingPage />} />
      </Routes>
      {isDashboard ? <DashboardFooter /> : <Footer />}
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="10016738900-p58t59j9dsdbi8jbefpoekckdk1f4bp6.apps.googleusercontent.com">
      <Router>
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

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

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import { DashboardFooter, Footer, Header } from "./components";
import { About, Agenda, AuthPage, AuthSuccess, Dashboard, Home, InstagramMessages, PricingPage, PrivacyPolicy, ServicesPage, SettingsPage, TermsOfService } from "./pages";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {" "}
      <Header />
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
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
      </div>
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

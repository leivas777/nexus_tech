//CSS
import "./App.css";

//Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import TestMessage from "./pages/TestMessage/TestMessage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthPage from "./pages/LoginPages/AuthPage";



function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfService />} />
          <Route path="/test-message" element={<TestMessage />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/registration" element={<AuthPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;

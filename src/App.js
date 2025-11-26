//CSS
import './App.css';

//Logo
import logo from './assets/logo_nexus_sem_fundo.png'

//Router 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Pages
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';



function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/terms-of-use' element={<TermsOfService/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

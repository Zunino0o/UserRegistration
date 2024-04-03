import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Patients from './components/Patients';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Patients />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>
  );
}

export default App;

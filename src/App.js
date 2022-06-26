import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Mechanic from './components/Mechanic/Mechanic';
import Mechanics from './components/Mechanics/Mechanics';
import NotFound from './components/Shared/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='mechanics' element={<Mechanics />} />
      <Route path='mechanic/:id' element={<Mechanic />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;

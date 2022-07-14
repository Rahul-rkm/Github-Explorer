import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
function App() {
  return (
    <Router className="App">
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
            {/* ☝ means CATCH all other than above : it will show if anything that doesn't exist */}
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import User from './pages/User';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
function App() {
  return (
    <GithubProvider >
      <AlertProvider>
        <Router className="App">
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<User />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
                {/* ☝ means CATCH all other than above : it will show if anything that doesn't exist */}
              </Routes>

            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;

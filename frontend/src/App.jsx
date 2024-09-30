import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import BudgetPage from './pages/BudgetPage';
import WalletPage from './pages/WalletPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const login = false;
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {login && <Navbar />}

      {/* Main Content */}
        <Routes>
          {/* Define your routes here */}
          <Route path='/login' element={!login ? <LogInPage /> : <Navigate to='/' />} />
				  <Route path='/signup' element={!login ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path="/" element={login ? <Home /> : <Navigate to='/login' />} />
          <Route path="/overview" element={login ? <Overview /> : <Navigate to='/login' />} />
          <Route path="/budgets" element={login ? <BudgetPage /> : <Navigate to='/login' />} />
          <Route path="/wallet-settings" element={login ? <WalletPage /> : <Navigate to='/login' />} />
          <Route path="*" element={<>Page Not found</>} />
        </Routes>

      {/* Footer */}
      {login &&
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <p>&copy; 2024 My Website. All rights reserved.</p>
          </div>
        </footer>
      }
    </div>
  );
}

export default App;

import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import BudgetPage from './pages/BudgetPage';
import WalletPage from './pages/WalletPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';
import { useQuery } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import NotFoundPage from './components/NotFoundPage';


function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER, {
  });
  if (loading) {
    return null;
  }
  let isAuthenticate = Boolean(data?.authUser);
  if (isAuthenticate) {
    localStorage.setItem("user", JSON.stringify(data.authUser));
  } else {
    localStorage.clear();


  }
  if (error) {
    isAuthenticate = false;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      {/* Header */}
      {isAuthenticate && <Navbar />}

      {/* Main Content */}
      <div className="flex-grow bg-[#F4F7FA]">
        <Routes>
          {/* Define your routes here */}
          <Route path='/login' element={!isAuthenticate ? <LogInPage /> : <Navigate to='/' />} />
          <Route path='/signup' element={!isAuthenticate ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path="/" element={isAuthenticate ? <Home /> : <Navigate to='/login' />} />
          <Route path="/overview" element={isAuthenticate ? <Overview /> : <Navigate to='/login' />} />
          <Route path="/budgets" element={isAuthenticate ? <BudgetPage /> : <Navigate to='/login' />} />
          <Route path="/wallet-settings" element={isAuthenticate ? <WalletPage /> : <Navigate to='/login' />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Footer */}
      {isAuthenticate &&
        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <div className="container mx-auto">
            <p>&copy; 2024 My Website. All rights reserved.</p>
          </div>
        </footer>
      }
    </div>

  );
}

export default App;

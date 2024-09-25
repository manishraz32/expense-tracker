import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import BudgetPage from './pages/BudgetPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col gap-4 flex-grow px-[16px] py-4 bg-[#F4F7FA] xl:px-[15%]">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/budgets" element={<BudgetPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <p>&copy; 2024 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

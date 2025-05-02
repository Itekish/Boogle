import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useGetCurrentUser } from "../../shared/hooks/useGetCurrentUser";
import Spinner from "../../components/Spinner";
import boogleLogo from "/boogle-removebg.png";
import { FiMenu, FiX } from "react-icons/fi";

const HomeLayout = () => {
  const { isLoading, user, logout } = useGetCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>  
    );
  }

  return (
    <div>
      {/* 🔥 Glassy Dark Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg shadow-md border-b border-gray-700 dark:bg-gray-900/50 px-6 flex justify-between items-center z-50">
       <Link to="/">
       <div className="flex items-center">
          <img src={boogleLogo} alt="Boogle Logo" className="h-20" />
          <h1 className=" text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d6d] via-[#ffcc33] to-[#0099ff] drop-shadow-lg" style={{ textShadow: "2px 2px 5px rgba(255, 77, 109, 0.7)" }}>
            Boogle
          </h1>
        </div>
       </Link>  
        {/* 🔥 Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-white font-bold text-[20px]">
          <li className="py-2"><Link to="/" className="hover:text-[#ff4d6d] transition-all">Home</Link></li>
          <li className="py-2"><Link to="/about" className="hover:text-[#ff4d6d] transition-all">About</Link></li>
          <li className="py-2"><Link to="/faq" className="hover:text-[#ff4d6d] transition-all">FAQ</Link></li>
          {user ? (
            <>
              <li className="py-2"><Link to="/create-Event" className="hover:text-[#ff4d6d] transition-all">Create Event</Link></li>
              <li className="py-2"><Link to="/dashboard" className="hover:text-[#ff4d6d] transition-all">Dashboard</Link></li>
              <li>
                <button
                  onClick={logout}
                  className="bg-[#ff4d6d] hover:bg-[#ff3355] text-white px-6 py-2 rounded-lg shadow-lg transition-all transform hover:scale-110"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/auth" className="hover:text-[#ff4d6d] transition-all">Sign Up</Link></li>
              <li><Link to="/auth/login" className="hover:text-[#ff4d6d] transition-all">Login</Link></li>
            </>
          )}
        </ul>
        
        {/* 🔥 Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
      
      {/* 🔥 Mobile Navigation */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 text-white text-xl z-40">
          <Link to="/" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/faq" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>FAQ</Link>
          {user ? (
            <>
              <Link to="/create-Event" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>Create Event</Link>
              <Link to="/dashboard" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="bg-[#ff4d6d] hover:bg-[#ff3355] text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-110"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              <Link to="/auth/login" className="hover:text-[#ff4d6d] transition-all" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </div>
      )}
      
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

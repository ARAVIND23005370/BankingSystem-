import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f13] relative">
      {/* Subtle animated aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-500/[0.02] rounded-full blur-3xl animate-float-1" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/[0.02] rounded-full blur-3xl animate-float-2" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-amber-500/[0.015] rounded-full blur-3xl animate-float-3" />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative z-10">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Warm aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-rose-500/[0.05] rounded-full blur-3xl animate-float-1" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-3xl animate-float-2" />
      </div>

      <div className="text-center animate-fade-in relative z-10">
        <p className="text-8xl font-bold font-mono text-gradient mb-4">404</p>
        <h1 className="text-2xl font-semibold text-white mb-2">Page not found</h1>
        <p className="text-stone-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={() => navigate(-1)}>← Go Back</Button>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}

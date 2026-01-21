import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { LessonPlayer } from './components/LessonPlayer';
import { Dictionary } from './components/Dictionary';
import { BottomNav } from './components/BottomNav';
import { Culture } from './components/Culture';
import { Profile } from './components/Profile';
import { useStore } from './store/useStore';

// Wrapper for pages that show bottom nav
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

function App() {
  const language = useStore((state) => state.language);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        <Routes>
          <Route path="/" element={!language ? <Onboarding /> : <Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/lessons" element={<Navigate to="/dashboard" replace />} /> {/* Alias for now */}
          <Route path="/culture" element={<Layout><Culture /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />

          <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="/dictionary" element={<Layout><Dictionary /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

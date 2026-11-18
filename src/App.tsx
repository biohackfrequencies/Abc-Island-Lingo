import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { Culture } from './components/Culture';
import { Dashboard } from './components/Dashboard';
import { Dictionary } from './components/Dictionary';
import { IapProvider } from './components/IapProvider';
import { LessonPlayer } from './components/LessonPlayer';
import { Lessons } from './components/Lessons';
import { Onboarding } from './components/Onboarding';
import { Profile } from './components/Profile';
import { useStore } from './store/useStore';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
        {children}
        <BottomNav />
    </>
);

function LessonRoute() {
    const { lessonId } = useParams();
    return <LessonPlayer key={lessonId} />;
}

function App() {
    const language = useStore((state) => state.language);

    return (
        <IapProvider>
            <Router>
                <div className="min-h-screen bg-slate-900 text-white font-sans">
                    <Routes>
                        <Route path="/" element={!language ? <Onboarding /> : <Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                        <Route path="/lessons" element={<Layout><Lessons /></Layout>} />
                        <Route path="/culture" element={<Layout><Culture /></Layout>} />
                        <Route path="/profile" element={<Layout><Profile /></Layout>} />
                        <Route path="/lesson/:lessonId" element={<LessonRoute />} />
                        <Route path="/review" element={<LessonPlayer key="review" />} />
                        <Route path="/dictionary" element={<Layout><Dictionary /></Layout>} />
                    </Routes>
                </div>
            </Router>
        </IapProvider>
    );
}

export default App;

import { Route, Routes, useLocation } from 'react-router-dom';
import UserNotRegisteredError from '@/components/auth/UserNotRegisteredError';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import About from '@/pages/About';
import Admin from '@/pages/Admin';
import Contact from '@/pages/Contact';
import Home from '@/pages/Home';
import PageNotFound from '@/pages/PageNotFound';
import Projects from '@/pages/Projects';
import Services from '@/pages/Services';

export const AppRoutes = () => {
  const { appPublicSettings, isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdminRoute && authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }

    if (authError.type === 'auth_required') {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-background p-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-display font-bold text-foreground">Authentication Required</h1>
            <p className="mt-3 text-muted-foreground">{authError.message}</p>
          </div>
        </div>
      );
    }
  }

  if (!isAdminRoute && appPublicSettings?.maintenanceMode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Maintenance Mode</h1>
          <p className="mt-3 text-muted-foreground">
            MSole is temporarily unavailable while we make a few updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

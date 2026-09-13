import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => (
  <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Header />
    <Outlet />
    <Footer />
  </>
);



import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

/**
 * MainLayout Component
 * Root application shell with sticky glassmorphism navigation, dynamic main content,
 * ambient background glows, and global footer.
 */
export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#05020c] text-slate-100 relative overflow-x-hidden">
      {/* Global Ambient Glow Flares */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Glassmorphic Sticky Header */}
      <Navbar />

      {/* Content Viewport */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Studio Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;

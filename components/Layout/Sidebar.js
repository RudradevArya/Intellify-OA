'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block">Dashboard</Link>
          <Link href="/profile" className="block">Profile</Link>
          <Link href="/settings" className="block">Settings</Link>
          {/* Add more navigation items as needed */}
        </nav>
      </div>
    </>
  );
}
"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <nav
        className=" fixed top-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 rounded-3xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-md sm:top-4 sm:w-[calc(100%-2rem)] sm:rounded-4xl
        "
      >
        {/* Navbar Main */}
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          
          {/* LEFT SIDE */}
          <div className="flex min-w-0 flex-1 items-center gap-20">
            
            {/* Logo */}
            <div className="shrink-0 text-lg font-bold text-gray-900 sm:text-2xl">
              H<span className="text-blue-600">M</span>
            </div>

            {/* Search / Email */}
            <div className="relative min-w-0 flex-1">
  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />

  <input
    type="email"
    placeholder="Enter Email"
    className=" h-10 w-full rounded-xl bg-white py-2 pl-10 pr-3 text-xs text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-200 sm:h-11 sm:px-4 sm:pl-11 sm:text-sm md:max-w-xs lg:max-w-sm
    "
  />
</div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden shrink-0 items-center gap-5 font-medium text-gray-700 md:flex lg:gap-8">
            <a
              href="#home"
              className="transition hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#about"
              className="transition hover:text-blue-600"
            >
              About
            </a>

            <a
              href="#services"
              className="transition hover:text-blue-600"
            >
              Services
            </a>

            <a
              href="#contact"
              className="transition hover:text-blue-600"
            >
              Contact
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl text-gray-800 transition hover:bg-gray-100 md:hidden
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-gray-200 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4 font-medium text-gray-700">
              
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-blue-600"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-blue-600"
              >
                About
              </a>

              <a
                href="#services"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-blue-600"
              >
                Services
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-blue-600"
              >
                Contact
              </a>

            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
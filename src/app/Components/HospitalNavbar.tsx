"use client";

import React, { useState } from "react";
import { Search, Menu, X, type LucideIcon } from "lucide-react";

export type NavSection = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type HospitalNavbarProps = {
  sections: NavSection[];
  selectedSection: string;
  onSelect: (sectionId: string) => void;
};

export default function HospitalNavbar({
  sections,
  selectedSection,
  onSelect,
}: HospitalNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg md:hidden"
      >
        <Menu size={24} />
      </button>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">
            Hospital<span className="text-blue-600">Flow</span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-xl p-2 hover:bg-slate-100 md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search section"
            className="h-11 w-full rounded-xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = selectedSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => {
                  onSelect(section.id);
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg "
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl`}
                >
                  <Icon size={18} />
                </span>
                {section.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
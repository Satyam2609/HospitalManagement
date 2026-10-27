"use client";

import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  LogOut,
  Settings,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

import Patients from "./Patients";
import DoctorProfile from "./Profile";
import CompletedPatient from "./CompletedPatient";

const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    id: "patients",
    label: "My Patients",
    icon: Users,
  },
  {
    id: "schedule",
    label: "My Schedule",
    icon: CalendarDays,
  },
  {
    id: "tasks",
    label: "My Tasks",
    icon: ClipboardList,
  },
  {
    id: "records",
    label: "Patient Records",
    icon: FileText,
  },
  {
    id: "profile",
    label: "My Profile",
    icon: UserRound,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Doctor() {
  const [selectedSection, setSelectedSection] =
    useState("patients");



const details = useSelector((state: any) => state.user.user);
console.log("fff", details);
console.log(details?.name);
console.log(details?.department);

  const content = useMemo(() => {
    switch (selectedSection) {
      case "patients":
        return <Patients />;

      case "dashboard":
        return (
          <section className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h2>
            <p className="mt-2 text-slate-500">
              Doctor dashboard coming soon.
            </p>
          </section>
        );

      case "schedule":
        return (
          <section className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-slate-800">
              My Schedule
            </h2>
          </section>
        );

      case "tasks":
        return (
          <section className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-slate-800">
              My Tasks
            </h2>
          </section>
        );

      case "records":
        return <CompletedPatient/>

      case "profile":
      return <DoctorProfile/>

      case "settings":
        return (
          <section className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-slate-800">
              Settings
            </h2>
          </section>
        );

      default:
        return <Patients />;
    }
  }, [selectedSection]);

  return (
    <div className="min-h-screen bg-slate-100 md:pl-72">

      {/* LEFT NAVIGATION */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-slate-200 bg-white md:flex">

        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b px-6">
          <div className="rounded-xl bg-blue-600 p-2.5 text-white">
            <Stethoscope size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              MediCare
            </h1>

            <p className="text-xs text-slate-500">
              Doctor Portal
            </p>
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="mx-4 mt-5 rounded-2xl bg-blue-50 p-4">
          <h2 className="text-sm font-semibold text-slate-800">
          Dr. {details?.username || details?.name || "Doctor Name"}
          </h2>

          <p className="text-xs text-blue-600">
           
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 px-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Doctor Menu
          </p>

          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;

              const isActive =
                selectedSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() =>
                    setSelectedSection(section.id)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  <Icon size={19} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="min-h-[calc(100vh-4rem)]">
          {content}
        </div>
      </main>
    </div>
  );
}
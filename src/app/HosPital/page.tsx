"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  ClipboardList,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import HospitalNavbar, { type NavSection } from "../Components/HospitalNavbar";
import WorkersPro from "./WorkersPro";
import AllWorkerRecords from "./AllWorkerRecords";
import CreateWorkerTask from "./CreateWorkerTask";
import PatientRecord from "./PatientRecord";
import HospitalAnalytics from "./HospitalAnlysis";
import RoomsForm from "./RoomsForm";

const sections: NavSection[] = [
  { id: "workers", label: "Workers", icon: Users },
  { id: "patients", label: "Patients", icon: Stethoscope },
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "Anlysis", label: "Anlysis", icon: BarChart3 },
  { id: "rooms", label: "Rooms details", icon: BarChart3 },

  { id: "settings", label: "Settings", icon: Settings },
  { id: "Allworkers", label: "Worker Records", icon: Users },
  { id: "Tasks", label: "Worker Tasks", icon: ClipboardList },
];

export default function Hospital() {
  const [selectedSection, setSelectedSection] = useState("workers");

  const content = useMemo(() => {
    switch (selectedSection) {
      case "workers":
        return <WorkersPro />;
      case "patients":
        return <PatientRecord/>
      case "departments":
        return (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Hospital Units
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">Departments</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Emergency",
                "Cardiology",
                "Neurology",
                "Pediatrics",
                "Surgery",
                "Radiology",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{item}</span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                      Active
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">Staff and resources are assigned for this department.</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "reports":
        return (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Analytics
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">Hospital Reports</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Daily Patients", "348"],
                ["Worker Attendance", "96%"],
                ["Bed Occupancy", "72%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "settings":
        return (
          <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              System Configuration
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">Settings</h2>
            <div className="mt-6 space-y-3">
              {[
                "Hospital profile",
                "Staff permissions",
                "Notification rules",
                "Backup schedule",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="font-medium text-slate-700">{item}</span>
                  <ClipboardList className="text-slate-400" size={18} />
                </div>
              ))}
            </div>
          </section>
        );
         case "Allworkers":
        return <AllWorkerRecords/>;
        case "Tasks":
        return <CreateWorkerTask />;
        case "Anlysis":
          return <HospitalAnalytics/>
          case "rooms":
          return <RoomsForm/>
      default:
        return <WorkersPro />;

    }
  }, [selectedSection]);

  return (
    <div className="min-h-screen bg-slate-100 md:pl-72">
      <HospitalNavbar
        sections={sections}
        selectedSection={selectedSection}
        onSelect={setSelectedSection}
      />

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="min-h-[calc(100vh-4rem)]">{content}</div>
      </main>
    </div>
  );
}
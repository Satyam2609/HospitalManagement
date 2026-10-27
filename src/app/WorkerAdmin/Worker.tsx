
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  CalendarDays,
  Clock3,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  UserRound,
  Wallet,
  Bell,
  BriefcaseBusiness,
  X,
} from "lucide-react";
import { UseSelector } from "react-redux";

import axios from "axios";
import { useLayoutEffect, useState } from "react";

import WorkerTasksS from "./WorkersTasks";
import CreatePatient from "./PatientForm";
import DoctorProfile from "./Profile";
import RoomsForm from "./TakeApatient";
import UnderWorkingStaffForm from "./TakeApatient";
import { useRouter } from "next/navigation";



export default function Worker() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reciptionist , setreciptionis] = useState(false)

  // Which component should be visible
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const navigate = useRouter()

 const user = useSelector(
  (state: any) => state.user.user?.workerposition
);
setTimeout(() => {
  if(!user){
navigate.push("/")
}
},100000)

  // Temporary example:
  // baad mein yahan logged-in employee identify karna

  useLayoutEffect(() => {
    const fetch = async() => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/permissions/formworker`, {
          withCredentials:true
        })

setreciptionis(true)
console.log(res.data)

      } catch (error) {
        setreciptionis(false)
        
      }
    }
    fetch()
  }, [])
const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "My Profile", icon: UserRound },

  ...(reciptionist
    ? [{ name: "patient Register", icon: UserRound }]
    : []),
  ...(user === "head" ? [{ name: "Assign", icon: FileText },] : []),
  { name: "Attendance", icon: Clock3 },
  { name: "My Shifts", icon: CalendarDays },
  { name: "Leave", icon: FileText },
  { name: "Salary & Payslips", icon: Wallet },
  { name: "Work", icon: BriefcaseBusiness },
];


  // Component according to sidebar click
  const renderComponent = () => {
    switch (activeMenu) {
     
      case "Work":
        return <WorkerTasksS />;
      case "patient Register":
         return<CreatePatient/>
      case "My Profile":
         return <DoctorProfile/>
      case "Assign":
        return <UnderWorkingStaffForm/>


    }
  };



  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-800">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-[250px]
          border-r border-slate-200 bg-white
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex h-full flex-col">

          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                +
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  H<span className="text-blue-600">M</span>
                </h1>

                <p className="text-[10px] text-slate-400">
                  Hospital Staff Portal
                </p>
              </div>

            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={20} />
            </button>

          </div>

          {/* Navigation */}
          <div className="px-4">

            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>

            <nav className="space-y-1">

              {menuItems.map((item) => {

                const Icon = item.icon;

                const isActive = activeMenu === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveMenu(item.name);
                      setSidebarOpen(false);
                    }}
                    className={`
                      flex w-full items-center gap-3 rounded-xl px-3 py-3
                      text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    <Icon size={18} />

                    {item.name}
                  </button>
                );
              })}

            </nav>
          </div>

          {/* Bottom */}
          <div className="mt-auto p-4">

            <div className="mb-3 rounded-2xl bg-blue-50 p-4">

              <p className="text-sm font-semibold text-slate-800">
                Need Help?
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Contact HR for attendance, salary or shift issues.
              </p>

              <button className="mt-3 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <MessageCircle size={15} />
                Contact HR
              </button>

            </div>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50">
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-[250px]">

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur lg:px-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs text-slate-400">
                Tuesday, September 8, 2026
              </p>

              <h2 className="text-lg font-bold text-slate-900">
                {activeMenu}
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={20} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

          </div>

        </header>

        {/* ONLY ACTIVE COMPONENT */}
        <div className="p-5 lg:p-8">
          {renderComponent()}
        </div>

      </main>

    </div>
  );
}

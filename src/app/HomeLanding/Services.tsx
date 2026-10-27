"use client"
import {
  Stethoscope,
  CalendarCheck,
  Ambulance,
  FlaskConical,
  Pill,
  HeartPulse,
  ArrowUpRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
export default function Services() {
  const services = [
    {
      icon: Stethoscope,
      service: "Find Doctor",
      description:
        "Find the right doctor and book an appointment easily.",
        links:"/FindHospitals"
    },
    {
      icon: CalendarCheck,
      service: "Book Appointment",
      description:
        "Schedule your appointment quickly with our experienced doctors.",
    },
    {
      icon: Ambulance,
      service: "Emergency Care",
      description:
        "Get immediate medical assistance with our 24/7 emergency service.",
    },
    
  ];
  const router = useRouter()
function navigatepage(data:any) {
    router.push(`${data}`)
}

  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-8xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-center">

          <div className="w-full flex flex-col justify-center items-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Our Services
            </p>
            <span>Quick and responsive medical assistance for urgent situations</span>

           
          </div>

          
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
            key={index}
            onClick={() => navigatepage(item.links)}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 p-7 transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100"
              >

                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl  text-blue-600  transition group-hover:bg-blue-500 group-hover:text-white">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-white">
                  {item.service}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500 transition group-hover:text-blue-100">
                  {item.description}
                </p>


                {/* Decorative circle */}
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-blue-200/50 transition group-hover:bg-blue-500/30" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
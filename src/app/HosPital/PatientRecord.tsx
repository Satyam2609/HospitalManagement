
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Users,
  UserRound,
  Stethoscope,
  MapPin,
  Phone,
  Activity,
  Search,
  HeartPulse,
} from "lucide-react";
import { useState } from "react";

export default function PatientRecord() {
  const [search, setSearch] = useState("");

  const getpatients = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/patient/getAll`,
      { withCredentials: true }
    );

    return res.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patient"],
    queryFn: getpatients,
  });

  const patients = data?.patients || [];
  const totalPatients = data?.totalPatients || 0;

  const filteredPatients = patients.filter((p: any) =>
    `${p.patientname} ${p.department} ${p.doctor}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8 text-slate-500">Loading patients...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-500">Failed to load patients.</div>;
  }

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Hospital Management
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-800">
            Patient Records
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage and view registered patients.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border bg-white px-5 py-4 shadow-sm">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Patients</p>
            <h2 className="text-2xl font-bold text-slate-800">
              {totalPatients}
            </h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm">
        <Search size={20} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient, department or doctor..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Patient Cards */}
      {filteredPatients.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <HeartPulse className="mx-auto mb-3 text-slate-300" size={40} />
          <h3 className="font-semibold text-slate-700">
            No patients found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try another search term.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPatients.map((p: any) => (
            <div
              key={p._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 border-b bg-gradient-to-r from-blue-50 to-white p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-black">
                  <UserRound size={28} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-slate-800">
                    {p.patientname}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    ID: {p._id.slice(-8).toUpperCase()}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {p.department}
                  </span>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <Stethoscope size={18} className="mt-1 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400">Assigned Doctor</p>
                    <p className="mt-1 font-medium text-slate-700">
                      {p.doctor || "Not assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400">Room / Ward / Bed</p>
                    <p className="mt-1 font-medium text-slate-700">
                      {p.location || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity size={18} className="mt-1 shrink-0 text-rose-500" />
                  <div>
                    <p className="text-xs text-slate-400">Medical Problem</p>
                    <p className="mt-1 font-medium text-slate-700">
                      {p.problem || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-dashed pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Guardian Details
                  </p>

                  <div className="flex items-center gap-3">
                    <UserRound size={18} className="text-slate-400" />
                    <p className="text-sm font-medium text-slate-700">
                      {p.gurdian || "Not provided"}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <Phone size={18} className="text-slate-400" />
                    <p className="text-sm font-medium text-slate-700">
                      {p.gurdiancounts || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
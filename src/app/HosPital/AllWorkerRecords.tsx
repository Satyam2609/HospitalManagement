"use client";

import {
  Search,
  Phone,
  Mail,
  BriefcaseBusiness,
  Clock3,
  UserRound,
  CheckCircle2,
  Circle,
} from "lucide-react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AllWorkerRecords() {
  const [search, setSearch] = useState("");

  const getemployees = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/employee/getAll`,
      {
        withCredentials: true,
      }
    );

    console.log("All Employees:", res.data.data);

    return res.data.data;
  };

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getemployees,
  });

  const filteredWorkers = employees.filter((worker: any) => {
    const searchText = search.toLowerCase();

    const taskMatch = worker.currentWork?.some((task: any) =>
      task.title?.toLowerCase().includes(searchText)
    );

    return (
      worker.name?.toLowerCase().includes(searchText) ||
      worker.work?.toLowerCase().includes(searchText) ||
      worker.department?.toLowerCase().includes(searchText) ||
      taskMatch
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Worker Records
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View worker details, current work and previous assignments.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">
                Total Workers
              </p>

              <p className="text-xl font-bold text-slate-900">
                {employees.length}
              </p>
            </div>

          </div>
        </div>

        {/* Search */}
        <div className="mb-7">
          <div className="relative max-w-xl">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search worker by name, department or task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />

          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl bg-white p-8 text-center">
            Loading workers...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl bg-red-50 p-8 text-center text-red-500">
            Failed to load workers.
          </div>
        )}

        {/* Worker Cards */}
        {!isLoading && !isError && (
          filteredWorkers.length > 0 ? (

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredWorkers.map((worker: any) => {

                const currentWork = worker.currentWork ?? [];

                const latestTask = currentWork[currentWork.length - 1];

                const lastTwoWorks = currentWork.slice(-2).reverse();

                return (
                  <div
                    key={worker._id || worker.employeId}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    {/* Worker Header */}
                    <div className="border-b border-slate-100 p-5">

                      <div className="flex items-center gap-4">

                        <img
                          src={worker.profilePhoto}
                          alt={worker.name}
                          className="h-16 w-16 rounded-full object-cover ring-4 ring-slate-50"
                        />

                        <div className="min-w-0 flex-1">

                          <h2 className="truncate text-lg font-semibold text-slate-900">
                            {worker.name}
                          </h2>

                          <div className="mt-1 flex items-center gap-2">
                            <UserRound
                              size={14}
                              className="text-slate-400"
                            />

                            <span className="text-sm text-slate-500">
                              {worker.department}
                            </span>
                          </div>

                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                          Active
                        </span>

                      </div>

                      {/* Contact */}
                      <div className="mt-5 space-y-2">

                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Phone size={16} className="text-slate-400" />
                          {worker.phone}
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Mail size={16} className="text-slate-400" />
                          <span className="truncate">
                            {worker.email}
                          </span>
                        </div>

                      </div>

                    </div>

                    {/* Current Work */}
                    <div className="p-5">

                      <div className="mb-2 flex items-center justify-between">

                        <div className="flex items-center gap-2">
                          <BriefcaseBusiness
                            size={17}
                            className="text-slate-500"
                          />

                          <h3 className="text-sm font-semibold text-slate-800">
                            Current Work
                          </h3>
                        </div>

                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
                          {latestTask?.status || "No Task"}
                        </span>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">

                        {latestTask ? (
                          <>
                            <p className="text-sm font-medium text-slate-800">
                              {latestTask.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Activity: {latestTask.Activity}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-slate-400">
                            No current work assigned
                          </p>
                        )}

                      </div>

                      {/* Last 2 Works */}
                      <div className="mt-5">

                        <div className="mb-3 flex items-center gap-2">
                          <Clock3
                            size={17}
                            className="text-slate-500"
                          />

                          <h3 className="text-sm font-semibold text-slate-800">
                            Last 2 Works
                          </h3>
                        </div>

                        <div className="space-y-2">

                          {lastTwoWorks.length > 0 ? (

                            lastTwoWorks.map((work: any, index: number) => (

                              <div
                                key={work._id || index}
                                className="rounded-lg bg-slate-100 p-3"
                              >

                                <div className="flex items-start gap-2">

                                  {work.status === "completed" ? (
                                    <CheckCircle2
                                      size={16}
                                      className="mt-0.5 shrink-0 text-emerald-500"
                                    />
                                  ) : (
                                    <Circle
                                      size={16}
                                      className="mt-0.5 shrink-0 text-slate-400"
                                    />
                                  )}

                                  <div>

                                    <p className="text-sm text-slate-600">
                                      {work.title}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                      Status: {work.status}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                      Activity: {work.Activity}
                                    </p>

                                  </div>

                                </div>

                              </div>

                            ))

                          ) : (

                            <p className="text-sm text-slate-400">
                              No previous work
                            </p>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">

              <Search
                className="mx-auto mb-3 text-slate-400"
                size={30}
              />

              <h3 className="font-semibold text-slate-800">
                No worker found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try searching with another name or department.
              </p>

            </div>

          )
        )}

      </div>
    </div>
  );
}
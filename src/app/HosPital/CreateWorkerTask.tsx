"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Worker {
  _id: string;
  name: string;
  work?: string;
  department?: string;
}

interface FormData {
  title: string;
  priority: string;
  department: string;
  common:string
}

export default function CreateTask() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    priority: "Medium",
    department: "",
    common:"common TASK"
  });
  const [emplo, setEmplo] = useState<string>("");

  // =========================
  // GET DEPARTMENTS
  // =========================

  const getDepartments = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/employee/getdepartments`;

      const res = await axios.get(url, {
        withCredentials: true,
      });

      console.log("Departments:", res.data.data);

      return res.data.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  };

  // =========================
  // GET FREE WORKERS
  // =========================

  const getfreeworkers = async (department: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/employee/getfreeworkers/${department}`;

      const res = await axios.get(url, {
        withCredentials: true,
      });

      console.log("Free Workers:", res.data.data);

      return res.data.data;
    } catch (error) {
      console.error("Error fetching free workers:", error);
      throw error;
    }
  };

  // =========================
  // DEPARTMENTS QUERY
  // =========================

  const {
    data: departments,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  // =========================
  // FREE WORKERS QUERY
  // =========================

  const {
    data: dataworkers = [],
    isLoading: workersLoading,
    isError: workersError,
  } = useQuery({
    queryKey: ["freeworkers", formData.department],
    queryFn: () => getfreeworkers(formData.department),
    enabled: !!formData.department,
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "department" && {
        employeeId: "",
      }),
    }));
  };

  // =========================
  // CREATE TASK
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!emplo) {
      alert("Please select a worker");
      return;
    }

    console.log("Task Data:", formData);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/employee/CreateTask/${emplo}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Task Created:", res.data);

      alert("Task created successfully!");

      setFormData({
        title: "", 
        priority: "Medium",
        department: "",
         common: "common TASK"
      });
    } catch (error) {
      console.error("Error creating task:", error);

      alert("Failed to create task");
    }
  };

  return (
    <div className="w-full px-0 sm:px-6 lg:px-10 pb-10">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Task
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create and assign a new task to a worker.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white text-black p-6 shadow-sm"
      >
        {/* ================= TASK TITLE ================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Ward inspection"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* ================= DEPARTMENT ================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            disabled={departmentsLoading}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              {departmentsLoading
                ? "Loading departments..."
                : "Select department"}
            </option>

            {departments?.map(
              (department: string, index: number) => (
                <option
                  key={`${department}-${index}`}
                  value={department}
                >
                  {department}
                </option>
              )
            )}
          </select>

          {departmentsError && (
            <p className="mt-1 text-sm text-red-500">
              Failed to load departments
            </p>
          )}
        </div>

        {/* ================= PRIORITY ================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            name="common"
            value={formData.common}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="common TASK">Common TASK</option>
            <option value="Free">New</option>
          </select>
        </div>

        {/* ================= ASSIGN WORKER ================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Assign Worker
          </label>

         <select
  name="employeeId"
  value={emplo}
  onChange={(e) => setEmplo(e.target.value)}
  required
  disabled={!formData.department || workersLoading}
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
>
  <option value="">
    {!formData.department
      ? "Select department first"
      : workersLoading
      ? "Loading workers..."
      : "Select worker"}
  </option>

  {dataworkers?.map((worker: Worker) => (
    <option key={worker._id} value={worker._id}>
      {worker.name}
    </option>
  ))}
</select>
          {workersError && (
            <p className="mt-1 text-sm text-red-500">
              Failed to load free workers
            </p>
          )}

          {formData.department &&
            !workersLoading &&
            !workersError &&
            dataworkers.length === 0 && (
              <p className="mt-1 text-sm text-gray-500">
                No free workers found in this department.
              </p>
            )}
        </div>

        {/* ================= SUBMIT ================= */}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
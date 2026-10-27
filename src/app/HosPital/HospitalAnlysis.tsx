"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type PatientRecord = {
  department: string;
  total: number;
  createdAt: string;
};

type Department = {
  _id: string;
};

type TotalRecord = {
  _id: {
    department: string;
    date: string;
  };
  total: number;
};

export default function HospitalAnalytics() {
  const [targetdate, setTargetDate] = useState("2026-10-18");
  const [department, setDepartment] = useState("");
  const [numberdays , setnumberdays] = useState("")

  // Fetch patients by selected date and department
  const getPatientData = async (): Promise<PatientRecord[]> => {
    const formattedDate = targetdate
      ? targetdate.split("-").reverse().join("-")
      : "";

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/analysis/patientrecord`,
      {
        params: {
          targetDate: formattedDate,
          department: department || undefined,
        },
        withCredentials: true,
      }
    );

    return (res.data.patient ?? []).map(
      (item: {
        _id: string;
        total: number;
        createdAt?: string;
      }) => ({
        department: item._id,
        total: Number(item.total),
        createdAt: item.createdAt ?? formattedDate,
      })
    );
  };

  // Fetch departments
  const getDepartments = async (): Promise<Department[]> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/analysis/getdepartments`,
      { withCredentials: true }
    );

    return res.data.deprt ?? [];
  };

  // Fetch overall patient totals by date
 const getTotalData = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/analysis/gettotalpatients/${numberdays}`,
    { withCredentials: true }
  );
  console.log(res.data.totalrecord)

  return res.data.totalrecord;
};

const {
  data = [],
  isLoading: totalLoading,
  error: totalError,
} = useQuery({
  queryKey: ["patientrecodtotal", numberdays],
  queryFn: getTotalData,
  enabled: Boolean(numberdays),
});

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const {
    data: patientData = [],
    isLoading,
    error,
  } = useQuery<PatientRecord[]>({
    queryKey: ["recordpatient", department, targetdate],
    queryFn: getPatientData,
    enabled: Boolean(targetdate),
  });

 const analysisdata = numberdays
  ? (data?.departments ?? []).map((item: any) => ({
      department: item._id,
      total: Number(item.totalPatients),
      createdAt: "",
    }))
  : patientData;


  // Selected date + department total
  const totalPatients = patientData.reduce(
    (sum, item) => sum + item.total,
    0
  );

  if (isLoading) {
    return <p className="p-5">Loading patient analytics...</p>;
  }

  if (error) {
    return (
      <p className="p-5 text-red-600">
        Failed to load patient analytics: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-6 rounded-xl bg-gray-50 p-5">
      <h2 className="text-2xl font-bold text-gray-800">
        Patient Analytics
      </h2>

      {/* Department filters */}
      <div className="flex gap-3 overflow-x-auto">
        <button
          onClick={() => setDepartment("")}
          className={`shrink-0 rounded-lg px-4 py-2 ${
            department === ""
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          All Departments
        </button>

        {departments.map((dept) => (
          <button
            key={dept._id}
            onClick={() => setDepartment(dept._id)}
            className={`shrink-0 rounded-lg px-4 py-2 ${
              department === dept._id
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {dept._id}
          </button>
        ))}
      </div>

      {/* Total and date filter */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Total Patients
          </p>
          <h3 className="mt-2 text-3xl font-bold text-blue-600">
  {numberdays
    ? (data?.departments ?? []).reduce(
        (sum: number, item: any) =>
          sum + Number(item.totalPatients),
        0
      )
    : totalPatients}
</h3>
          <p className="mt-1 text-sm text-gray-500">
            {department || "All Departments"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
  {[7, 10, 15, 30].map((days) => (
    <button
      key={days}
      onClick={() => setnumberdays(String(days))}
      className={`rounded-2xl p-3 ${
        numberdays === String(days)
          ? "bg-blue-600 text-white"
          : "bg-amber-300 text-black"
      }`}
    >
      {days} Days
    </button>
  ))}
</div>

        <div>
          <label
            htmlFor="target-date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Date
          </label>
          <input
            id="target-date"
            type="date"
            value={targetdate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="rounded-lg border border-gray-300 bg-pink-50 p-3"
          />
        </div>
      </div>

      {/* Department-wise patient chart */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          Patients by Department
        </h3>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analysisdata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="total"
                name="Total Patients"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
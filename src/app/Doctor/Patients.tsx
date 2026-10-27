"use client";

import { useQuery , useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Patients() {

  const queryClient = useQueryClient();
  const [show , setshow] = useState(false)

  const handleSubmit = async (patientId: string, status: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/doctor/update`,
        {
          _id: patientId,
          status: status,
        },
        {
          withCredentials: true,
        }
      );

        await queryClient.invalidateQueries({
      queryKey: ["dpatients"],
    });
    } catch (error: any) {
      console.log(
        error.response?.data?.message || error.message
      );
    }
  };

  const fetchpatient = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/doctor/getAll`,
        {
          withCredentials: true,
        }
      );
  
  console.log("dnef" , res.data.data)
  const acceptdata = res.data.data.map((a:any) => a.applicationStatus === "Complete")
          if(acceptdata){
  setshow(true)
            
          }
          console.log("🔥 API response:", res.data.data);
      return res.data.data;
    } catch (error:any) {
      console.log(error.data?.response?.message)
    }
    finally{
      setshow(false)
    }
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dpatients"],
    queryFn: fetchpatient,
  });

  if (isLoading) {
    return <p>Loading patients...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        {axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "Something went wrong"}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((patient: any) => (
        <div
          key={patient._id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
        >
          {/* Patient Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
              {patient.patientname?.charAt(0)?.toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-800">
                {patient.patientname}
              </h2>

              <span className="text-sm text-gray-500">
                Patient
              </span>
            </div>
          </div>

          {/* Department */}
          <div className="mt-5 rounded-xl bg-blue-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
              Department
            </p>

            <p className="mt-1 font-semibold text-blue-800">
              {patient.department}
            </p>
          </div>

          {/* Location */}
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Location
            </p>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {patient.location}
            </p>
          </div>

          {/* Problem */}
          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Patient Problem
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-700">
              {patient.problem}
            </p>
          </div>

          {/* Doctor */}
          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Assigned Doctor
            </p>

            <p className="mt-1 font-semibold text-gray-800">
              {patient.doctor}
            </p>
          </div>

          {/* Guardian */}
          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Guardian Details
            </p>

            <p className="mt-2 font-semibold text-gray-800">
              {patient.gurdian}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Contact: {patient.gurdiancounts}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                handleSubmit(patient._id, "Accept");
              }}
              className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
            >
              Accept
            </button>

            <button
              type="button"
              onClick={() => {
              
                handleSubmit(patient._id, "Reject");
              }}
              className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={() => {
                handleSubmit(patient._id, "Complete");
              }}
              className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
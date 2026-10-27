import React from 'react'
import axios from "axios";
import {useState} from "react"
import {useQuery} from "@tanstack/react-query"  

export default function CompletedPatient() {
  const [show , setshow] = useState(false)
    const fetchcompatient = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/doctor/getComplete`,
        {
          withCredentials: true,
        }
      );
  
  console.log("dnef" , res.data.data)
 
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
    queryKey: ["comPatients"],
    queryFn: fetchcompatient,
  });
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

        </div>
      ))}
    </div>
  )
}

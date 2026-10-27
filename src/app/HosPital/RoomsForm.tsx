
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type PatientRoom = {
  Hosptialroomno: string;
  Patient: string;
  department: string;
  FreeBad: string;
};

type MedicalEquipment = {
  name: string;
  category: string;
  quantity: string;
  availableQuantity: string;
  status: string;
};

type FormData = {
  HosptialPaRoom: PatientRoom[];
  Hospitalstaff: string;
  employeeId:string
  medicalEquipments: MedicalEquipment[];
};

type Department = {
  _id: string;
};

type Staff = {
  employeeId: string;
  name?: string;
  staffname?: string;
  countcheck: number;
};

type DepartmentResponse = {
  departments: Department[];
  staffdata: Staff[];
};

const initialFormData: FormData = {
  HosptialPaRoom: [
    {
      Hosptialroomno: "",
      Patient: "",
      department: "",
      FreeBad: ""
    },
  ],
  Hospitalstaff: "",
  employeeId:"",
  medicalEquipments: [
    {
      name: "",
      category: "",
      quantity: "",
      availableQuantity: "",
      status: "",
    },
  ],
};

const API_URL = process.env.NEXT_PUBLIC_URL;

export default function RoomsForm() {
  const [formdata, setformdata] =
    useState<FormData>(initialFormData);

  const department =
    formdata.HosptialPaRoom[0].department;

  // Update room and patient fields
  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      HosptialPaRoom: prev.HosptialPaRoom.map(
        (room, index) =>
          index === 0
            ? { ...room, [name]: value }
            : room
      ),
    }));
  };

  // Update department and clear previously selected staff
  const handleDepartmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setformdata((prev) => ({
      ...prev,
      HosptialPaRoom: prev.HosptialPaRoom.map(
        (room, index) =>
          index === 0
            ? { ...room, department: value }
            : room
      ),
      Hospitalstaff: "",
    }));
  };

  // Hospitalstaff is a STRING
 const handleStaffChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const employeeId = e.target.value;

  setformdata((prev) => ({
    ...prev,
    Hospitalstaff: employeeId,
    employeeId: employeeId,
  }));
};

  // Update medical equipment fields
  const handleEquipmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      medicalEquipments: prev.medicalEquipments.map(
        (equipment, index) =>
          index === 0
            ? { ...equipment, [name]: value }
            : equipment
      ),
    }));
  };

  // Fetch departments and department-specific staff
  const getDepartments = async (
    selectedDepartment: string
  ): Promise<DepartmentResponse> => {
    const res = await axios.get(
      `${API_URL}/api/analysis/departmentsfor`,
      {
        params: selectedDepartment
          ? { depart: selectedDepartment }
          : {},
        withCredentials: true,
      }
    );

    const result = res.data?.data ?? res.data;
console.log(result)
    // Support an array response as well as an object response
    if (Array.isArray(result)) {
      return {
        departments: selectedDepartment ? [] : result,
        staffdata: selectedDepartment ? result : [],
      };
    }

    return {
      departments:
        result?.departments ?? result?.deprt ?? [],
      staffdata: result?.staffdata ?? [],
    };
  };

  const {
    data: responseData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["departments", department],
    queryFn: () => getDepartments(department),
    placeholderData: (previousData) => previousData,
  });

  const departments = responseData?.departments ?? [];
  const staffdata = responseData?.staffdata ?? [];

  // Submit form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/hospital/create`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Hospital details saved:", response.data);

      alert("Hospital details saved successfully!");

      setformdata({
        HosptialPaRoom: [
          {
            Hosptialroomno: "",
            Patient: "",
            department: "",
            FreeBad: "",
          },
        ],
        Hospitalstaff: "",
        employeeId:"",
        medicalEquipments: [
          {
            name: "",
            category: "",
            quantity: "",
            availableQuantity: "",
            status: "",
          },
        ],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "API Error:",
          error.response?.data ?? error.message
        );

        alert(
          error.response?.data?.message ??
            "Failed to save hospital details."
        );
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong.");
      }
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Hospital Room Management
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Hospital Room */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            1. Hospital Room
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="Hosptialroomno">
                Hospital Room Number
              </label>

              <input
                id="Hosptialroomno"
                className={inputClass}
                name="Hosptialroomno"
                value={formdata.HosptialPaRoom[0].Hosptialroomno}
                onChange={handlePatientChange}
                placeholder="Enter room number"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="department">
                Select Department
              </label>

              <select
                id="department"
                className={inputClass}
                name="department"
                value={department}
                onChange={handleDepartmentChange}
                required
              >
                <option value="">Select Department</option>

                {departments.map((item, index) => (
                  <option
                    key={item._id ?? index}
                    value={item._id}
                  >
                    {item._id}
                  </option>
                ))}
              </select>

              {isLoading && (
                <p className="mt-1 text-xs text-gray-500">
                  Loading departments...
                </p>
              )}

              {error && (
                <p className="mt-1 text-xs text-red-600">
                  Failed to load departments.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 2. Patient Room */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            2. Patient Room Details
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="Patient">
                Patient Name / ID
              </label>

              <input
                id="Patient"
                className={inputClass}
                name="Patient"
                value={formdata.HosptialPaRoom[0].Patient}
                onChange={handlePatientChange}
                placeholder="Enter patient name or ID"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="FreeBad">
                Free Beds
              </label>

              <input
                id="FreeBad"
                className={inputClass}
                type="number"
                min="0"
                name="FreeBad"
                value={formdata.HosptialPaRoom[0].FreeBad}
                onChange={handlePatientChange}
                placeholder="Enter free beds"
                required
              />
            </div>
          </div>
        </section>

        {/* 3. Hospital Staff */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            3. Hospital Staff
          </h2>

          <div>
            <label className={labelClass} htmlFor="Hospitalstaff">
              Staff Allotment
            </label>

            <select
              id="Hospitalstaff"
              className={inputClass}
              name="Hospitalstaff"
              value={formdata.Hospitalstaff}
              onChange={handleStaffChange}
              disabled={!department || isFetching}
              required
            >
              <option value="">
                {department
                  ? "Select Staff"
                  : "Select department first"}
              </option>

            {staffdata.map((item, index) => (
  <option
    key={item.employeeId ?? index}
    value={item.employeeId}
  >
    {item.name ?? item.staffname ?? item.employeeId}
  </option>
))}

            </select>
          </div>
        </section>

        {/* 4. Medical Equipment */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            4. Medical Equipment
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="equipmentName">
                Equipment Name
              </label>

              <input
                id="equipmentName"
                className={inputClass}
                name="name"
                value={formdata.medicalEquipments[0].name}
                onChange={handleEquipmentChange}
                placeholder="e.g. Ventilator"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="category">
                Category
              </label>

              <input
                id="category"
                className={inputClass}
                name="category"
                value={formdata.medicalEquipments[0].category}
                onChange={handleEquipmentChange}
                placeholder="e.g. ICU Equipment"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="quantity">
                Total Quantity
              </label>

              <input
                id="quantity"
                className={inputClass}
                type="number"
                min="0"
                name="quantity"
                value={formdata.medicalEquipments[0].quantity}
                onChange={handleEquipmentChange}
                placeholder="Enter total quantity"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="availableQuantity">
                Available Quantity
              </label>

              <input
                id="availableQuantity"
                className={inputClass}
                type="number"
                min="0"
                name="availableQuantity"
                value={formdata.medicalEquipments[0].availableQuantity}
                onChange={handleEquipmentChange}
                placeholder="Enter available quantity"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="status">
                Equipment Status
              </label>

              <select
                id="status"
                className={inputClass}
                name="status"
                value={formdata.medicalEquipments[0].status}
                onChange={handleEquipmentChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Hospital Details
        </button>
      </form>
    </div>
  );
}

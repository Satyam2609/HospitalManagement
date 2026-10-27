"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  IndianRupee,
} from "lucide-react";
import axios from "axios";

export default function WorkersPro() {
  const [formdata, setformdata] = useState({
    department: "",
    workertype: "",
    name: "",
    email: "",
    phone: "",
    salary: "",
    work: "",
    profilePhoto: null as File | null,
  });

  // =========================
  // Input Change
  // =========================
  const handleChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("department", formdata.department);
      data.append("workertype", formdata.workertype);
      data.append("name", formdata.name);
      data.append("email", formdata.email);
      data.append("phone", formdata.phone);
      data.append("salary", formdata.salary);
      data.append("work", formdata.work);

      if (formdata.profilePhoto) {
        data.append("profilePhoto", formdata.profilePhoto);
      }

      console.log("Form Data:", {
        department: formdata.department,
        workertype: formdata.workertype,
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        salary: formdata.salary,
        work: formdata.work,
        profilePhoto: formdata.profilePhoto,
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/employee/create`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Employee Created:", res.data);

      // Optional: reset form after success
      setformdata({
        department: "",
        workertype: "",
        name: "",
        email: "",
        phone: "",
        salary: "",
        work: "",
        profilePhoto: null,
      });
    } catch (error: any) {
      console.log(
        "Error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <section className="min-h-screen w-full bg-slate-100">
      <div className="flex min-h-screen w-full items-center justify-center px-5 py-10 lg:px-10">

        <div className="w-full max-w-5xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-10">

          {/* =========================
              Header
          ========================= */}
          <div className="mb-8 text-center">
            <h1 className="mt-3 text-3xl font-bold text-slate-800 sm:text-4xl">
              Create Worker ID
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Register hospital workers and assign their responsibilities.
            </p>
          </div>

          {/* =========================
              Form
          ========================= */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-black"
          >

            {/* =========================
                Name + Email
            ========================= */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Name */}
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleChanges}
                  placeholder="Enter Full Name"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handleChanges}
                  placeholder="Enter Email"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>

            {/* =========================
                Phone + Salary
            ========================= */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Phone */}
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formdata.phone}
                  onChange={handleChanges}
                  placeholder="Enter Phone Number"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Salary */}
              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="salary"
                  value={formdata.salary}
                  onChange={handleChanges}
                  placeholder="Enter Salary"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>

            {/* =========================
                Photo + Worker Details
            ========================= */}
            <div className="flex w-full flex-col gap-6 md:flex-row">

              {/* =========================
                  LEFT - Profile Photo
              ========================= */}
              <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 md:w-1/3">

                <div className="relative mb-4">

                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-md">

                    {formdata.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(
                          formdata.profilePhoto
                        )}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User
                        size={50}
                        className="text-slate-400"
                      />
                    )}

                  </div>

                </div>

                <label
                  htmlFor="profilePhoto"
                  className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Upload Profile Photo
                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setformdata((prev) => ({
                        ...prev,
                        profilePhoto: file,
                      }));
                    }
                  }}
                />

                <p className="mt-2 text-xs text-slate-400">
                  JPG, PNG up to 5MB
                </p>

              </div>

              {/* =========================
                  RIGHT - Worker Details
              ========================= */}
              <div className="flex w-full flex-col gap-4 md:w-2/3">

                {/* =========================
                    Worker Type
                ========================= */}
                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    name="workertype"
                    value={formdata.workertype}
                    onChange={handleChanges}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-500 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">
                      Select Worker Type
                    </option>

                    <option value="worker">
                      Worker
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>
                  </select>
                </div>

                {/* =========================
                    Department
                ========================= */}
                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

               {
  formdata.workertype === "doctor" ? (
    <div className="relative">
      <Briefcase
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <select
        name="department"
        value={formdata.department}
        onChange={handleChanges}
        required
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-500 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      >
        <option value="">Select Doctor Type</option>

        <option value="General Physician">
          General Physician
        </option>

        <option value="Cardiologist">
          Cardiologist
        </option>

        <option value="Neurologist">
          Neurologist
        </option>

        <option value="Orthopedic">
          Orthopedic
        </option>

        <option value="Pediatrician">
          Pediatrician
        </option>

        <option value="Gynecologist">
          Gynecologist
        </option>

        <option value="Dermatologist">
          Dermatologist
        </option>

        <option value="Psychiatrist">
          Psychiatrist
        </option>

        <option value="Surgeon">
          Surgeon
        </option>

        <option value="Anesthesiologist">
          Anesthesiologist
        </option>

        <option value="Radiologist">
          Radiologist
        </option>

        <option value="Ophthalmologist">
          Ophthalmologist
        </option>

        <option value="ENT Specialist">
          ENT Specialist
        </option>
      </select>
    </div>
  ) : (
    <div className="relative">
      <Briefcase
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <select
        name="department"
        value={formdata.department}
        onChange={handleChanges}
        required
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-500 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      >
        <option value="">Select Worker Type</option>

        <option value="Nurse">
          Nurse
        </option>

        <option value="Receptionist">
          Receptionist
        </option>

        <option value="Lab Technician">
          Lab Technician
        </option>

        <option value="Pharmacist">
          Pharmacist
        </option>

        <option value="Ward Boy">
          Ward Boy
        </option>

        <option value="Patient Care Assistant">
          Patient Care Assistant
        </option>

        <option value="Security Guard">
          Security Guard
        </option>

        <option value="Housekeeping">
          Housekeeping
        </option>

        <option value="Ambulance Driver">
          Ambulance Driver
        </option>

        <option value="Maintenance Staff">
          Maintenance Staff
        </option>

        <option value="Store Keeper">
          Store Keeper
        </option>

        <option value="Billing Staff">
          Billing Staff
        </option>

        <option value="Administrative Staff">
          Administrative Staff
        </option>
      </select>
    </div>
  )
}
                </div>

                {/* =========================
                    Responsibility
                ========================= */}
                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <textarea
                    name="work"
                    value={formdata.work}
                    onChange={handleChanges}
                    rows={4}
                    required
                    placeholder="Worker Responsibility"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

              </div>
            </div>

            {/* =========================
                Submit Button
            ========================= */}
            <div className="flex w-full justify-center pt-3">

              <button
                type="submit"
                className="h-12 rounded-xl bg-blue-600 px-7 font-semibold text-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] transition hover:bg-blue-700"
              >
                Create Worker ID
              </button>

            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
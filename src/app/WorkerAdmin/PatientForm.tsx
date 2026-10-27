"use client";

import { useState } from "react";
import axios from "axios";
import { useSelector, UseSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const CreatePatient = () => {
  const [formData, setFormData] = useState({
    patientname: "",
    department: "",
    location: "",
    problem: "",
    gurdian: "",
    gurdiancounts: "",
    doctor: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/patient/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      alert("Patient created successfully");

      setFormData({
        patientname: "",
        department: "",
        location: "",
        problem: "",
        gurdian: "",
        gurdiancounts: "",
        doctor: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create patient");
    }
  };

  const getfreeDoctors = async() => {
    try{
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/doctor/getdoctor/${formData.department}`, {
        withCredentials: true,
      });

      return res.data.data;

    }
    catch(error){
      console.log(error)
    }
  }

 const {
  data: doctors = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ["doctors", formData.department],
  queryFn: getfreeDoctors,
  enabled: !!formData.department,
});


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Create Patient
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >
        {/* Patient Name */}
       <div className="flex w-full gap-4">
  {/* Patient Name */}
  <div className="w-1/2">
    <label className="block mb-2 font-medium">
      Patient Name
    </label>

    <input
      type="text"
      name="patientname"
      value={formData.patientname}
      onChange={handleChange}
      placeholder="Enter patient name"
      required
      className="w-full border rounded-lg p-3"
    />
  </div>

  {/* Department */}
  <div className="w-1/2">
    <label className="block mb-2 font-medium">
      Department
    </label>

    <select
      name="department"
      value={formData.department}
      onChange={handleChange}
      required
      className="w-full border rounded-lg p-3"
    >
      <option value="">Select Department</option>
      <option value="Cardiology">Cardiology</option>
      <option value="Neurology">Neurology</option>
      <option value="Orthopedics">Orthopedics</option>
      <option value="General Medicine">General Medicine</option>
      <option value="Emergency">Emergency</option>
      <option value="Surgeon">Surgeon</option>
    </select>
  </div>
</div>
        {/* Location */}
        <div>
          <label className="block mb-2 font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Room / Ward / Bed"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Problem */}
      <div className="flex w-full gap-4">
  {/* Doctor */}
  <div className="w-1/2">
    <label className="block mb-2 font-medium">
      Doctor
    </label>

    <input
      type="text"
      name="doctor"
      value={formData.doctor}
      onChange={handleChange}
      placeholder="Enter doctor name"
      required
      className="w-full border rounded-lg p-3"
    />
  </div>

  {/* Problem */}
  <div className="w-1/2">
    <label className="block mb-2 font-medium">
      Problem
    </label>

    <input
      name="problem"
      value={formData.problem}
      onChange={handleChange}
      placeholder="Enter patient problem"
      required
      className="w-full border rounded-lg p-3"
    />
  </div>
</div>

        {/* Guardian */}
        <div className="flex w-full gap-4">
  {/* Guardian Name */}
  <div className="w-1/2">
    <label className="block mb-2 font-medium">
      Guardian Name
    </label>

    <input
      type="text"
      name="gurdian"
      value={formData.gurdian}
      onChange={handleChange}
      placeholder="Enter guardian name"
      required
      className="w-full border rounded-lg p-3"
    />
  </div>

  {/* Guardian Contact */}
  <div className="w-1/2">
    <label className="block mb-2 font-medium">
      Guardian Contact
    </label>

    <input
      type="text"
      name="gurdiancounts"
      value={formData.gurdiancounts}
      onChange={handleChange}
      placeholder="Enter guardian contact"
      required
      className="w-full border rounded-lg p-3"
    />
  </div>
</div>

       

        {/* Submit */}
        <div className="w-full flex justify-center">
        <button
          type="submit"
          className=" w-30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)]  text-black py-3 rounded-lg"
        >
          Create Patient
        </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePatient;
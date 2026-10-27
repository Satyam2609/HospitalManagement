
"use client";

import { useSelector } from "react-redux";
import {
  MapPin,
  Star,
  Stethoscope,
  Award,
  Pencil,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

type Education = {
  degree: string;
  institution: string;
  year: string;
};

type FormDataType = {
  name: string;
  experience: string;
  phone: string;
  password: string;
  profilePhoto: File | string | null;
  specialization: string[];
  education: Education[];
  isAvailable: boolean;
};

export default function DoctorProfile() {
  const details = useSelector((state: any) => state.user.user);

  const [totalPatients, setTotalPatients] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    experience: "",
    phone: "",
    password: "",
    profilePhoto: null,
    specialization: [],
    education: [],
    isAvailable: false,
  });

  // -----------------------------
  // Total Patients
  // -----------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/doctor/getTotal`,
          {
            withCredentials: true,
          }
        );

        setTotalPatients(res.data.data.totalPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, []);

  // -----------------------------
  // Open Edit Modal
  // -----------------------------

  const openEdit = () => {
    setFormData({
      name: details?.name || "",
      experience: details?.doctor?.experience || "",
      phone: details?.phone || "",
      password: "",
      profilePhoto: details?.profilePhoto || null,
      specialization: details?.doctor?.specialization || [],
      education: details?.doctor?.education || [],
      isAvailable: details?.isAvailable ?? true,
    });

    setShowEdit(true);
  };

  // -----------------------------
  // Input Change
  // -----------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // -----------------------------
  // Specialization
  // -----------------------------

  const addSpecialization = () => {
    setFormData((prev) => ({
      ...prev,
      specialization: [...prev.specialization, ""],
    }));
  };

  const updateSpecialization = (
    index: number,
    value: string
  ) => {
    const updated = [...formData.specialization];

    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      specialization: updated,
    }));
  };

  const removeSpecialization = (index: number) => {
    const updated = formData.specialization.filter(
      (_: string, i: number) => i !== index
    );

    setFormData((prev) => ({
      ...prev,
      specialization: updated,
    }));
  };

  // -----------------------------
  // Education
  // -----------------------------

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          year: "",
        },
      ],
    }));
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...formData.education];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  const removeEducation = (index: number) => {
    const updated = formData.education.filter(
      (_: Education, i: number) => i !== index
    );

    setFormData((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  // -----------------------------
  // UPDATE API
  // -----------------------------

  const updateProfile = async () => {
    try {
      setLoading(true);

      const formPayload = new FormData();

      formPayload.append("name", formData.name);
      formPayload.append("phone", formData.phone);
      formPayload.append("password", formData.password);
      formPayload.append(
        "isAvailable",
        String(formData.isAvailable)
      );
      formPayload.append(
        "experience",
        formData.experience
      );

      formPayload.append(
        "specialization",
        JSON.stringify(formData.specialization)
      );

      formPayload.append(
        "education",
        JSON.stringify(formData.education)
      );

      // Only send a new file.
      // Existing Cloudinary URL should NOT be sent again.
      if (formData.profilePhoto instanceof File) {
        formPayload.append(
          "profilePhoto",
          formData.profilePhoto
        );
      }

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/doctor/profile`,
        formPayload,
        {
          withCredentials: true,
        }
      );

      console.log("Profile updated:", res.data);

      setShowEdit(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Profile Photo Preview
  // -----------------------------

  const profilePhotoPreview =
    formData.profilePhoto instanceof File
      ? URL.createObjectURL(formData.profilePhoto)
      : formData.profilePhoto;

  return (
    <div className="h-full bg-slate-50 text-black flex">
      <div className="w-full max-w-7xl rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500" />

        <div className="px-8 pb-8">

          {/* Profile Top */}
          <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16">

            {/* Doctor Image */}
            <div className="w-32 h-32 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-md">
              <img
                src={
                  details?.profilePhoto ||
                  "/images/doctor.jpg"
                }
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  {" "}
                  {details?.username ||
                    details?.name ||
                    "Doctor Name"}
                </h1>

                <span className="text-blue-600 text-sm">
                  ✓
                </span>
              </div>

              <p className="text-blue-600 font-medium mt-1">
                Department -{" "}
                {details?.department || "Department"}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">

                <span className="flex items-center gap-1">
                  <MapPin size={16} />

                  <p className="font-bold">
                    Hospital:
                  </p>

                  {details?.hospitalName || "Location"}
                </span>

                <span className="flex items-center gap-1">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <b className="text-slate-700">
                    4.9
                  </b>

                  (128 Reviews)
                </span>

              </div>
            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={openEdit}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              <Pencil size={17} />
              Edit Profile
            </button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Experience
              </p>

              <p className="text-xl font-bold text-slate-900 mt-1">
                {details?.doctor?.experience || "0"} Years
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Patients
              </p>

              <p className="text-xl font-bold text-slate-900 mt-1">
                {totalPatients}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Consultation
              </p>

              <p className="text-xl font-bold text-slate-900 mt-1">
                ₹ {details?.salary || "0"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Availability
              </p>

              <p
                className={`text-xl font-bold mt-1 ${
                  details?.isAvailable
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {details?.isAvailable
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>

          </div>

          {/* Specialization */}
        
{details?.worktype === "Doctor" && (
  <>
    {/* Specialization */}
    <div className="mt-6">
      <h2 className="text-lg font-bold text-slate-900 mb-3">
        Specialization
      </h2>

      <div className="flex flex-wrap gap-3">
        {details?.doctor?.specialization?.map(
          (item: string, index: number) => (
            <span
              key={`${item}-${index}`}
              className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>

    {/* Education & Qualifications */}
    <div className="mt-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Education & Qualifications
      </h2>

      <div className="space-y-4">
        {details?.doctor?.education?.length > 0 ? (
          details.doctor.education.map(
            (edu: Education, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  {index === 0 ? (
                    <Stethoscope
                      className="text-blue-600"
                      size={20}
                    />
                  ) : (
                    <Award
                      className="text-blue-600"
                      size={20}
                    />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {edu.degree}
                  </p>

                  <p className="text-sm text-slate-500">
                    {edu.institution}
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Year: {edu.year}
                  </p>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-sm text-slate-500">
            No education details provided
          </p>
        )}
      </div>
    </div>
  </>
)}

        </div>
      </div>

      {/* ========================= */}
      {/* EDIT MODAL */}
      {/* ========================= */}

      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Doctor Profile
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Update your professional details
                </p>
              </div>

              <button
                onClick={() => setShowEdit(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 space-y-6">

              {/* Basic Details */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium">
                    Name
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="text-sm font-medium">
                    Profile Photo
                  </label>

                  <div className="mt-2 flex items-center gap-4">

                    {/* Circle Preview */}
                    <div className="w-20 h-20 shrink-0 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">

                      {profilePhotoPreview ? (
                        <img
                          src={profilePhotoPreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs text-center">
                          No Photo
                        </span>
                      )}

                    </div>

                    {/* File Input */}
                    <div className="flex-1">
                      <input
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG or WEBP
                      </p>
                    </div>

                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium">
                    Change Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="text-sm font-medium">
                    Experience
                  </label>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

              {/* Availability */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">

                <div>
                  <p className="font-medium">
                    Availability
                  </p>

                  <p className="text-sm text-slate-500">
                    Can patients book you?
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAvailable: e.target.checked,
                    }))
                  }
                  className="w-5 h-5"
                />

              </div>

              {/* Specialization */}
             
{details.workertype === "Doctor" && (
  <>
    {/* Specialization */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Specialization</h3>

        <button
          type="button"
          onClick={addSpecialization}
          className="flex items-center gap-1 text-blue-600 text-sm font-medium"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {formData.specialization.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) =>
                updateSpecialization(index, e.target.value)
              }
              placeholder="e.g. Cardiology"
              className="flex-1 px-4 py-3 border rounded-xl"
            />

            <button
              type="button"
              onClick={() => removeSpecialization(index)}
              className="px-3 text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Education */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Education</h3>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1 text-blue-600 text-sm font-medium"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 space-y-3"
          >
            <div className="flex justify-between">
              <p className="font-medium">
                Education {index + 1}
              </p>

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                updateEducation(index, "degree", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                updateEducation(index, "institution", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              placeholder="Year"
              value={edu.year}
              onChange={(e) =>
                updateEducation(index, "year", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  </>
)}

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t">

              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-5 py-3 rounded-xl border font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={updateProfile}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

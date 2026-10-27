"use client";

import { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter()

  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
    conformPassword: "",
    role:"",
    avatar: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files?.[0] ?? null;

      setformdata((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formdata.username ||
      !formdata.email ||
      !formdata.password ||
      !formdata.conformPassword ||
      !formdata.role
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formdata.password !== formdata.conformPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const formdatasubmit = new FormData();

  formdatasubmit.append(
    "username",
    formdata.username
  );
  formdatasubmit.append(
    "email",
    formdata.email
  );
  formdatasubmit.append(
    "password",
    formdata.password
  );
  formdatasubmit.append(
    "conformPassword",
    formdata.conformPassword
  );
  formdatasubmit.append("role" , formdata.role)
      if (formdata.avatar) {
        formdatasubmit.append(
          "avatar",
          formdata.avatar
        );
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/user/create-register`,
        formdatasubmit
      );

      console.log(
        "User registered successfully",
        res.data
      );
      router.push("/Register/Login")

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          error.response?.data?.message ||
            "Registration failed"
        );
      } else {
        console.log("Something went wrong");
      }
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f3f4f6]">

      <div
        className=" mx-auto flex min-h-screen w-full max-w-[1800px] flex-col items-center justify-center gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 xl:gap-16 xl:px-12
        "
      >
        <div className="w-full lg:hidden">

          <p
            className="
              mb-2
              text-xs
              font-medium
              tracking-wide
              text-slate-500
              sm:text-sm
            "
          >
            HOSPITAL MANAGEMENT SYSTEM
          </p>

          <h2
            className=" text-3xl font-bold leading-tight tracking-tight text-slate-800 sm:text-4xl
            "
          >
            Create your account

            <span className="block text-slate-500">
              to get started.
            </span>
          </h2>

        </div>

        <section
          className=" hidden min-w-0 lg:flex lg:w-[55%] lg:flex-col lg:justify-center xl:w-[48%]
          "
        >

          {/* Heading */}

          <div className="px-2 xl:px-2">

            <p
              className="
               text-sm font-medium tracking-wide text-slate-500
              "
            >
              HOSPITAL MANAGEMENT SYSTEM
            </p>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
                xl:text-2xl
              "
            >
              Create your account

              <span className="block text-md text-slate-500">
                to get started.
              </span>
            </h2>

          </div>


          {/* =========================================
              HOSPITAL IMAGE
          ========================================= */}

          <div
            className=" relative mt-30 h-[280px] w-full overflow-hidden sm:h-[320px] xl:h-[400px]
            "
          >

            <img
              src="/Hospital.png"
              alt="Hospital"
              className=" absolute left-1/2 top-1/2 h-auto w-[100%] max-w-[950px] -translate-x-1/2 -translate-y-1/2 object-contain
              "
            />


            {/* Bottom cloudy fade */}

            <div
              className=" pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f3f4f6] via-[#f3f4f6]/80 to-transparent xl:h-36
              "
            />


            {/* Left cloudy fade */}

            <div
              className=" pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f3f4f6] to-transparent xl:w-24
              "
            />


            {/* Right cloudy fade */}

            <div
              className=" pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f3f4f6] to-transparent xl:w-24
              "
            />

          </div>

        </section>


        {/* =========================================
            FORM SECTION
        ========================================= */}

        <section
          className=" flex w-full min-w-0 justify-center lg:w-[45%] xl:w-[42%]
          "
        >

          <form
            onSubmit={handleSubmit}
            className=" w-full max-w-[560px] rounded-[28px] bg-white px-5 py-7 shadow-[0_20px_45px_rgba(0,0,0,0.12)] sm:px-8 sm:py-9 md:px-10 lg:px-9 xl:px-11
            "
          >

            {/* =====================================
                FORM HEADING
            ===================================== */}

            <div className="mb-1 text-center">

              <h1
                className=" text-2xl font-bold leading-tight text-slate-900 sm:text-3xl
                "
              >
                Welcome to Hospital

                <span className="block">
                  Management
                </span>
              </h1>

              <p
                className=" mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                Manage patients, doctors, appointments and

                <span className="block">
                  records with ease.
                </span>
              </p>

            </div>


            {/* =====================================
                AVATAR
            ===================================== */}

            <div className="mb-5 flex justify-center">

              <label
                htmlFor="fileUpload"
                className=" group flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-50 shadow-md transition hover:bg-gray-100 sm:h-24 sm:w-24
                "
              >

                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <User
                    size={28}
                    className="
                      text-slate-500
                      transition

                    "
                  />
                )}

              </label>

              <input
                type="file"
                id="fileUpload"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

            </div>


            {/* =====================================
                INPUTS
            ===================================== */}

            <div className="space-y-4">

              {/* Email */}

              <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Enter Email" className=" h-11 w-full rounded-2xl bg-white px-4 text-sm text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] outline-none transition focus:ring-2 focus:ring-blue-200
                "/>


              {/* Username */}

              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className=" h-11 w-full rounded-2xl bg-white px-4 text-sm text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] outline-none transition focus:ring-2 focus:ring-blue-200
                "
              />
              {/* Password */}

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  } name="password" value={formdata.password} onChange={handleChange} placeholder="Enter Password" className=" h-11 w-full rounded-2xl bg-white px-4 pr-12 text-sm text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] outline-none transition focus:ring-2 focus:ring-blue-200
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>


              {/* Confirm Password */}

              <div className="relative">

                <input type={showConfirmPassword ? "text": "password"} name="conformPassword" value={   formdata.conformPassword } onChange={handleChange} placeholder="Confirm Password" className=" h-11 w-full rounded-2xl bg-white px-4 pr-12 text-sm text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] outline-none transition focus:ring-2 focus:ring-blue-200"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

           <div className="flex items-center gap-2">
  {/* Left side: Radio buttons */}
  <div className="flex max-w-xl gap-3">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="patient"
        checked={formdata.role === "patient"}
        onChange={handleChange}
      />
      Patient
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="role"
        value="hospital"
        checked={formdata.role === "hospital"}
        onChange={handleChange}
      />
      Hospital
    </label>
  </div>

</div>
            </div>


            {/* =====================================
                BUTTON
            ===================================== */}
<div className="w-full flex flex-col items-center">
  <button
    type="submit"
    className="mt-5 h-11  max-w-xl rounded-2xl bg-white px-2 text-sm font-medium text-black shadow-[inset_0_2px_6px_rgba(100,0,0,0.30)] transition hover:shadow-[inset_0_3px_8px_rgba(100,0,0,0.40)] active:scale-[0.98]"
  >
    Create Account
  </button>

  <div className="mt-3 text-sm">
    <a
      href="/Register/Login"
      className="text-gray-500 hover:text-black hover:underline"
    >
      Already have an account?
    </a>
  </div>
</div>

          </form>

        </section>

      </div>

    </main>
  );
}
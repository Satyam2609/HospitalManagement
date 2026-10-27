"use client";

import { useState } from "react";
import { User, Eye, EyeOff , Loader2} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../CounterSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [shwloader , setshowloader] = useState(false)
  const [message , setmessage] = useState("")
  const [showmessage , setshowmessage] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
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
    !formdata.email ||
    !formdata.password
  ) {
    alert("Please fill all fields");
    return;
  }
  setshowloader(true)

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/user/login`,
      {
        email: formdata.email,
        password: formdata.password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Login successfully:", res.data);
    setshowloader(false)
    setshowmessage(true)
    setmessage(res.data.message)
    setTimeout(() => {
        setmessage("")
    }, 2000)

    if(res.data.user.role === "hospital"){
      router.push("/HosPital")
    }
    else if(res.data.user.role === "patient"){
      router.push("/HomeLanding")
    }
    else if(res.data.user.role === "Doctor" || res.data.user.workertype === "doctor"){
      router.push("/Doctor")
    }
    else{
      router.push("/WorkerAdmin")

    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        error.response?.data?.message || "Login failed"
      );
    } else {
      console.log("Something went wrong");
    }
  }
  finally{
    setshowloader(false)
  }
};

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f3f4f6]">

      <div
        className=" mx-auto flex min-h-screen w-full max-w-[1800px] flex-col items-center justify-center gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 xl:gap-16 xl:px-12"
      >


        <div className="w-full lg:hidden">

          <p
            className=" mb-2 text-xs font-medium tracking-wide text-slate-500 sm:text-sm
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
          className=" flex w-full px-20 min-w-0 justify-center lg:w-[45%] xl:w-[42%]
          "
        >

          <form
            onSubmit={handleSubmit}
            className=" w-full max-w-[560px] rounded-[28px] bg-white px-5 py-7 shadow-[0_20px_45px_rgba(0,0,0,0.12)] sm:px-8 sm:py-9 md:px-10 lg:px-9 xl:px-11
            "
          >

          

            <div className="mb-6 text-center">

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
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                  sm:text-sm
                "
              >
                Manage patients, doctors, appointments and

                <span className="block">
                  records with ease.
                </span>
              </p>

            </div>

            {/* =====================================
                INPUTS
            ===================================== */}

            <div className="space-y-4">

              {/* Email */}

              <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Enter Email" className="h-11 w-full rounded-2xl bg-white px-4 text-sm text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] outline-none transition focus:ring-2 focus:ring-blue-200"/>
            {/* Password */}

              <div className="relative">

                <input
                  type={showPassword? "text" : "password"} name="password" value={formdata.password} onChange={handleChange} placeholder="Enter Password" className="h-11 w-full rounded-2xl bg-white px-4 pr-12 text-sm text-slate-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] outline-none transition focus:ring-2 focus:ring-blue-200 "
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

            </div>
            {
                showmessage && <div className="text-black h-10 mt-10">{message}</div>
            }

<div className="w-full flex justify-center">
            <button
              type="submit" className="mt-2 h-11 px-7 max-w-xl rounded-2xl bg-white text-sm font-medium text-black shadow-[inset_0_2px_6px_rgba(100,0,0,0.30)] transition hover:shadow-[inset_0_3px_8px_rgba(100,0,0,0.40)] active:scale-[0.98]
              "
            >
              {shwloader ? <Loader2 className="animate-spin"/> : "Login"}
            </button>
            </div>

          </form>

        </section>
         <section className="hidden min-w-0 lg:flex lg:w-[55%] lg:flex-col lg:justify-center xl:w-[48%]"
        >

          {/* Heading */}

          <div className="px-2 xl:px-2">

            <p
              className="
              
                text-sm
                font-medium
                tracking-wide
                text-slate-500
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
              LogIn your Account

              <span className="block text-md text-slate-500">
                to get started.
              </span>
            </h2>

          </div>


          {/* =========================================
              HOSPITAL IMAGE
          ========================================= */}

          <div className=" relative mt-30 h-[280px] w-full overflow-hidden sm:h-[320px] xl:h-[400px]"
          >

            <img src="/Hospital.png" alt="Hospital" className="absolute left-1/2 top-1/2 h-auto w-[100%] max-w-[950px] -translate-x-1/2 -translate-y-1/2 object-contain"
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
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f3f4f6] to-transparent xl:w-24"
            />

          </div>

        </section>

      </div>

    </main>
  );
}
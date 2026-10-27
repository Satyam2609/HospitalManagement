"use client"
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">

      {/* Background Image */}
      <img
        src="/homehos.png"
        alt="Modern Hospital"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overall soft white haze */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

      {/* LEFT CLOUD / FOG */}
      <div
        className="
          absolute inset-y-0 left-0 w-[45%]
          bg-[radial-gradient(ellipse_at_left,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.75)_30%,_rgba(255,255,255,0)_75%)]
          blur-2xl
        "
      />

      {/* RIGHT CLOUD / FOG */}
      <div
        className="
          absolute inset-y-0 right-0 w-[45%]
          bg-[radial-gradient(ellipse_at_right,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.75)_30%,_rgba(255,255,255,0)_75%)]
          blur-2xl
        "
      />

      {/* TOP FOG */}
      <div
        className="
          absolute left-0 top-0 h-[30%] w-full
          bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.75),_transparent)]
          blur-xl
        "
      />

      {/* BOTTOM FOG */}
      <div
        className="
          absolute bottom-0 left-0 h-[35%] w-full
          bg-[linear-gradient(to_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.35),_transparent)]
          blur-xl
        "
      />

      {/* Center clear area */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,_transparent_25%,rgba(255,255,255,0.35)_70%,rgba(255,255,255,0.75)_100%)]
        "
      />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center">

        <div className="text-center flex flex-col justify-center items-center">
          <motion.h1 initial={{y:50}} animate={{y:0}} transition={{duration:0.8 , delay:0.2}} className="text-5xl font-bold text-black drop-shadow-lg md:text-7xl">
            Welcome To Hospital Helper
          </motion.h1>

          <motion.p initial={{y:50}} animate={{y:0}} transition={{duration:1 , delay:0.4}} className="mt-4 max-w-2xl text-xl  md:text-2xl text-black/50 drop-shadow-md">
            Advanced healthcare, expert doctors, and compassionate care because your health always comes first
          </motion.p>
          <motion.p initial={{y:50}} animate={{y:0}} transition={{duration:1.3 , delay:0.6}} className="mt-4 text-xl text-white drop-shadow-md">
            Caring for You, Every Day
          </motion.p>
        </div>

      </section>

    </main>
  );
}
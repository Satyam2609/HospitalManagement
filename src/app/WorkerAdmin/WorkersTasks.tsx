"use client";

import { CheckCircle2, Circle, ClipboardList } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkerTasksS() {

  const [form , setform] = useState(false)
  const router = useRouter()
  const getTasks = async () => {
    console.log("🔥 getTasks called");

    try {
      console.log("🔥 API URL:", process.env.NEXT_PUBLIC_URL);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/employee/getwork`,
        {
          withCredentials: true,
        }
      );

      console.log("🔥 API response:", res.data.data);

      return res.data.data;
    }catch (error: any) {
  if (error.response?.status === 401) {
    console.log("Unauthorized user");
router.push("/Register/Login")
    
  }

  console.error("❌ Error fetching employees:", error);
  throw error;
}
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  console.log("🔥 React Query:", {
    data,
    isLoading,
    isError,
    error,
  });

  const handleClickDone = async (taskid: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/employee/updatetask/${taskid}`,
      {}, // Request body empty
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
  } catch (error: any) {
    console.log(
      "System error",
      error.response?.data?.message
    );
  }
};
 useLayoutEffect(() => {
  const timer = setTimeout(() => {
    setform(true);
  }, 500);

  return () => clearTimeout(timer);
}, []);

const pendingTasks = data?.currentWork?.filter(
  (task:any) => task.status === "pending"
);

if (form && pendingTasks?.length > 0) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[350px] rounded-xl bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Work Status
        </h2>

        <p className="mb-6 text-gray-600">
          {pendingTasks.map((task:any) => task.title).join(", ")}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              handleClickDone(pendingTasks[0]._id);
              setform(false);
              getTasks()
            }}
            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Yes, Done
          </button>

          <button
            onClick={() => {
              setform(false);
            }}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-blue-600" />

            <h2 className="font-bold text-slate-900">
              My Tasks
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Tasks assigned to you
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {data.length} Tasks
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">

        {isLoading ? (
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              Loading tasks...
            </p>
          </div>
        ) : isError ? (
          <div className="rounded-xl bg-red-50 p-5 text-center">
            <p className="text-sm text-red-500">
              Failed to load tasks
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              No tasks assigned
            </p>
          </div>
        ) : (
          data.currentWork.map((task: any, index: number) => (
            <div
              key={task._id || index}
              className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
            >
              {task.status === "completed" ? (
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-emerald-500"
                />
              ) : (
                <Circle
                  size={20}
                  className="shrink-0 text-slate-300"
                   onClick={() => {handleClickDone(task._id) , getTasks()}}
                />
              )}

              <div className="flex-1">
                <p
               
                  className={`text-sm ${
                    task.status === "completed"
                      ? "text-slate-400 line-through"
                      : "font-medium text-slate-700"
                  }`}
                >
                  {task.title}
                </p>

                {task.description && (
                  <p className="mt-1 text-xs text-slate-400">
                    {task.description}
                  </p>
                )}
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  task.completed
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {task.status.completed ? "Completed" : "Pending"}
              </span>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
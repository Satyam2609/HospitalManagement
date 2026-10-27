
"use client";

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Staff = {
  staffId: string;
  staffName: string;
};

type ApiStaff = {
  _id: string;
  name: string;
};

export default function UnderWorkingStaffForm() {
  const [roomId, setRoomId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_URL;

  // Fetch staff
  const getStaff = async (): Promise<ApiStaff[]> => {
    const res = await axios.get(
      `${API_URL}/api/hospital/get`,
      { withCredentials: true }
    );

    return res.data.headdata;
  };

  const {
    data: worker = [],
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hospital-staff"],
    queryFn: getStaff,
  });

  // Add selected staff to list
  const handleAddStaff = () => {
    if (!staffId) {
      alert("Please select a staff member");
      return;
    }

    const selectedStaff = worker.find(
      (staff) => staff._id === staffId
    );

    if (!selectedStaff) {
      alert("Staff not found");
      return;
    }

    // Prevent duplicate staff
    const alreadyExists = staffList.some(
      (staff) => staff.staffId === selectedStaff._id
    );

    if (alreadyExists) {
      alert("Staff already added");
      return;
    }

    setStaffList((prev) => [
      ...prev,
      {
        staffId: selectedStaff._id,
        staffName: selectedStaff.name,
      },
    ]);

    setStaffId("");
  };

  // Remove staff from list
  const handleRemoveStaff = (id: string) => {
    setStaffList((prev) =>
      prev.filter((staff) => staff.staffId !== id)
    );
  };

  // Update room
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/hospital/update`,
        {
          staffId: roomId,
          underWorkingStaff: staffList,
        },
        {
          withCredentials: true,
        }
      );

      alert(response.data.message || "Staff updated successfully");

      setRoomId("");
      setStaffId("");
      setStaffList([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Update failed");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Update Working Staff
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Staff dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Select Staff
          </label>

          <select
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="w-full rounded-lg border p-3"
            disabled={isLoading || isError}
          >
            <option value="">
              {isLoading ? "Loading staff..." : "Select staff"}
            </option>

            {worker.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>

          {isError && (
            <p className="mt-2 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to fetch staff"}
            </p>
          )}
        </div>

        {/* Add staff */}
        <button
          type="button"
          onClick={handleAddStaff}
          disabled={isLoading || isError}
          className="w-full rounded-lg border border-blue-600 px-4 py-2.5 font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50"
        >
          + Add Staff
        </button>

        {/* Selected staff list */}
        {staffList.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">
              Selected Staff ({staffList.length})
            </h3>

            {staffList.map((staff) => (
              <div
                key={staff.staffId}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{staff.staffName}</p>
                  <p className="text-xs text-gray-500">
                    ID: {staff.staffId}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveStaff(staff.staffId)}
                  className="text-sm font-medium text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || isLoading || isError}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Room Staff"}
        </button>
      </form>
    </div>
  );
}

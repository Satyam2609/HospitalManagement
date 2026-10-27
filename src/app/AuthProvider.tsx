"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "./CounterSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/permissions/auth`,
          { withCredentials: true }
        );

        dispatch(setUser(res.data.user));
        console.log("User fetched successfully:", res.data.user);
      } catch (error: any) {
        console.log(
          error.response?.data?.message || error.message
        );
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
}
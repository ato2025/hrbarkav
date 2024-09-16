"use client";
import { useAppDispatch, useAppSelector } from "@/Store/StoreConfigs";
import { setToken } from "@/Store/slices/auth/authSlice";
import { generateToken } from "@/Utils/generateToken";
import { axiosLocal } from "@/axios/Axios";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}
type Props = {
  cook: string;
};
function index({ cook }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const token = useAppSelector((state) => state.auth.token.token);

  const onSubmit = async (data: FormValues) => {
    const hashedInfo = generateToken(data);
    const hash = await hashedInfo.then((res) => res);

    const response = await axiosLocal.post("/api/authUser", { hashedInfo: hash });
    const fetchedData = await response.data;

    dispatch(setToken(fetchedData));
  };
  if (token) {
    router.push("./P-admin");
  }

  return (
    <>
      <div className="h-[100vh]  relative">
        <div className="absolute left-0 top-0 right-0 w-full h-full z-[-1]">
          <img
            src="./AdobeStock_625078650-scaled.jpeg"
            className="w-full h-full"
            alt=""
          />
        </div>
        <div className="w-full h-full bg-[#00000095] flex justify-center items-center flex-col ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <input
              type="email"
              className="rounded px-4 py-2 my-2 ltr"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600 ltr">{errors.email.message}</span>
            )}
            <input
              type="password"
              className="rounded px-4 py-2 my-2 ltr"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 6 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-600 ltr">
                {errors.password.message}
              </span>
            )}
            <div className=" w-full ">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default index;

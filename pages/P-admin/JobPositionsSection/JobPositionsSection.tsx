import { useAppDispatch, useAppSelector } from '@/Store/StoreConfigs';
import { getAllJobPositions } from '@/Store/slices/jobPositions/jobPositionsExtraReducers';
import {  axiosLocal } from '@/axios/Axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function JobPositionsSection() {
       const dispatch = useAppDispatch();
       const jobPositions = useAppSelector((state) => state.jobPositions.data);
       const [newJobPosition, setNewJobPosition] = useState<string>();

       const editJobPositionHandler = (id: number | string) => {
              Swal.fire({
                title: "نام جدید را وارد کنید",
                input: "text",
                // inputLabel: "Your IP address",
                cancelButtonText: "لغو",
                confirmButtonText: "تایید",
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write something!";
                  }
                },
              }).then((value) => {
                if (value.isConfirmed) {
                  const data = {
                    id,
                    title: value.value,
                  };
                  axiosLocal.post("/api/jobPositions/Update", data).then((res) => {
                    if (res.status == 200) {
                      dispatch(getAllJobPositions());
                      Swal.fire({
                        title: res.data.message,
                      });
                    }
                  }).catch(err=>{
                    console.log(err)
                  })
                }
              });
            };


            const DeleteJobPositionHandler = (id: number | string) => {
              Swal.fire({
                title: "آیا میخواهید حذف شود ؟",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "حذف شود",
                denyButtonText: `کنسل`,
              }).then((result) => {
                
                if (result.isConfirmed) {
                  axiosLocal.post("/api/jobPositions/Delete", {id}).then((res) => {
                    if (res.status == 200) {
                      dispatch(getAllJobPositions());
                      Swal.fire({
                        title: "با موفقیت حذف شد",
                        icon: "success",
                      });
                    }
                  }).catch((err:any)=>{
                    console.log({id})
                    console.log(`sajjad/${id}`)
                    console.log(err)
                  })
                }
              });
            };


            const createNewJobPositionHandler = () => {
              const data = {
                title: newJobPosition as string,
              };
              axiosLocal.post("/api/jobPositions/Create", data).then((res) => {
                if (res.status == 200) {
                  dispatch(getAllJobPositions());
                  setNewJobPosition("");
                  Swal.fire({
                    title: res.data,
                  });
                }
              });
            };



  return (
    <>
     <div className="jobCreateSection px-20 py-20  mb-5">
                <div className="text-white text-3xl">موقعیت های شغلی </div>

                <div className="h-[40vh] overflow-y-auto rounded-lg mt-2 mb-10">
                  <div className="grid grid-cols-3  bg-slate-300 py-4">
                    <div className="flex justify-center items-center h-full w-full">
                      موقعیت شغلی
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                      ویرایش
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                      حذف
                    </div>
                  </div>
                  {jobPositions.map((posaition) => (
                    <div
                      className="grid grid-cols-3 text-white text-white bg-[#0f0e0e9c] py-4"
                      key={posaition.id}
                    >
                      <div className="flex justify-center items-center h-full w-full">
                        {posaition.title}
                      </div>
                      <div className="flex justify-center items-center h-full w-full">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                          onClick={() => {
                            editJobPositionHandler(posaition.id);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex justify-center items-center h-full w-full">
                        <button
                          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                          onClick={() => {
                            DeleteJobPositionHandler(posaition.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-white text-3xl">
                  ایجاد موقعیت های شغلی جدید{" "}
                </div>
                <div className="w-full flex my-5">
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg"
                    placeholder="موقعیت شغلی جدید"
                    value={newJobPosition}
                    onChange={(e) => {
                      setNewJobPosition(e.target.value);
                    }}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mx-5"
                    onClick={createNewJobPositionHandler}
                  >
                    ایجاد موقعیت شغلی
                  </button>
                </div>
              </div>
    </>
  )
}

export default JobPositionsSection
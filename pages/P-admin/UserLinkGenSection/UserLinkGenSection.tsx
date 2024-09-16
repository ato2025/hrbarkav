import CopyIcon from '@/Components/Icons/CopyIcon';
import {  axiosLocal } from '@/axios/Axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function UserLinkGenSection() {

       const [userName, setUserName] = useState<string>();
       const [genratedLink, setGenratedLink] = useState<string>();


       const linkGenrator = () => {
              const baseUrl = "http://www.hrbarkav.com/";
              let words = userName?.split(" ");
              let result = words?.join("");
              const genratedLink = baseUrl.concat(result as string);
              setGenratedLink(genratedLink);
              setUserName("");
          
              axiosLocal
                .post("/api/CreateEmployerUserName", { userName: result })
                .then((res) => {
                  if (res.status == 200) {
                    Swal.fire({
                      title: res.data,
                    });
                  }
                });
            };


            const copyLinkHandler = () => {
              navigator.clipboard.writeText(genratedLink as string).then(() => {
                Swal.fire({
                  title: "لینک با موفقیت کپی شد",
                  icon: "success",
                });
              });
            };




  return (
    <>
    <div>
                <div className="text-white text-3xl px-20 mt-20">
                  ایجاد لینک برای ثبت اطلاعات توسط کارجوی جدید
                </div>
                <div className="text-white my-10 px-20">
                  لطفا نام و نام خانوادگی را به زبان انگلیسی وارد کنید
                </div>
                <div className=" px-20">
                  <input
                    type="text"
                    placeholder="Fname And LName"
                    className="ltr px-4 py-2 rounded-lg"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  <button
                    className="bg-blue-600 px-4 py-2 rounded-lg text-white mx-4"
                    onClick={linkGenrator}
                  >
                    ایجاد لینک{" "}
                  </button>
                </div>
                {genratedLink && (
                  <div className="bg-white w-1/3 relative rounded-lg px-4 py-1 ltr mt-10 mx-20 overflow-hidden">
                    <div className="w-full ltr">{genratedLink}</div>
                    <div
                      className="flex justify-center items-center px-2 absolute right-0 top-0 h-full bg-blue-500 hover:bg-blue-700 cp"
                      onClick={copyLinkHandler}
                    >
                      <CopyIcon />
                    </div>
                  </div>
                )}
              </div>
    </>
  )
}

export default UserLinkGenSection
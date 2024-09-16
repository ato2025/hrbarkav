import EmployerInfoModalItem from "@/Components/EmployerInfoModal/EmployerInfoModalItem";
import EmployerInfoModal from "@/Components/EmployerInfoModal/EmployerInfoModalItem";
import CloseToggleIcon from "@/Components/Icons/CloseToggleIcon";
import DownloadIcon from "@/Components/Icons/DownloadIcon";
import ThreeDots from "@/Components/Icons/ThreeDots";
import ResumeTableItem from "@/Components/ResumeTableItem";
import { axiosLocal } from "@/axios/Axios";
import React, { useEffect, useState } from "react";

function EmployersResumeSection() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axiosLocal
      .get("/api/GetEmployersResume")
      .then((res) => {
        if (res.status == 200) {
          setResumes(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className=" employersInfosSection flex justify-center items-center ">
        <table className=" w-[90vw] rounded-lg overflow-hidden h-[75vh]">
          <thead className="bg-slate-200 h-[7vh]">
            <tr>
              <th>نام متقاضی</th>
              <th>شهر</th>
              <th>موقعیت شغلی</th>
              <th>حقوق درخواستی</th>
              <th>اطلاعات بیشتر</th>
              <th>دریافت رزومه</th>
            </tr>
          </thead>
          <tbody className=" bg-[#0f0e0e9c] w-full overflow-y-auto">
            {resumes.map((resume: any) => (
              <ResumeTableItem key={resume.id} {...resume} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployersResumeSection;

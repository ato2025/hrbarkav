import { useAppDispatch } from "@/Store/StoreConfigs";
import { getAllJobPositions } from "@/Store/slices/jobPositions/jobPositionsExtraReducers";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import JobPositionsSection from "./JobPositionsSection/JobPositionsSection";
import EmployersResumeSection from "./EmployersResumeSection/EmployersResumeSection";
import UserLinkGenSection from "./UserLinkGenSection/UserLinkGenSection";
import HeaderTab from "./HeaderTab/HeaderTab";

type Props = {
  cookies: string;
};

function index({ cookies }: Props) {
  const sections = [
    { id: 1, name: "موقعیت های شغلی", component: <JobPositionsSection /> },
    {
      id: 2,
      name: "ایجاد لینک برای کارجو جدید",
      component: <UserLinkGenSection />,
    },
    { id: 3, name: "اطلاعات کارجوها", component: <EmployersResumeSection /> },
  ];

  const [mainSection, setMainSection] = useState("موقعیت های شغلی");

  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("cookSoran", cookies.slice(6));
    // console.log(cookies.slice(6))
    dispatch(getAllJobPositions());
  }, []);

  return (
    <>
      {cookies ? (
        <div className="h-full w-full  relative overflow-y-auto">
          <div className="absolute left-0 top-0  right-0 w-full h-full z-[-1]">
            <img
              src="./AdobeStock_625078650-scaled.jpeg"
              className="w-full h-full"
              alt=""
            />
          </div>

          <div className="w-full h-[100vh] bg-[#00000095]  pt-10">
            <div className="grid grid-cols-3 h-16 w-[75%] mx-auto bg-[#1767a1d3] text-white mb-10 rounded-lg overflow-hidden">
              {sections.map((item) => (
                <HeaderTab
                  key={item.id}
                  action={setMainSection}
                  mainTitle={mainSection}
                  title={item.name}
                />
              ))}
            </div>
            
            {sections.map((item) =>
              item.name == mainSection ? item.component : null
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-[100vh] flex justify-center items-center text-3xl">
            This page is not available
          </div>
        </>
      )}
    </>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie || "";

  return {
    props: {
      cookies,
    },
  };
};

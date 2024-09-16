// pages/[userName].tsx

import JobPositionSelectGp from "@/Components/JobPositionSelectGp/JobPositionSelectGp";
import LoadingModal from "@/Components/LoadingModal/LoadingModal";
import SelectDate from "@/Components/SelectDate/SelectDate";
import SelectGroup from "@/Components/SelectGroup/SelectGroup";
import { useAppDispatch, useAppSelector } from "@/Store/StoreConfigs";
import { postEmployerFileData } from "@/Store/slices/employers/employersExtraReducers";
import { getAllJobPositions } from "@/Store/slices/jobPositions/jobPositionsExtraReducers";
import { axiosServer } from "@/axios/Axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { title } from "process";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const tehranRegion = [
  "منطقه 1",
  "منطقه 2",
  "منطقه 3",
  "منطقه 4",
  "منطقه 5",
  "منطقه 6",
  "منطقه 7",
  "منطقه 8",
  "منطقه 9",
  "منطقه 10",
  "منطقه 11",
  "منطقه 12",
  "منطقه 13",
  "منطقه 14",
  "منطقه 15",
  "منطقه 16",
  "منطقه 17",
  "منطقه 18",
  "منطقه 19",
  "منطقه 20",
  "منطقه 21",
  "منطقه 22",
];

const EmployInfoPage: React.FC = ({ isUserValid, UserName }: any) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [workType, setWorkType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [residenceArea, setResidenceArea] = useState<string>("");
  const [englishLevel, setEnglishLevel] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const dispatch = useAppDispatch();
  const jobPositions = useAppSelector((state) => state.jobPositions.data);
  const sentLoaderState = useAppSelector((state=>state.employers.isFileSent))
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;

  useEffect(() => {
    isUserValid && dispatch(getAllJobPositions());
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const submitHandler = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("File", file);
      formData.append("UserName", UserName);
    }

    const informations = {
      userName: UserName,
      fullName: fullName,
      email: email,
      jobPosition: jobTitle,
      typeOfCooperation: workType,
      city: city,
      region: residenceArea,
      languageLevel: englishLevel,
      salary: salaryRange,
      startDate: startDate,
    };

    if (
      fullName.trim().length > 5 &&
      emailRegex.test(email) &&
      jobTitle &&
      workType &&
      city.trim().length > 0 &&
      residenceArea &&
      englishLevel &&
      salaryRange &&
      startDate &&
      file
    ) {
     
dispatch(postEmployerFileData(formData))
        

      await axiosServer
        .post("/Employee/RequestJobOtherFile", informations)
        .then((res) => {
          if (res.status == 200){}
        });
    } else {
      Swal.fire({
        title: "لطفا اطلاعات را به درستی وارد کنید",
        icon: "info",
      });
    }
  };

  return (
    <>
      <div className="relative">
        {isUserValid ? (
          <>
            <div className=" h-[100vh]  relative ">
              <div className="absolute left-0 top-0 right-0 w-full h-full z-[-1]">
                <img
                  src="./AdobeStock_625078650-scaled.jpeg"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <div className="infoFormContainer w-full h-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 py-20 px-20 bg-[#0000008b] overflow-y-auto">
                <div className="inputGp ">
                  <div className="text-white font-semibold">
                    نام و نام خانوادگی
                  </div>
                  <div className="mt-2 mb-5">
                    <input
                      type="text"
                      className="rounded-lg px-4 py-2 w-full ts07 cp hover:bg-[#66616190] outline-0 focus:bg-[#66616190] focus:border-blue-500 hover:border-blue-500 border"
                      placeholder="نام و نام خانوادگی ..."
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                      value={fullName}
                    />
                  </div>
                </div>

                <div className="inputGp ">
                  <div className="text-white font-semibold">
                    ایمیل خود را وارد کنید
                  </div>
                  <div className="mt-2 mb-5">
                    <input
                      type="email"
                      className="rounded-lg px-4 py-2 w-full ts07 cp hover:bg-[#66616190] outline-0 focus:bg-[#66616190] focus:border-blue-500 hover:border-blue-500 border"
                      placeholder="ایمیل ..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <JobPositionSelectGp
                  title={`موقعیت شغلی مورد نظر را انتخاب کنید`}
                  options={jobPositions}
                  onClick={(e) => {
                    setJobTitle(e);
                  }}
                  subTitle="موقعیت های شغلی"
                />

                <SelectGroup
                  title={`نوع همکاری خود را انتخاب کنید`}
                  options={[
                    "حضوری - تمام وقت",
                    "حضوری-پاره وقت",
                    "هایبرید",
                    "دورکاری",
                  ]}
                  onClick={(e) => {
                    setWorkType(e);
                  }}
                  subTitle="نوع همکاری"
                />

                <div className="inputGp ">
                  <div className="text-white font-semibold">شهر محل سکونت</div>
                  <div className="mt-2 mb-5">
                    <input
                      type="email"
                      className="rounded-lg px-4 py-2 w-full ts07 cp hover:bg-[#66616190] outline-0 focus:bg-[#66616190] focus:border-blue-500 hover:border-blue-500 border"
                      placeholder="شهر محل سکونت ..."
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <SelectGroup
                  title={`منطقه سکونت خود را انتخاب کنید`}
                  options={tehranRegion}
                  onClick={(e) => {
                    setResidenceArea(e);
                  }}
                  subTitle="منطقه سکونت"
                />

                <div className="inputGp ">
                  <div className="text-white font-semibold">
                    رزومه خود را بارگذاری کنید
                  </div>
                  <div className="mt-2 mb-5">
                    <input
                      type="file"
                      className="rounded-lg px-4 py-2 w-full ts07 cp hover:bg-[#66616190] outline-0 text-white focus:bg-[#66616190] focus:border-blue-500 hover:border-blue-500 border"
                      placeholder="ایمیل ..."
                      accept=".pdf"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                  </div>
                </div>

                <SelectGroup
                  title={`سطح تسلط به زبان انگلیسی را انتخاب کنید`}
                  options={["Intermadite", "Upper Intermadite", "Advanced"]}
                  onClick={(e) => {
                    setEnglishLevel(e);
                  }}
                  subTitle="سطح زبان"
                />

                <SelectGroup
                  title={`رنج حقوق مورد نظر را انتخاب کنید`}
                  options={[
                    "15 الی 20",
                    "20 الی 25",
                    "25 الی 30",
                    "30 الی 35",
                    "35 به بالا",
                    "حقوق دلخواه را وارد کنید",
                  ]}
                  onClick={(e) => {
                    setSalaryRange(e);
                  }}
                  subTitle="رنج حقوقی "
                />

                <SelectDate
                  onClk={(e) => {
                    setStartDate(e);
                  }}
                />
                <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4  flex justify-end items-center">
                  <button
                    className="bg-blue-500 px-4 py-2 text-white rounded-lg text-xl font-semibold hover:bg-blue-700 ts07"
                    onClick={submitHandler}
                  >
                    ثبت اطلاعات
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl lg:text-4xl flex justify-center items-center w-full h-[100vh]">
              موقعیت شغلی خالی وجود ندارد
            </div>
          </>
        )}

        <LoadingModal />

        {
          sentLoaderState && (
            <div className="absolute top-0 left-0 w-full h-[100vh] bg-[#070707d4] flex justify-center items-center ">
          <div className="flex justify-center items-center mt-20">
            <div className="loader ease-in-out rounded-full border-8 border-t-black border-b-black border-t-4 border-gray-400 h-20 w-20 animate-spin"></div>
          </div>
        </div>
          )
        }
      </div>
    </>
  );
};

export default EmployInfoPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userName = context.params?.userName;

  try {
    const res = await axiosServer.post("/Employee/ExistUserName", {
      userName,
    });

    if (res.data) {
      return {
        props: {
          isUserValid: true,
          UserName: userName,
        },
      };
    } else {
      // If the response status is not 200, return false for isUserValid
      return {
        props: {
          isUserValid: false,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    // Return false for isUserValid in case of an error
    return {
      props: {
        isUserValid: false,
      },
    };
  }
};

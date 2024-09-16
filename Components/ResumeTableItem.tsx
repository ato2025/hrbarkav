import React, { useState } from 'react'
import ThreeDots from './Icons/ThreeDots'
import DownloadIcon from './Icons/DownloadIcon'
import CloseToggleIcon from './Icons/CloseToggleIcon'
import EmployerInfoModalItem from './EmployerInfoModal/EmployerInfoModalItem'

type props = {
   fullName:string
   city:string
   email:string
   fileUrl:string
   jobPosition:string
   languageLevel:string
   region:string
   salary:string
   startDate:string
   typeOfCooperation:string
}


function ResumeTableItem({city,email,fileUrl,fullName,jobPosition,languageLevel,region,salary,startDate,typeOfCooperation}:props) {

   const [isShowModal,setIsShowModal] = useState(false)
   
  return (
  <>
   <tr className="text-white border-b">
              <th className="font-normal"> {fullName} </th>
              <th className="font-normal">{city}</th>
              <th className="font-normal">{jobPosition}</th>
              <th className="font-normal">{salary}</th>
              <td className="flex justify-center items-center h-full">
                <ThreeDots action={setIsShowModal} />
              </td>
              <th className="font-normal text-center">
                
                  <a href={`http://82.115.21.27:8081/resume/${fileUrl}`} target="_blank" className='flex justify-center items-center'>
                  <div className="mt-2 mx-1">Download Pdf</div>
                  <DownloadIcon  />
                  </a>
                  
                
              </th>
            </tr>
            {
  isShowModal && (
    <div className="absolute left-[5%] top-[5%] w-[90%] h-[90%]   bg-[#bab9b5] rounded-lg">
          <div className="relative w-full h-full  pb-20 pt-32 px-20">
            <div className="absolute right-16 top-5 w-fit h-fit border-2 rounded-full border-sky-950 cp" onClick={()=>{setIsShowModal(false)}}>
              <CloseToggleIcon />
            </div>

            <div className=" w-full h-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-4">
              <EmployerInfoModalItem title="نام و نام خانوادگی" info={fullName} />
              <EmployerInfoModalItem title="ایمیل " info={email} />
              <EmployerInfoModalItem
                title="موقعیت شغلی مورد درخواست"
                info={jobPosition}
              />
              <EmployerInfoModalItem title="نوع همکاری" info={typeOfCooperation} />
              <EmployerInfoModalItem title="شهر" info={city} />
              <EmployerInfoModalItem title="منطقه" info={region} />
              <EmployerInfoModalItem title="سطح تسلط به زبان" info={languageLevel} />
              <EmployerInfoModalItem title="رنج حقوقی" info={salary} />
              <EmployerInfoModalItem title="تاریخ شروع همکاری" info={startDate} />
            </div>
          </div>
        </div>
  )
}
  </>
  )
}

export default ResumeTableItem
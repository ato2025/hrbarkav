import React from 'react'


type props ={
       title:string
mainTitle:string
action:(value:string)=>void
}
function HeaderTab({action,mainTitle,title}:props) {
  return (
       <div
       className={`flex justify-center items-center cp ${
         mainTitle == title && "bg-[#0a0a0aa3]"
       }`}
       onClick={() => {
         action(title)
       }}
     >
       {title}
     </div>
  )
}

export default HeaderTab
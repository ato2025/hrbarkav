import React from "react";

type props = {
   info:string
   title:string
}

function EmployerInfoModalItem({info,title}:props) {
  return (
    <div>
      <div className="text-blue-500 mb-10">{title}</div>
      <div className="text-gray-700">{info}</div>
    </div>
  );
}

export default EmployerInfoModalItem;

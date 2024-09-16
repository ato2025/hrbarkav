import React, { useEffect, useState } from "react";

function LoadingModal() {
  const [showModal, setIsShowModal] = useState(true);
  useEffect(() => {
   const interval = setInterval(() => {
     setIsShowModal(false);
   }, 500);
 
   return () => clearInterval(interval);
 }, []);

  return (
    <>
      {showModal ? (
        <div className="absolute top-0 left-0 w-full h-[100vh] bg-[#070707d4] flex justify-center items-center ">
          <div className="flex justify-center items-center mt-20">
            <div className="loader ease-in-out rounded-full border-8 border-t-black border-b-black border-t-4 border-gray-400 h-20 w-20 animate-spin"></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default LoadingModal;

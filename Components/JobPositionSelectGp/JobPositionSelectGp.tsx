import React, { useEffect, useState } from "react";
import ChevUp from "../Icons/ChevUp";
import ChevDown from "../Icons/ChevDown";
import Swal from "sweetalert2";

type ResponseItem = {id: number, title: string}

type Props = {
  title: string;
  options: ResponseItem[] ;
  onClick: (e:string) => void;
  subTitle: string;
};

function JobPositionSelectGp({ onClick, options, title, subTitle }: Props) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const targetElem = e.target as HTMLElement;
      if (!targetElem.dataset.name) {
       setIsShowMenu(false)
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);


  return (
    <div className="inputGp ">
      <div className="text-white font-semibold">{title}</div>
      <div className="mt-2 mb-5 relative">
        <div className="flex justify-between items-center  px-4 py-2 bg-white rounded-lg relative cp" data-name="selectBoxModule"  onClick={() => {
              setIsShowMenu((prev) => !prev);
            }}>
          <div>{selectedItem ? selectedItem : subTitle}</div>
          <div
            className="cp "
            onClick={() => {
              setIsShowMenu((prev) => !prev);
            }}
          >
            {isShowMenu ? <ChevUp /> : <ChevDown />}
          </div>

          <div
            className={`absolute left-0 top-full w-full h-[40vh] overflow-y-auto z-50 rounded-lg overflow-hidden ts07 ${
              isShowMenu ? "block" : "hidden"
            }`}
          >
            {options.map((item, index) => (
              <div
                key={index}
                className="bg-slate-500 text-center py-2 border-b text-white cp t07 hover:bg-slate-800"
                onClick={() => {
                  setSelectedItem(item.title);
                  setIsShowMenu(false)
                  onClick(item.title)
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPositionSelectGp;

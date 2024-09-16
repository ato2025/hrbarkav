import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type Props = {
  onClk:(e:string)=>void
}
function SelectDate({onClk}:Props) {
  const [value, setValue] = useState<Date | string>(new Date());
  return (
    <>
       <div>
       <div className="text-white font-semibold">
              تاریخ شروع همکاری خود را وارد کنید
            </div>
      <div className="mt-2 mb-5">
        <DatePicker
          value={value}
          minDate={new Date()}
          weekStartDayIndex={1}
          calendar={persian}
          locale={persian_fa}
          onChange={(e: DateObject) => {
            setValue(e.convert(persian).format());
            onClk(e.convert(persian).format())
          }}
          
          //    maxDate={toDate ? toDate:''}
        />
      </div>
       </div>
    </>
  );
}

export default SelectDate;

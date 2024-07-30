import { useEffect, useState } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowIcon, CalendarIcon } from "../../assets/icons";
import DatePickerComponent from "./date-picker";
import "./index.css";

type PropsType = {
  placeholder: [string, string];
  format: string;
  open?: boolean;
  onChange: (date: [Date, Date]) => void;
  value?: [Date, Date];
  disabled?: boolean;
  className?: string;
  monthPicker?: boolean;
  errormsg?: string;
};

const RangePickerComponent = (props: PropsType) => {
  const {
    placeholder = ["From", "To"],
    format = "DD/MM/YYYY",
    open,
    onChange = () => {},
    value = "",
    disabled = false,
    monthPicker = false,
    errormsg = "",
  } = props;
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [showCalendarType, setShowCalendarType] = useState<
    "startCal" | "endCall" | null
  >(null);

  useEffect(() => {
    if (value) {
      const [start, end] = value as [Date, Date];
      setStartDate(start);
      setEndDate(end);
    }
    if (open) {
      setShowCalendarType("startCal");
    }
  }, [value, open]);

  return (
    <div className="relative">
      <span className="text-[#181919] text-[11px] leading-3 font-medium">
        Label
      </span>
      <div
        className={`px-3 py-2  border border-solid rounded-lg flex items-center mt-2 active:border-[#71B0D0] ${
          disabled
            ? "bg-[#e9eaec]"
            : `${
                errormsg
                  ? "border-[#FF9691] "
                  : startDate && endDate
                  ? "border-[#9A9EA6]"
                  : "border-[#DFE1E6]"
              }`
        }`}
        onClick={() => {
          if (!disabled) {
            setShowCalendarType("startCal");
          }
        }}
      >
        <CalendarIcon />
        <div className="flex items-center pl-2 gap-4">
          <p
            className={`${
              startDate ? "text-[#181919] " : "text-[#9A9EA6]"
            } text-xs leading-[14px] font-medium w-[100px]`}
          >
            {startDate ? moment(startDate).format(format) : placeholder?.[0]}
          </p>
          <span className="bg-[#DFE1E6] w-[1px] h-[14px]" />
          <p
            className={`${
              endDate ? "text-[#181919] " : "text-[#9A9EA6]"
            } text-xs leading-[14px] font-medium w-[100px]`}
          >
            {endDate ? moment(endDate).format(format) : placeholder?.[1]}
          </p>
        </div>
        <ArrowIcon
          className={`fill-[#484B52] ${
            showCalendarType ? "rotate-90" : "-rotate-90"
          }`}
        />
      </div>
      {showCalendarType ? (
        <div className="absolute w-full">
          {showCalendarType === "startCal" ? (
            <DatePickerComponent
              format={format}
              inline
              selectsStart
              monthPicker={monthPicker}
              startDate={startDate as Date}
              endDate={endDate as Date}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(null);
                setShowCalendarType("endCall");
              }}
              onClickOutside={() => setShowCalendarType(null)}
              onCalendarHeaderClicked={() => {
                setStartDate(null);
                setEndDate(null);
              }}
            />
          ) : (
            <DatePickerComponent
              format={format}
              inline
              selectsEnd
              monthPicker={monthPicker}
              startDate={startDate as Date}
              endDate={endDate as Date}
              onChange={(date) => {
                setEndDate(date);
                onChange([startDate as Date, date as Date]);
                setShowCalendarType(open ? "startCal" : null);
              }}
              onClickOutside={() => setShowCalendarType(null)}
              onCalendarHeaderClicked={() => {
                setEndDate(null);
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RangePickerComponent;

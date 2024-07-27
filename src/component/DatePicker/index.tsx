import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowIcon } from "../../assets/icons";
import "./index.css";

type PropsType = {
  placeholder: string;
  format: string;
  open?: boolean;
  onChange: (date: Date | [Date, Date]) => void;
  value: Date;
  customInput?: React.ReactElement;
  disabled?: boolean;
  className?: string;
  rangePicker?: true | false;
};

const DatePickerComponent = (props: PropsType) => {
  const {
    placeholder = "Select date",
    format = "DD/MM/YYYY",
    open = true,
    onChange = () => {},
    value = "",
    customInput,
    disabled = false,
    className = "",
    rangePicker = true,
  } = props;
  const [date, setDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showMonthYearPicker, setShowMonthYearPicker] =
    useState<boolean>(false);
  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);
  console.log("object1", date, "+++++", startDate, "+++++", endDate);
  return (
    <DatePicker
      open={open}
      selectsRange={rangePicker as true}
      className={`${className} border-[#9A9EA6] border border-solid px-3 py-2 rounded-lg active:!border-[#71B0D0] outline-none`}
      calendarClassName="bg-[#FFFFFF] px-4 py-6 border-none !shadow-[0px_8px_24px_-12px_#BDBDBD] rounded-lg date-picker-calendar"
      dayClassName={() =>
        "!w-[unset] text-[10px] leading-3 font-light border-none outline-none hover:!bg-transparent !bg-transparent"
      }
      weekDayClassName={() =>
        "text-[#181919] font-light text-[10px] leading-3 w-[35px] h-[35px] mt-4 content-center"
      }
      monthClassName={() =>
        "!w-[unset] text-[10px] leading-3 font-light border-none outline-none hover:!bg-transparent !bg-transparent"
      }
      showPopperArrow={false}
      disabled={disabled}
      placeholderText={placeholder}
      dateFormat={format}
      selected={date || startDate}
      startDate={startDate}
      endDate={endDate}
      inline
      customInput={customInput}
      value={!rangePicker && date ? moment(date)?.format(format) : ""}
      onChange={(date: Date | null | [Date | null, Date | null]) => {
        console.log("object0", date);
        if (date) {
          if (rangePicker) {
            const [start, end] = date as [Date, Date];
            setStartDate(start);
            setEndDate(end);
          } else {
            setDate(date as Date);
            setShowMonthYearPicker(false);
          }
          onChange(date as Date | [Date, Date]);
        }
      }}
      showMonthYearPicker={showMonthYearPicker}
      showFourColumnMonthYearPicker
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        decreaseYear,
        increaseYear,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        prevYearButtonDisabled,
        nextYearButtonDisabled,
      }) => (
        <div className="flex justify-between items-center pb-4 border-b border-[#EFF1F5]">
          <p
            className="text-[#181919] text-lg leading-5 font-medium m-0 cursor-pointer"
            onClick={() => setShowMonthYearPicker(true)}
          >
            {showMonthYearPicker
              ? moment(date).format("YYYY")
              : moment(date).format("MMMM YYYY")}
          </p>
          <div className="flex items-center gap-[6px]">
            <button
              className="border-none outline-none bg-transparent"
              onClick={showMonthYearPicker ? decreaseYear : decreaseMonth}
              disabled={
                showMonthYearPicker
                  ? prevYearButtonDisabled
                  : prevMonthButtonDisabled
              }
            >
              <ArrowIcon />
            </button>
            <button
              className="border-none outline-none bg-transparent"
              onClick={showMonthYearPicker ? increaseYear : increaseMonth}
              disabled={
                showMonthYearPicker
                  ? nextYearButtonDisabled
                  : nextMonthButtonDisabled
              }
            >
              <ArrowIcon className="rotate-180" />
            </button>
          </div>
        </div>
      )}
      renderDayContents={(day, calDate) => {
        const cal_date = moment(calDate).format(format);
        const current_date = moment().format(format);
        const selected_date = moment(date).format(format);
        const start_date = moment(startDate).format(format);
        const end_date = moment(endDate).format(format);
        const condition =
          (!date && !startDate && !end_date && cal_date === current_date) ||
          (date && selected_date === cal_date) ||
          (startDate && start_date === cal_date) ||
          (endDate && end_date === cal_date);
        return (
          <div
            className={`relative flex items-center justify-center !w-[35px] !h-[35px] !rounded-full ${
              condition
                ? "bg-[#F72717] hover:bg-[#F72717] text-[#FFFFFF]"
                : startDate &&
                  endDate &&
                  start_date < cal_date &&
                  cal_date < end_date
                ? "bg-[#FFF6F5] text-[#181919]"
                : "hover:bg-[#FFF6F5] text-[#181919]"
            }`}
          >
            {day}
            {cal_date === current_date ? (
              <span
                className={`absolute bottom-1 right-[14px] w-1 h-1 rounded-full ${
                  condition ? "bg-[#FFF6F5]" : "bg-[#F72717]"
                }`}
              />
            ) : null}
          </div>
        );
      }}
      renderMonthContent={(m, shortMonthText, fullMonthText, day) => {
        console.log("object3", day, shortMonthText);
        const current_month = moment(day).format("MMM");
        const condition = current_month === shortMonthText;
        return (
          <div className="flex items-center justify-center  w-[62px] h-[53px]">
            <div
              className={`w-[35px] h-[35px] content-center rounded-full ${
                condition
                  ? "bg-[#F72717] hover:bg-[#F72717] text-[#FFFFFF]"
                  : "hover:bg-[#FFF6F5] text-[#181919]"
              }`}
            >
              {shortMonthText}
            </div>
          </div>
        );
      }}
    />
  );
};

export default DatePickerComponent;

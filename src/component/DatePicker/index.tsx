import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowIcon, CalendarIcon } from "../../assets/icons";
import "./index.css";

type PropsType = {
  placeholder: string;
  rangePlaceholder: [string, string];
  format: string;
  open?: boolean;
  onChange: (date: Date | [Date, Date]) => void;
  value: Date | [Date, Date];
  disabled?: boolean;
  className?: string;
  rangePicker?: boolean;
  monthPicker?: boolean;
};

type RenderCustomHeaderType = {
  date: Date;
  decreaseMonth: VoidFunction;
  increaseMonth: VoidFunction;
  decreaseYear: VoidFunction;
  increaseYear: VoidFunction;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
};

const DatePickerComponent = (props: PropsType) => {
  const {
    placeholder = "Select date",
    rangePlaceholder = ["From", "To"],
    format = "DD/MM/YYYY",
    open,
    onChange = () => {},
    value = "",
    disabled = false,
    className = "",
    rangePicker = true,
    monthPicker = false,
  } = props;
  const [date, setDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedMonth, setSelectedMonth] = useState<Date | null>();
  const [startMonth, setStartMonth] = useState<Date | null>();
  const [endMonth, setEndMonth] = useState<Date | null>();
  const [showMonthYearPicker, setShowMonthYearPicker] =
    useState<boolean>(false);

  useEffect(() => {
    if (value) {
      if (rangePicker) {
        const [start, end] = value as [Date, Date];
        setStartDate(start);
        setEndDate(end);
        setStartMonth(start);
        setEndMonth(end);
      } else {
        setDate(value as Date);
      }
    }
  }, [value, rangePicker]);

  const renderCalendarHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  }: RenderCustomHeaderType) => {
    return (
      <div className="flex justify-between items-center pb-4 border-b border-[#EFF1F5]">
        <p
          className="text-[#181919] text-lg leading-5 font-medium m-0 cursor-pointer"
          onClick={() => setShowMonthYearPicker(true)}
        >
          {showMonthYearPicker || monthPicker
            ? moment(date).format("YYYY")
            : moment(date).format("MMMM YYYY")}
        </p>
        <div className="flex items-center gap-[6px]">
          <button
            className="border-none outline-none bg-transparent"
            onClick={
              showMonthYearPicker || monthPicker ? decreaseYear : decreaseMonth
            }
            disabled={
              showMonthYearPicker || monthPicker
                ? prevYearButtonDisabled
                : prevMonthButtonDisabled
            }
          >
            <ArrowIcon />
          </button>
          <button
            className="border-none outline-none bg-transparent"
            onClick={
              showMonthYearPicker || monthPicker ? increaseYear : increaseMonth
            }
            disabled={
              showMonthYearPicker || monthPicker
                ? nextYearButtonDisabled
                : nextMonthButtonDisabled
            }
          >
            <ArrowIcon className="rotate-180" />
          </button>
        </div>
      </div>
    );
  };

  const renderCalendarDay = (day: number, calDate: Date) => {
    const cal_date = moment(calDate).format(format);
    const current_date = moment().format(format);
    const condition =
      (!date && !rangePicker && cal_date === current_date) ||
      (date && moment(date).isSame(calDate)) ||
      (startDate && moment(startDate).isSame(calDate)) ||
      (endDate && moment(endDate).isSame(calDate));
    return (
      <div
        className={`relative flex items-center justify-center !w-[35px] !h-[35px] ${
          (rangePicker &&
            startDate &&
            endDate &&
            moment(startDate).isBefore(calDate) &&
            moment(endDate).isAfter(calDate)) ||
          (rangePicker && !startDate && !endDate && current_date === cal_date)
            ? "bg-[#FFF6F5]"
            : startDate && moment(startDate).isSame(calDate)
            ? "bg-[#FFF6F5] !rounded-l-full"
            : endDate && moment(endDate).isSame(calDate)
            ? "bg-[#FFF6F5] !rounded-r-full"
            : ""
        }`}
      >
        <div
          className={`w-full h-full content-center !rounded-full ${
            condition
              ? "bg-[#F72717] hover:bg-[#F72717] text-[#FFFFFF]"
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
      </div>
    );
  };

  const renderCalendarMonth = (m: number, shortMonthText: string) => {
    const month = m + 1;
    const current_date = new Date();
    const condition =
      (!date &&
        !startMonth &&
        !endMonth &&
        current_date?.getMonth() + 1 === month) ||
      (date && date?.getMonth() + 1 === month) ||
      (startMonth && startMonth?.getMonth() + 1 === month) ||
      (endMonth && endMonth?.getMonth() + 1 === month) ||
      (monthPicker && startDate && startDate?.getMonth() + 1 === month) ||
      (monthPicker && endDate && endDate?.getMonth() + 1 === month);
    return (
      <div
        className={`flex items-center justify-center w-[62px] h-[35px] my-3`}
      >
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
  };

  const handleDateSelect = (date: Date | null | [Date | null, Date | null]) => {
    if (date) {
      if (rangePicker) {
        const [start, end] = date as [Date, Date];
        console.log("object0", start);
        if (showMonthYearPicker) {
          if (start) {
            setStartMonth(start);
          }
          if (end) {
            setEndMonth(end);
          }
          setShowMonthYearPicker(false);
        } else {
          if (start && startMonth) {
            const new_start_date = new Date(
              `${
                startMonth?.getMonth() + 1
              }/${start?.getDate()}/${startMonth?.getFullYear()}`
            );
            setStartDate(new_start_date);
            setShowMonthYearPicker(true);
          }
          if (end && endMonth) {
            const new_end_date = new Date(
              `${
                endMonth?.getMonth() + 1
              }/${end?.getDate()}/${endMonth?.getFullYear()}`
            );
            setEndDate(new_end_date);
            setShowMonthYearPicker(false);
          }
        }
        // else {
        // const new_start_date = new Date(
        //   `${startMonth?.getMonth()}/${start?.getDate()}/${startMonth?.getFullYear()}`
        // );
        // const new_end_date = new Date(
        //   `${endMonth?.getMonth()}/${end?.getDate()}/${endMonth?.getFullYear()}`
        // );
        // console.log(
        //   "object1",
        //   startMonth,
        //   endMonth,
        //   new_start_date,
        //   new_end_date,
        //   start,
        //   end
        // );
        // setShowMonthYearPicker(true);
        // onChange([
        //   startMonth && start ? new_start_date : start,
        //   endMonth && end ? new_end_date : end,
        // ] as [Date, Date]);
        // }
        // if (end) {
        // setShowMonthYearPicker(false);
        // }
      } else {
        setDate(date as Date);
        onChange(date as Date | [Date, Date]);
        setShowMonthYearPicker(false);
      }
    }
  };
  return (
    <DatePicker
      open={open}
      className={className}
      calendarClassName="bg-[#FFFFFF] px-4 py-6 border-none !shadow-[0px_8px_24px_-12px_#BDBDBD] rounded-lg date-picker-calendar"
      dayClassName={() =>
        "!w-[unset] text-[10px] leading-3 font-light border-none outline-none hover:!bg-transparent !bg-transparent m-0"
      }
      weekDayClassName={() =>
        "!m-0 text-[#181919] font-light text-[10px] leading-3 w-[35px] h-[35px] mt-4 mb-2 content-center"
      }
      monthClassName={() =>
        "!m-0 !w-[unset] text-[10px] leading-3 font-light border-none outline-none hover:!bg-transparent !bg-transparent"
      }
      selectsRange={rangePicker as true}
      shouldCloseOnSelect={!showMonthYearPicker}
      showPopperArrow={false}
      disabled={disabled}
      showMonthYearPicker={monthPicker || showMonthYearPicker}
      showFourColumnMonthYearPicker
      placeholderText={placeholder}
      dateFormat={format}
      selected={date || startDate}
      startDate={startDate as Date}
      endDate={endDate as Date}
      value={!rangePicker && date ? moment(date)?.format(format) : ""}
      onCalendarClose={() => setShowMonthYearPicker(false)}
      onChange={handleDateSelect}
      renderCustomHeader={renderCalendarHeader}
      renderDayContents={renderCalendarDay}
      renderMonthContent={renderCalendarMonth}
      customInput={
        rangePicker ? (
          <div>
            <span className="text-[#181919] text-[10px] leading-3 font-medium">
              Label
            </span>
            <div className="px-3 py-2 border-[#DFE1E6] border border-solid rounded-lg flex items-center mt-2">
              <CalendarIcon />
              <div className="flex items-center pl-2 gap-4">
                <p className="text-[#181919] text-xs leading-[14px] font-medium w-[85px]">
                  {startDate
                    ? moment(startDate).format(format)
                    : rangePlaceholder?.[0]}
                </p>
                <span className="bg-[#DFE1E6] w-[1px] h-[14px]" />
                <p className="text-[#181919] text-xs leading-[14px] font-medium w-[85px]">
                  {endDate
                    ? moment(endDate).format(format)
                    : rangePlaceholder?.[1]}
                </p>
              </div>
              <ArrowIcon className="fill-[#484B52] -rotate-90" />
            </div>
          </div>
        ) : undefined
      }
    />
  );
};

export default DatePickerComponent;

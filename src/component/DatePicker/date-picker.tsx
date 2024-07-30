import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowIcon } from "../../assets/icons";
import "./index.css";

type PropsType = {
  placeholder?: string;
  format: string;
  open?: boolean;
  onChange: (date: Date) => void;
  value?: Date;
  disabled?: boolean;
  className?: string;
  monthPicker?: boolean;
  customInput?: JSX.Element;
  inline?: boolean;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date;
  endDate?: Date;
  onClickOutside?: React.MouseEventHandler<HTMLElement>;
  onCalendarHeaderClicked?: () => void;
  showTime?: boolean;
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
    format = "DD/MM/YYYY",
    open,
    onChange = () => {},
    value = "",
    disabled = false,
    className = "",
    monthPicker = false,
    customInput,
    inline,
    selectsStart = false,
    selectsEnd = false,
    startDate,
    endDate,
    onClickOutside,
    onCalendarHeaderClicked = () => {},
    showTime = false,
  } = props;
  const [date, setDate] = useState<Date>();
  const [showMonthYearPicker, setShowMonthYearPicker] =
    useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setDate(value as Date);
    }
  }, [value]);

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
          onClick={() => {
            setShowMonthYearPicker(true);
            onCalendarHeaderClicked();
          }}
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
      (!date && !startDate && !endDate && cal_date === current_date) ||
      (date && moment(date).isSame(calDate)) ||
      (startDate && moment(startDate).isSame(calDate)) ||
      (endDate && moment(endDate).isSame(calDate));

    return (
      <div
        className={`relative flex items-center justify-center !w-[35px] !h-[35px] ${
          startDate &&
          endDate &&
          moment(startDate).isBefore(calDate) &&
          moment(endDate).isAfter(calDate)
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
        !startDate &&
        !endDate &&
        current_date?.getMonth() + 1 === month) ||
      (date && date?.getMonth() + 1 === month) ||
      (startDate && startDate?.getMonth() + 1 === month) ||
      (endDate && endDate?.getMonth() + 1 === month);
    return (
      <div
        className={`flex items-center justify-center w-[62px] h-[35px] my-3 ${
          startDate &&
          startDate?.getMonth() + 1 === month &&
          endDate &&
          endDate?.getMonth() + 1 === month
            ? "bg-[#FFF6F5]"
            : startDate && startDate?.getMonth() + 1 === month
            ? "bg-[#FFF6F5] !rounded-l-full"
            : endDate && endDate?.getMonth() + 1 === month
            ? "bg-[#FFF6F5] !rounded-r-full"
            : ""
        }`}
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

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setDate(date as Date);
      if (!showMonthYearPicker) {
        onChange(date as Date);
      }
      setShowMonthYearPicker(false);
    }
  };
  return (
    <DatePicker
      open={open}
      className={className}
      calendarClassName="bg-[#FFFFFF] px-4 py-6 border-none !shadow-[0px_8px_24px_-12px_#BDBDBD] rounded-lg date-picker-calendar"
      dayClassName={() =>
        "!w-[unset] text-[11px] font-light border-none outline-none hover:!bg-transparent !bg-transparent m-0"
      }
      weekDayClassName={() =>
        "!m-0 text-[#181919] font-light text-[11px] w-[35px] h-[35px] mt-4 mb-2 content-center"
      }
      monthClassName={() =>
        "!m-0 !w-[unset] text-[11px] font-light border-none outline-none hover:!bg-transparent !bg-transparent"
      }
      allowSameDay
      shouldCloseOnSelect={!showMonthYearPicker}
      showPopperArrow={false}
      disabled={disabled}
      showMonthYearPicker={monthPicker || showMonthYearPicker}
      showFourColumnMonthYearPicker
      placeholderText={placeholder}
      dateFormat={format}
      selected={date}
      value={date ? moment(date)?.format(format) : ""}
      onCalendarClose={() => setShowMonthYearPicker(false)}
      onChange={handleDateSelect}
      renderCustomHeader={renderCalendarHeader}
      renderDayContents={renderCalendarDay}
      renderMonthContent={renderCalendarMonth}
      customInput={customInput}
      inline={inline}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      startDate={startDate}
      endDate={endDate}
      onClickOutside={onClickOutside}
      showTimeInput={showTime}
    />
  );
};

export default DatePickerComponent;

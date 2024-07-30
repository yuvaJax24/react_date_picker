import DatePickerComponent from "./component/DatePicker/date-picker";
import RangePickerComponent from "./component/DatePicker/range-picker";

function App() {
  return (
    <div className="flex justify-center mt-20 gap-6 items-center">
      <DatePickerComponent
        placeholder="Select Date"
        format="DD/MM/YYYY"
        onChange={(date) => {
          console.log("first0", date);
        }}
      />
      <RangePickerComponent
        placeholder={["Start Date", "End Date"]}
        format={"DD/MM/YYYY"}
        onChange={(date) => {
          console.log("first1", date);
        }}
      />
    </div>
  );
}

export default App;

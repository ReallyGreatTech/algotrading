import { time } from "@amcharts/amcharts5";
import AreaChart from "../components/Charts/AreaChart";

const PriceChart = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  let value = 100;
  function generateData() {
    value = Math.round(Math.random() * 10 - 5 + value);
    time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value,
    };
  }

  function generateDatas(count: number) {
    const data = [];
    for (let i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }

  const data = generateDatas(50);

  return (
    <div className="">
      <AreaChart
        data={data}
        id="chartdiv"
        containerStyle={{ height: "27em" }}
      />
    </div>
  );
};

export default PriceChart;

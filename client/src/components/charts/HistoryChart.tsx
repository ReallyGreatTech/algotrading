// import React, { useLayoutEffect, useState } from 'react';
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// const HistoryChart = () => {
//   const [interval, setInterval] = useState({ timeUnit: "hour", count: 1 });

//   useLayoutEffect(() => {
//     let root = am5.Root.new("historyChartDiv");

//     root.setThemes([am5themes_Animated.new(root)]);

//     let chart = root.container.children.push(am5xy.XYChart.new(root, {
//       panX: true,
//       panY: false,
//       wheelX: "panX",
//       wheelY: "zoomX",
//       pinchZoomX: true
//     }));

//     let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
//       behavior: "none"
//     }));
//     cursor.lineX.setAll({
//       stroke: am5.color(0xFFFFFF),
//       strokeDasharray: [5, 5]
//     });
//     // cursor.lineY.setAll({
//     //   stroke: am5.color(0xFFFFFF),
//     //   strokeDasharray: [5, 5],
//     //   visible: true
//     // });

//     let date = new Date();
//     date.setHours(0, 0, 0, 0);
//     let value = 1;

//     function generateData() {
//       value = Math.round((Math.random() * 10 - 3) + value);
//       switch (interval.timeUnit) {
//         case "hour":
//           am5.time.add(date, "hour", 1);
//           break;
//         case "day":
//           am5.time.add(date, "day", 1);
//           break;
//         case "month":
//           am5.time.add(date, "day", 1);
//           break;
//         case "year":
//           am5.time.add(date, "month", 1);
//           break;
//         default:
//           am5.time.add(date, "day", 1);
//       }
//       return {
//         date: date.getTime(),
//         value: value
//       };
//     }

//     function generateDatas(count) {
//       let data = [];
//       for (let i = 0; i < count; ++i) {
//         data.push(generateData());
//       }
//       return data;
//     }

//     let xRenderer = am5xy.AxisRendererX.new(root, {});
//     xRenderer.labels.template.setAll({
//       minPosition: 0.01,
//       maxPosition: 0.99,
//       fill: am5.color(0xFFFFFF)  // Set label color to white
//     });
//     xRenderer.grid.template.set("visible", false);  // Remove grid lines

//     let xAxis = chart.xAxes.push(
//       am5xy.DateAxis.new(root, {
//         baseInterval: interval,
//         renderer: xRenderer,
//         // tooltip: am5.Tooltip.new(root, {
//         //   labelText: "{valueX.formatDate('yyyy-MM-dd HH:mm')}",
//         //   label: { fill: am5.color(0xFFFFFF) } // Set tooltip label color to white
//         // })
//       })
//     );

//     let yRenderer = am5xy.AxisRendererY.new(root, { opposite: true });  // Shift Y-axis to right
//     yRenderer.labels.template.setAll({
//       fill: am5.color(0xFFFFFF)  // Set label color to white
//     });
//     yRenderer.grid.template.set("visible", false);  // Remove grid lines

//     let yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: yRenderer,
//         min: -50,
//         max: 50,
//         // tooltip: am5.Tooltip.new(root, {
//         //   labelText: "{valueY}",
//         //   label: { fill: am5.color(0xFFFFFF) }
//         // })
//       })
//     );

//     let series = chart.series.push(am5xy.LineSeries.new(root, {
//       name: "Series",
//       xAxis: xAxis,
//       yAxis: yAxis,
//       valueYField: "value",
//       valueXField: "date"
//     }));

//     let tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
//     tooltip.label.setAll({
//       text: "{valueX}",
//       fill: am5.color(0xFFFFFF)  // Set tooltip label color to white
//     });

//     let dataCount;
//     switch (interval.timeUnit) {
//       case "hour":
//         dataCount = 12;
//         break;
//       case "day":
//         dataCount = 30;
//         break;
//       case "month":
//         dataCount = 30;
//         break;
//       case "year":
//         dataCount = 12;
//         break;
//       default:
//         dataCount = 200;
//     }

//     let data = generateDatas(dataCount);
//     series.data.setAll(data);
//     xAxis.data.setAll(data);

//     series.appear(1000);
//     chart.appear(1000, 100);

//     return () => {
//       root.dispose();
//     };
//   }, [interval]);

//   return (
//     <div>
//       <div>
//         <button onClick={() => setInterval({ timeUnit: "hour", count: 1 })}>Hourly</button>
//         <button onClick={() => setInterval({ timeUnit: "day", count: 1 })}>Daily</button>
//         <button onClick={() => setInterval({ timeUnit: "month", count: 1 })}>Monthly</button>
//         <button onClick={() => setInterval({ timeUnit: "year", count: 1 })}>Yearly</button>
//       </div>
//       <div id="historyChartDiv" style={{ width: "100%", height: "500px" }}></div>
//     </div>
//   );
// };

// export default HistoryChart;








import React, { useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const HistoryChart = () => {
  const [interval, setInterval] = useState({ timeUnit: "hour", count: 1 });

  useLayoutEffect(() => {
    let root = am5.Root.new("historyChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    // cursor.lineX.setAll({
    //   stroke: am5.color(0xFFFFFF),
    //   strokeDasharray: [5, 5]
    // });
    // cursor.lineY.setAll({
    //   stroke: am5.color(0xFFFFFF),
    //   strokeDasharray: [5, 5],
    //   visible: true
    // });

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 1;

    function generateData() {
      value = Math.round((Math.random() * 10 - 3) + value);
      switch (interval.timeUnit) {
        case "hour":
          am5.time.add(date, "hour", 1);
          break;
        case "day":
          am5.time.add(date, "day", 1);
          break;
        case "month":
          am5.time.add(date, "day", 1);
          break;
        case "year":
          am5.time.add(date, "month", 1);
          break;
        default:
          am5.time.add(date, "day", 1);
      }
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      let data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.labels.template.setAll({
      minPosition: 0.01,
      maxPosition: 0.99,
      fill: am5.color(0xFFFFFF)  // Set label color to white
    });
    xRenderer.grid.template.set("visible", false);  // Remove grid lines

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: interval,
        renderer: xRenderer,
        // tooltip: am5.Tooltip.new(root, {
        //   labelText: "{valueX.formatDate('yyyy-MM-dd HH:mm')}",
        //   label: { fill: am5.color(0xFFFFFF) } // Set tooltip label color to white
        // })
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, { opposite: true });  // Shift Y-axis to right
    yRenderer.labels.template.setAll({
      fill: am5.color(0xFFFFFF)  // Set label color to white
    });
    yRenderer.grid.template.set("visible", false);  // Remove grid lines

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
        min: -50,
        max: 50,
        // tooltip: am5.Tooltip.new(root, {
        //   labelText: "{valueY}",
        //   label: { fill: am5.color(0xFFFFFF) }
        // })
      })
    );

    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date"
    }));

    let tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
    tooltip.label.setAll({
      text: "{valueX.formatDate('yyyy-MM-dd HH:mm')}",
      fill: am5.color(0xFFFFFF)  // Set tooltip label color to white
    });

    let dataCount;
    switch (interval.timeUnit) {
      case "hour":
        dataCount = 12;  // 12 hours
        break;
      case "day":
        dataCount = 30;  // 30 days
        break;
      case "month":
        dataCount = 30;  // 30 months
        break;
      case "year":
        dataCount = 12;  // 12 years
        break;
      default:
        dataCount = 200;
    }

    let data = generateDatas(dataCount);
    series.data.setAll(data);
    xAxis.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [interval]);

  return (
    <div>
      {/* <div>
        <button onClick={() => setInterval({ timeUnit: "hour", count: 1 })}>Hourly</button>
        <button onClick={() => setInterval({ timeUnit: "day", count: 1 })}>Daily</button>
        <button onClick={() => setInterval({ timeUnit: "month", count: 1 })}>Monthly</button>
        <button onClick={() => setInterval({ timeUnit: "year", count: 1 })}>Yearly</button>
      </div> */}
      <div id="historyChartDiv" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default HistoryChart;

// import * as am5 from '@amcharts/amcharts5';
// import * as am5xy from '@amcharts/amcharts5/xy';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import { useEffect, useRef } from 'react';

// interface FundingData {
//   timestamp: string;
//   // chartDate: string; // Add this field to the interface
//   funding: number;
// }

// interface HistoryChartProps {
//   data: FundingData[];
//   timeRange: string;
// }

// const HistoryChart = ({ data, timeRange }: HistoryChartProps) => {

//     // const chartRef = useRef(null);
//     // Ref for the chart element
//     const chartRef = useRef<HTMLDivElement>(null);

//   // useEffect(() => {
//   //   let root = am5.Root.new(chartRef.current);

//   //   root.setThemes([am5themes_Animated.new(root)]);

//   //   let chart = root.container.children.push(
//   //     am5xy.XYChart.new(root, {
//   //       panX: true,
//   //       panY: true,
//   //       wheelX: 'panX',
//   //       wheelY: 'zoomX',
//   //       pinchZoomX: true,
//   //     })
//   //   );

//     useEffect(() => {
//     // let root = am5.Root.new(chartRef.current);
//     let root = am5.Root.new("chartdiv");
    

//     root.setThemes([am5themes_Animated.new(root)]);

//     let chart = root.container.children.push(
//       am5xy.XYChart.new(root, {
//         panX: true,
//         panY: true,
//         wheelX: 'panX',
//         wheelY: 'zoomX',
//         pinchZoomX: true, 
//       })
//     );

//     let xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         categoryField: 'timestamp',
//         renderer: am5xy.AxisRendererX.new(root, {
//           // labels: {
//           //   fill: am5.color(0xffffff), // Set x-axis labels to white
//           // },
//           // grid: {
//           //   stroke: am5.color(0xffffff), // Optional: Set x-axis grid lines to white
//           // }
//         }),
//         tooltip: am5.Tooltip.new(root, {
//           // label: {
//           //   fill: am5.color(0xffffff), // Set x-axis tooltip labels to white
//           // }
//         }),
//       })
//     );

//     const xRenderer = xAxis.get("renderer");
//     xRenderer.labels.template.setAll({
//       fill: am5.color(0xffffff),
//       fontSize: "12px",
//     });

//     let yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {
//             opposite: true,
//           // labels: {
//           //   fill: am5.color(0xffffff), // Set y-axis labels to white
//           // },
//           // grid: {
//           //   stroke: am5.color(0xffffff), // Optional: Set y-axis grid lines to white
//           // }
//         }),
//       })
//     );

//     const yRenderer = yAxis.get("renderer");
//     yRenderer.labels.template.setAll({
//       fill: am5.color(0xffffff),
//       fontSize: "12px",
//     });


//     let series = chart.series.push(
//       am5xy.LineSeries.new(root, {
//         name: 'Funding',
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: 'funding',
//         categoryXField: 'timestamp',
//         tooltip: am5.Tooltip.new(root, {
//           labelText: '{valueY}',
       
//           // label: {
//           //   fill: am5.color(0xffffff), // Set tooltip text to white
//           // }
//         }),
//       })
//     );

//     series.data.setAll(data);

//     series.bullets.push(() => {
//       return am5.Bullet.new(root, {
//         locationY: 0.5,
//         sprite: am5.Circle.new(root, {
//           radius: 2,
//           fill: series.get('fill'),
//         }),
//       });
//     });

//     // chart.set(
//     //   'scrollbarX',
//     //   am5.Scrollbar.new(root, {
//     //     orientation: 'horizontal',
//     //   })
//     // );

//     // let cursor = chart.set(
//     //   'cursor',
//     //   am5xy.XYCursor.new(root, {
//     //     behavior: 'zoomX',
//     //   })
//     // );

//     let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
//       behavior: 'zoomXY',
//       snapToSeries: [series], // Enable snapping to the series
//       xAxis: xAxis,
//       yAxis: yAxis,
//     }));
//     // cursor.lineY.set('visible', false);

//     cursor.lineX.setAll({
//       stroke: am5.color(0xFFFFFF),
//       strokeWidth: 2,
//       strokeDasharray: [4, 4],
//     });

//     // cursor.lineY.setAll({
//     //   stroke: am5.color(0xFFFFFF),
//     //   strokeWidth: 2,
//     //   strokeDasharray: [4, 4],
//     // });

    

//      // Add a red target line at value 0 on y-axis
//      let targetLine = chart.plotContainer.children.push(
//       am5.Line.new(root, {
//         position: "absolute",
//         layer: 5,
//         stroke: am5.color(0xff0000), // Red color
//         strokeWidth: 2,
//         strokeDasharray: [4, 4],
//         // x1: 0,
//         // x2: chart.plotContainer.width(),
//         y: yAxis.valueToPosition(0) * chart.plotContainer.height(),
//       })
//     );

//     yAxis.on("height", () => {
//       targetLine.set("y", yAxis.valueToPosition(0) * chart.plotContainer.height());
//     });
    
//     xAxis.data.setAll(data);

//     return () => {
//       root.dispose();
//     };
//   }, [data]);

//   return <div 
//   id= "chartdiv"
//   ref={chartRef} 
//   style={{ width: '100%', height: '500px' }}></div>;
// };

// export default HistoryChart;



// In HistoryChart.tsx
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect, useRef } from 'react';

interface FundingData {
  timestamp: string;
  funding: number;
}

interface HistoryChartProps {
  data: FundingData[];
  timeRange: string;
}

const HistoryChart = ({ data, timeRange }: HistoryChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) {
      console.error('Chart container not found.');
      return;
    }
    

    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: 'panX',
      wheelY: 'zoomX',
      pinchZoomX: true,
    }));

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
      baseInterval: { timeUnit: "hour", count: 1 }, // Set baseInterval to 1 day
    }));
    

    const xRenderer = xAxis.get("renderer");
    xRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: "12px",
    });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        opposite: true,
      }),
    }));

    const yRenderer = yAxis.get("renderer");
    yRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: "12px",
    });

    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: 'Funding',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'funding',
      valueXField: 'timestamp',
      // tooltip: am5.Tooltip.new(root, {
      //   labelText: "{valueX.formatDate()}: {valueY}",
      // }),
    }));

    series.setAll({
      tooltipText: "{valueX.formatDate('MMM dd, yyyy HH:mm')}: ${valueY}",
      tooltip: am5.Tooltip.new(root, {
        getFillFromSprite: false,
        getStrokeFromSprite: false,
        autoTextColor: false,
        pointerOrientation: "horizontal",
        labelText: "{tooltipText}"
      })
    });
    
    // Customize tooltip appearance
    const tooltip = series.get("tooltip");
    if (tooltip) {
      const background = tooltip.get("background");
      if (background) {
        background.setAll({
          fill: am5.color(0x000000),
          fillOpacity: 0.8,
          stroke: am5.color(0xffffff),
          strokeOpacity: 0.5
        });
      }
    
    //   const label = tooltip.get("label");
    //   if (label) {
    //     label.setAll({
    //       fill: am5.color(0xffffff),
    //       fontSize: 12
    //     });
    //   }
    }


    // Custom timestamp parser
    console.log('incoming data:',data)
    const parseTimestamp = (timestampStr: string): Date => {
      // Split the string to isolate the date and time components
      const [monthDayTime, hourMinute] = timestampStr.split('|');
      const [month, day] = monthDayTime.split(' ');
      const [hour, minute] = hourMinute.split(':');
    
      // Convert the month abbreviation to a number (0-indexed)
      const monthNumber = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month) + 1;
    
      // Construct a new Date object using the extracted month, day, and time
      return new Date(new Date().getFullYear(), monthNumber - 1, parseInt(day), parseInt(hour), parseInt(minute));
    };
    // Process data
    const processedData = data.map(item => ({
      timestamp: parseTimestamp(item.timestamp).getTime(),
      funding: item.funding,
    }));

    series.data.setAll(processedData);

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationY: 0.5,
        sprite: am5.Circle.new(root, {
          radius: 2,
          fill: series.get('fill'),
        }),
      });
    });

    return () => {
      root.dispose();
    };
  }, [data, timeRange]);

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default HistoryChart;

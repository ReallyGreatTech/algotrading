// MyChart.js
import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

function MyChart() {
  // useLayoutEffect(() => {
  //   let root = am5.Root.new('chartdiv');

  //   root.setThemes([am5themes_Animated.new(root)]);

  //   let chart = root.container.children.push(
  //     am5xy.XYChart.new(root, {
  //       panX: true,
  //       panY: true,
  //       wheelX: 'panX',
  //       wheelY: 'zoomX',
  //       pinchZoomX: true,
  //     })
  //   );

  //   let xAxis = chart.xAxes.push(
  //     am5xy.CategoryAxis.new(root, {
  //       categoryField: 'category',
  //       renderer: am5xy.AxisRendererX.new(root, {}),
  //     })
  //   );

  //   let yAxis = chart.yAxes.push(
  //     am5xy.ValueAxis.new(root, {
  //       renderer: am5xy.AxisRendererY.new(root, {}),
  //     })
  //   );

  //   let series = chart.series.push(
  //     am5xy.LineSeries.new(root, {
  //       name: 'Series',
  //       xAxis: xAxis,
  //       yAxis: yAxis,
  //       valueYField: 'value',
  //       categoryXField: 'category',
  //     })
  //   );

  //   series.data.setAll([
  //     { category: 'A', value: 10 },
  //     { category: 'B', value: 20 },
  //     { category: 'C', value: 30 },
  //   ]);

  //   chart.set('cursor', am5xy.XYCursor.new(root, {}));

  //   return () => {
  //     root.dispose();
  //   };
  // }, []);

  useLayoutEffect(() => {
    console.log('Setting up chart...');
    let root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'category',
      })
    );

    series.data.setAll([
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'C', value: 30 },
    ]);

    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
}

export default MyChart;

// MyChart.js
// import React, { useLayoutEffect } from 'react';
// import * as am5 from '@amcharts/amcharts5';
// import * as am5xy from '@amcharts/amcharts5/xy';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// function MyChart() {
//   useLayoutEffect(() => {
//     const root = am5.Root.new('chartdiv');

//     root.setThemes([am5themes_Animated.new(root)]);

//     const chart = root.container.children.push(
//       am5xy.XYChart.new(root, {
//         panX: true,
//         panY: true,
//         wheelX: 'panX',
//         wheelY: 'zoomY',
//         pinchZoomX: true,
//       })
//     );

//     let xAxes = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         categoryField: 'Category',
//         renderer: am5xy.AxisRendererX.new(root, {}),
//       })
//     );

//     let yAxes = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {}),
//       })
//     );

//     const series = chart.series.push(
//       am5xy.LineSeries.new(root, {
//         name: 'Line Series',
//         xAxis: xAxes,
//         yAxis: yAxes,
//         categoryXField: 'category',
//         valueYField: 'value',
//       })
//     );

//     series.data.setAll([
//       { category: 'A', value: 10 },
//       { category: 'B', value: 20 },
//       { category: 'C', value: 30 },
//     ]);

//     chart.set('cursor', am5xy.XYCursor.new(root, {}));

//     return () => {
//       root.dispose();
//     };
//   }, []);
//   return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
// }

// export default MyChart;

//create the base container
//add a root container
//Make the root container animatible
//Add a chart container
//Add the x-axis
//Add the y-axis
//set the data

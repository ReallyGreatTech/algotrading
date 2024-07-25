import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useRef } from "react";

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
      console.error("Chart container not found.");
      return;
    }

    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
        baseInterval: { timeUnit: "hour", count: 1 },
      })
    );

    const xRenderer = xAxis.get("renderer");
    xRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: "12px",
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: true,
        }),
      })
    );

    const yRenderer = yAxis.get("renderer");
    yRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: "12px",
    });

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Funding",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "funding",
        valueXField: "timestamp",
        tooltip: am5.Tooltip.new(root, {
          getFillFromSprite: false,
          getStrokeFromSprite: false,
          autoTextColor: false,
          pointerOrientation: "horizontal",
          labelText: "{valueX.formatDate()}: ${valueY}",
        }),
      })
    );

    const tooltip = series.get("tooltip");
    if (tooltip) {
      const background = tooltip.get("background");
      if (background) {
        background.setAll({
          fill: am5.color(0x000000),
          fillOpacity: 0.8,
          stroke: am5.color(0xffffff),
          strokeOpacity: 0.5,
        });
      }
    }

    const parseTimestamp = (timestampStr: string): Date => {
      const [monthDayTime, hourMinute] = timestampStr.split("|");
      const [month, day] = monthDayTime.split(" ");
      const [hour, minute] = hourMinute.split(":");
      const monthNumber =
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].indexOf(month) + 1;

      return new Date(
        new Date().getFullYear(),
        monthNumber - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      );
    };

    const processedData = data.map((item) => ({
      timestamp: parseTimestamp(item.timestamp).getTime(),
      funding: item.funding,
    }));

    series.data.setAll(processedData);

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationY: 0.5,
        sprite: am5.Circle.new(root, {
          radius: 2,
          fill: series.get("fill"),
          tooltipText: "{valueX.formatDate('MMM dd, yyyy HH:mm')}: ${valueY}",
        }),
      });
    });

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "zoomX",
        snapToSeries: [series],
      })
    );

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, timeRange]);

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default HistoryChart;

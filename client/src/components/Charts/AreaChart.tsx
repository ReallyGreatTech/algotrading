import { CSSProperties, useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';

interface DataItem {
  value: number;
  date: number;
}

interface ChartsProps {
  id: string;
  data: DataItem[];
  timeUnit: TimeUnit;
  containerStyle?: CSSProperties;
}

const AreaChart = ({
  data,
  timeUnit: dateUnit = 'day',
  id,
  containerStyle,
}: ChartsProps) => {
  useLayoutEffect(() => {
    const root = am5.Root.new(id);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: {
          timeUnit: dateUnit,
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 80,
          minorGridEnabled: true,
          pan: 'zoom',
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const xAxisRender = xAxis.get('renderer');
    xAxisRender.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: '12px',
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,

        renderer: am5xy.AxisRendererY.new(root, {
          pan: 'zoom',
        }),
      })
    );

    const yRenderer = yAxis.get('renderer');
    yRenderer.labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: '12px',
    });

    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0x6366f1),
        // tooltip: seriesToolTip,
      })
    );

    const tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      getLabelFillFromSprite: false,
      labelText: '{valueY}',
    });

    tooltip?.get('background')?.setAll({
      fill: am5.color(0xdddddd),
      fillOpacity: 0.8,
      strokeOpacity: 0,
    });

    tooltip.label.setAll({
      fill: am5.color(0xffffff),
    });

    series.set('tooltip', tooltip);

    series.fills.template.setAll({
      fillOpacity: 0.3,
      // fillGradient: am5.LinearGradient.new(root, {
      //   stops: [
      //     {
      //       color: am5.color(0x6366f1),
      //     },
      //     {
      //       color: am5.color(0x334154),
      //     },
      //   ],
      // }),
      // visible: true,
    });

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.data.setAll(data);

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      id={id}
      className="px-2"
      style={{ width: '100%', height: '500px', ...containerStyle }}
    ></div>
  );
};

export default AreaChart;

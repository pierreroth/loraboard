import { GraphView } from './graph_view';

const PRESSURE_COLOR = '#f5d304';
const INITIAL_PRESSURES = [800, 800, 800, 800, 800, 800, 800, 800];
const MAX_PRESSURE = 1100;
const MIN_PRESSURE = 800;

export class PressureGraphView extends GraphView {

  constructor(options, ...extras) {
    super(options, ...extras);
    this.initializeGraph();
  }

  initChart() {
    return c3.generate({
      bindto: `#${this.id}`,
      data: {
        columns: [
          ['pressure', ...INITIAL_PRESSURES],
        ],
        type: 'area-spline',
        colors: {
          pressure: PRESSURE_COLOR,
        },
      },
      axis: {
        y: {
          label: 'pressure (hPa)',
          max: MAX_PRESSURE,
          min: MIN_PRESSURE,
        },
      },
    });
  }

  updateChartData() {
    this.chart.flow({
      columns: [
            ['pressure', this.model.attributes.value],
      ],
    });
  }
}

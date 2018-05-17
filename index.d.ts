import { ScaleBand, ScaleLinear, ScaleLogarithmic, ScalePower, ScaleTime } from 'd3-scale';
import { CurveFactory, Series } from 'd3-shape';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  CommonPathProps,
  LinearGradientProps,
  LineProps,
  PathProps,
  RadialGradientProps,
  TextProps
} from 'react-native-svg';

type ScaleType = ScaleLinear | ScaleLogarithmic | ScalePower;
type AccessorFunction<T, U> = (props: { item: T, index: number }) => U;
type SortFunction<T> = (a: T, b: T) => number;
type OffsetFunction = (series: Series<any, any>, order: number[]) => void;
type OrderFunction = (series: Series<any, any>) => number[];

// Chart

export interface ChartProps<T> {
  data: T[];
  style: StyleProp<ViewStyle>;
  animate?: boolean;
  animationDuration?: number;
  svg?: PathProps;
  width?: number;
  height?: number;
  curve?: CurveFactory;
  contentInset?: {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
  };
  gridMin?: number;
  gridMax?: number;
  gridProps?: GridProps<T>;
  numberOfTicks?: number;
  xScale?: ScaleType;
  yScale?: ScaleType;
  xAccessor?: AccessorFunction<T, number>;
  yAccessor?: AccessorFunction<T, number>;
}

class Chart<Props extends ChartProps<T>, T={}> extends React.PureComponent<Props> {
  createPaths(): { path?: any, area?: any, line?: any };
}

// Line Chart

export class LineChart<T> extends Chart<ChartProps<T>> {
}

// Pie Chart

type PieChartData = {
  svg?: PathProps;
  key: string | number;
  value?: number;
  arc?: {
    outerRadius?: number | string;
    cornerRadius?: number | string;
  };
};

export interface PieChartProps<T extends PieChartData> extends ChartProps<T> {
  innerRadius?: number | string;
  outerRadius?: number | string;
  labelRadius?: number | string;
  padAngle?: number;
  sort?: SortFunction<T>;
  valueAccessor?: AccessorFunction<T, number>;
}

export class PieChart<T extends PieChartData> extends Chart<PieChartProps<T>> {
}

// Area Chart

export interface AreaChartProps<T> extends ChartProps<T> {
  start?: number;
}

export class AreaChart<T> extends Chart<AreaChartProps<T>> {
}

// Stacked Area Chart

export interface StackedAreaChartProps<T> extends ChartProps<T> {
  keys: (keyof T)[];
  colors: string[];
  offset?: OffsetFunction;
  order?: OrderFunction;
  renderGradient?: (props: {
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
    index: number,
    key: keyof T,
    color: string,
  }) => React.Component<LinearGradientProps | RadialGradientProps>;
  showGrid?: boolean;
  extras?: any[];
  renderDecorator?: () => {};
}

export class StackedAreaChart<T> extends Chart<StackedAreaChartProps<T>> {
  static extractDataPoints<T>(data: T[], keys: (keyof T)[], order?: OrderFunction, offset?: OffsetFunction): number[];

}

// Stacked Bar Chart

export interface StackedBarChartProps<T> extends ChartProps<T> {
  keys: (keyof T)[];
  colors: string[];
  offset?: OffsetFunction;
  order?: OrderFunction;
  strokeColor?: string;
  renderGradient: (props: { id: string }) => React.Component<LinearGradientProps | RadialGradientProps>;
  spacingInner?: number;
  spacingOuter?: number;
  showGrid?: boolean;
  extras?: any[];
  extra?: () => {};
}

export class StackedBarChart<T> extends Chart<StackedBarChartProps<T>> {
  static extractDataPoints<T>(data: T, keys: (keyof T)[], order?: OrderFunction, offset?: OffsetFunction);
}

// Bar Chart

export interface BarChartProps<T> extends ChartProps<T> {
  spacingInner?: number;
  spacingOuter?: number;
}

export class BarChart<T> extends Chart<BarChartProps<T>> {
  calcXScale(domain: any);

  calcYScale(domain: any);

  calcAreas(x: any, y: any);

  calcExtent();

  calcIndexes();
}

// XAxis

export interface AxisProps<T> {
  data: T[];
  spacingInner?: number;
  spacingOuter?: number;
  formatLabel?: (value: any, index: number) => number | string;
  scale?: ScaleLinear | ScaleTime | ScaleBand;
  numberOfTicks?: number;
  svg?: TextProps;
}

export interface XAxisProps<T> extends AxisProps<T> {
  contentInset?: {
    left?: number;
    right?: number
  };
  xAccessor?: AccessorFunction<T, any>;
}

export class XAxis<T> extends React.PureComponent<XAxisProps<T>> {
}

// YAxis

export interface YAxisProps<T> extends AxisProps<T> {
  contentInset?: {
    top?: number;
    bottom?: number;
  };
  min?: number;
  max?: number;
  yAccessor?: AccessorFunction<T, any>;
}

export class YAxis<T> extends React.PureComponent<YAxisProps<T>> {
}

// Progress Circle

export interface ProgressCircleProps {
  progress: number;
  style?: StyleProp<ViewStyle>;
  progressColor?: string;
  backgroundColor?: string;
  strokeWidth?: number;
  startAngle?: number;
  endAngle?: number;
  animate?: boolean;
  animateDuration?: number;
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
}

// Horizontal Line

export interface HorizontalLineProps {
  stroke: string;
}

class HorizontalLine extends React.Component<HorizontalLineProps> {

}

// Point

export interface PointProps {
  x: (index: number) => number;
  y: (value: number) => number;
  value?: number;
  radius?: number;
  index?: number;
  color: string;
}

class Point extends React.Component<PointProps> {

}

// Tooltip

export interface TooltipProps {
  x: (index: number) => number;
  y: (value: number) => number;
  value?: number;
  index?: number;
  height?: number;
  stroke?: string;
  text: string;
  pointStroke?: string;
}

class Tooltip extends React.Component<TooltipProps> {

}

declare const Decorators = {
  HorizontalLine,
  Tooltip,
  Point,
};

type GridDirection = 'VERTICAL' | 'HORIZONTAL' | 'BOTH';

export interface GridProps<T> {
  direction?: GridDirection;
  belowChart?: boolean;
  svg?: LineProps;
  ticks?: T[];
  x?: (t: T) => number;
  y?: (t: T) => number;
}

// Export as Component despite it's SFC.
export class Grid<T> extends React.Component<GridProps<T>> {
  static Direction: {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    BOTH: 'BOTH',
  };
}

export interface AnimatedPathProps extends CommonPathProps {
  animated?: boolean;
  animationDuration?: number;
  renderPlaceholder?: Function;
}

export class Path extends React.Component<AnimatedPathProps> {
}

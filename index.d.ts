import { ScaleBand, ScaleLinear, ScaleLogarithmic, ScalePower, ScaleTime } from 'd3-scale';
import { CurveFactory } from 'd3-shape';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CommonPathProps, SvgProps } from 'react-native-svg';

type ScaleType = ScaleLinear | ScaleLogarithmic | ScalePower;
type AccessorFunction<T, U> = (props: { item: T, index: number }) => U;
type SortFunction<T> = (a: T, b: T) => number;

// Chart

export interface ChartProps<T> {
  data: T[];
  style: StyleProp<ViewStyle>;
  animate?: boolean;
  animationDuration?: number;
  svg?: SvgProps;
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
  gridProps?: {}; // @TODO Add details
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
  svg?: SvgProps;
  key: string | number;
  value?: number;
  arc?: {}; // @TODO Add details
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
  keys: string[];
  colors: string[];
  offset?: Function; // @TODO Add details
  order?: Function; // @TODO Add details
  renderGradient?: Function; // @TODO Add details
  showGrid?: boolean;
  extras?: any[]; // @TODO Add details
  renderDecorator?: Function; // @TODO Add details
}

export class StackedAreaChart<T> extends Chart<StackedAreaChartProps<T>> {
  static extractDataPoints<T>(data: T[], keys: string[], order: Function, offset: Function): number[];

}

// Stacked Bar Chart

export interface StackedBarChartProps<T> extends ChartProps<T> {
  keys: string[];
  colors: string[];
  offset?: Function; // @TODO Add details
  order?: Function; // @TODO Add details
  strokeColor?: string;
  renderGradient: Function; // @TODO Add details
  spacingInner?: number;
  spacingOuter?: number;
  showGrid?: boolean;
  extras?: any[];
  extra?: Function; // @TODO Add details
}

export class StackedBarChart<T> extends Chart<StackedBarChartProps<T>> {

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
  labelStyle?: StyleProp<ViewStyle>;
  spacingInner?: number;
  spacingOuter?: number;
  formatLabel: Function; // @TODO Add details
  scale?: ScaleLinear | ScaleTime | ScaleBand;
  numberOfTicks?: number;
  svg?: SvgProps;
}

export interface XAxisProps<T> extends AxisProps<T> {
  contentInset?: {
    left?: number;
    right?: number
  };
  xAccessor?: AccessorFunction<T, string | number>;
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
  yAccessor?: AccessorFunction<T, string | number>;
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
  x: Function; // @TODO Add details
  y: Function; // @TODO Add details
  value?: number;
  radius?: number;
  index?: number;
  color: string;
}

class Point extends React.Component<PointProps> {

}

// Tooltip

export interface TooltipProps {
  x: Function; // @TODO Add details
  y: Function; // @TODO Add details
  value?: number;
  index?: number;
  height?: number;
  stroke?: string;
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
  belowChart?: bool;
  svg?: SvgProps;
  ticks?: T[]; // @TODO Add details
  x?: (t: T) => number;
  y?: (t: T) => number;
}

declare const Grid: React.SFC<GridProps<T>>;
Grid.Direction = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL',
  BOTH: 'BOTH',
};

export interface AnimatedPathProps extends CommonPathProps {
  animated?: boolean;
  animationDuration?: number;
  renderPlaceholder?: Function;
}

export class Path extends React.Component<AnimatedPathProps> {
}

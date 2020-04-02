var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _propTypes=_interopRequireDefault(require("prop-types"));var array=_interopRequireWildcard(require("d3-array"));var scale=_interopRequireWildcard(require("d3-scale"));var shape=_interopRequireWildcard(require("d3-shape"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _reactNativeSvg=require("react-native-svg");var _animatedPath=_interopRequireDefault(require("./animated-path"));var _jsxFileName="/Users/jb/code/react-native-svg-charts/src/stacked-area-chart.js";function _createSuper(Derived){return function(){var Super=(0,_getPrototypeOf2.default)(Derived),result;if(_isNativeReflectConstruct()){var NewTarget=(0,_getPrototypeOf2.default)(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2.default)(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}var AreaStack=function(_PureComponent){(0,_inherits2.default)(AreaStack,_PureComponent);var _super=_createSuper(AreaStack);function AreaStack(){var _this;(0,_classCallCheck2.default)(this,AreaStack);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_super.call.apply(_super,[this].concat(args));(0,_defineProperty2.default)((0,_assertThisInitialized2.default)(_this),"state",{height:0,width:0});return _this;}(0,_createClass2.default)(AreaStack,[{key:"_onLayout",value:function _onLayout(event){var _event$nativeEvent$la=event.nativeEvent.layout,height=_event$nativeEvent$la.height,width=_event$nativeEvent$la.width;this.setState({height:height,width:width});}},{key:"render",value:function render(){var _this2=this;var _this$props=this.props,data=_this$props.data,keys=_this$props.keys,colors=_this$props.colors,animate=_this$props.animate,animationDuration=_this$props.animationDuration,style=_this$props.style,curve=_this$props.curve,numberOfTicks=_this$props.numberOfTicks,_this$props$contentIn=_this$props.contentInset,_this$props$contentIn2=_this$props$contentIn.top,top=_this$props$contentIn2===void 0?0:_this$props$contentIn2,_this$props$contentIn3=_this$props$contentIn.bottom,bottom=_this$props$contentIn3===void 0?0:_this$props$contentIn3,_this$props$contentIn4=_this$props$contentIn.left,left=_this$props$contentIn4===void 0?0:_this$props$contentIn4,_this$props$contentIn5=_this$props$contentIn.right,right=_this$props$contentIn5===void 0?0:_this$props$contentIn5,gridMin=_this$props.gridMin,gridMax=_this$props.gridMax,children=_this$props.children,offset=_this$props.offset,order=_this$props.order,svgs=_this$props.svgs,xAccessor=_this$props.xAccessor,xScale=_this$props.xScale,clampY=_this$props.clampY,clampX=_this$props.clampX;var _this$state=this.state,height=_this$state.height,width=_this$state.width;if(data.length===0){return _react.default.createElement(_reactNative.View,{style:style,__source:{fileName:_jsxFileName,lineNumber:63,columnNumber:14}});}var series=shape.stack().keys(keys).order(order).offset(offset)(data);var yValues=array.merge(array.merge(series));var xValues=data.map(function(item,index){return xAccessor({item:item,index:index});});var yExtent=array.extent([].concat((0,_toConsumableArray2.default)(yValues),[gridMin,gridMax]));var xExtent=array.extent(xValues);var _this$props2=this.props,_this$props2$yMin=_this$props2.yMin,yMin=_this$props2$yMin===void 0?yExtent[0]:_this$props2$yMin,_this$props2$yMax=_this$props2.yMax,yMax=_this$props2$yMax===void 0?yExtent[1]:_this$props2$yMax,_this$props2$xMin=_this$props2.xMin,xMin=_this$props2$xMin===void 0?xExtent[0]:_this$props2$xMin,_this$props2$xMax=_this$props2.xMax,xMax=_this$props2$xMax===void 0?xExtent[1]:_this$props2$xMax;var y=scale.scaleLinear().domain([yMin,yMax]).range([height-bottom,top]).clamp(clampY);var x=xScale().domain([xMin,xMax]).range([left,width-right]).clamp(clampX);var ticks=y.ticks(numberOfTicks);var areas=series.map(function(serie,index){var path=shape.area().x(function(d,idx){return x(xAccessor({item:d.data,idx:idx}));}).y0(function(d){return y(d[0]);}).y1(function(d){return y(d[1]);}).curve(curve)(data.map(function(_,idx){return serie[idx];}));return{path:path,key:keys[index],color:colors[index]};});var extraProps={x:x,y:y,width:width,height:height,ticks:ticks};return _react.default.createElement(_reactNative.View,{style:style,__source:{fileName:_jsxFileName,lineNumber:120,columnNumber:7}},_react.default.createElement(_reactNative.View,{style:{flex:1},onLayout:function onLayout(event){return _this2._onLayout(event);},__source:{fileName:_jsxFileName,lineNumber:121,columnNumber:9}},height>0&&width>0&&_react.default.createElement(_reactNativeSvg.Svg,{style:{height:height,width:width},__source:{fileName:_jsxFileName,lineNumber:123,columnNumber:13}},_react.default.Children.map(children,function(child){if(child&&child.props.belowChart){return _react.default.cloneElement(child,extraProps);}return null;}),areas.map(function(area,index){return _react.default.createElement(_animatedPath.default,(0,_extends2.default)({key:area.key,fill:area.color},svgs[index],{animate:animate,animationDuration:animationDuration,d:area.path,__source:{fileName:_jsxFileName,lineNumber:131,columnNumber:17}}));}),_react.default.Children.map(children,function(child){if(child&&!child.props.belowChart){return _react.default.cloneElement(child,extraProps);}return null;}))));}}],[{key:"extractDataPoints",value:function extractDataPoints(data,keys){var order=arguments.length>2&&arguments[2]!==undefined?arguments[2]:shape.stackOrderNone;var offset=arguments.length>3&&arguments[3]!==undefined?arguments[3]:shape.stackOffsetNone;var series=shape.stack().keys(keys).order(order).offset(offset)(data);return array.merge(array.merge(series));}}]);return AreaStack;}(_react.PureComponent);AreaStack.propTypes={data:_propTypes.default.arrayOf(_propTypes.default.object).isRequired,keys:_propTypes.default.arrayOf(_propTypes.default.string).isRequired,colors:_propTypes.default.arrayOf(_propTypes.default.string).isRequired,svgs:_propTypes.default.arrayOf(_propTypes.default.object),offset:_propTypes.default.func,order:_propTypes.default.func,style:_propTypes.default.any,animate:_propTypes.default.bool,animationDuration:_propTypes.default.number,contentInset:_propTypes.default.shape({top:_propTypes.default.number,left:_propTypes.default.number,right:_propTypes.default.number,bottom:_propTypes.default.number}),numberOfTicks:_propTypes.default.number,showGrid:_propTypes.default.bool,xScale:_propTypes.default.func,xAccessor:_propTypes.default.func,yMin:_propTypes.default.any,yMax:_propTypes.default.any,xMin:_propTypes.default.any,xMax:_propTypes.default.any,clampX:_propTypes.default.bool,clampY:_propTypes.default.bool};AreaStack.defaultProps={curve:shape.curveLinear,offset:shape.stackOffsetNone,order:shape.stackOrderNone,svgs:[],strokeWidth:2,contentInset:{},numberOfTicks:10,showGrid:true,xScale:scale.scaleLinear,xAccessor:function xAccessor(_ref){var index=_ref.index;return index;}};var _default=AreaStack;exports.default=_default;
//# sourceMappingURL=stacked-area-chart.js.map
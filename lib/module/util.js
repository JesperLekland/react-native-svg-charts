var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.Constants=void 0;var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _propTypes=_interopRequireDefault(require("prop-types"));var util={sortDescending:function sortDescending(_array){var array=(0,_toConsumableArray2.default)(_array);return array.sort(function(a,b){if(a>b){return-1;}if(b>a){return 1;}return 0;});}};var Constants={gridStyle:{position:'absolute',left:0,right:0,height:0.5,backgroundColor:'rgba(0,0,0,0.2)'},commonProps:{svg:_propTypes.default.object,shadowSvg:_propTypes.default.object,shadowWidth:_propTypes.default.number,shadowOffset:_propTypes.default.number,style:_propTypes.default.any,animate:_propTypes.default.bool,animationDuration:_propTypes.default.number,curve:_propTypes.default.func,contentInset:_propTypes.default.shape({top:_propTypes.default.number,left:_propTypes.default.number,right:_propTypes.default.number,bottom:_propTypes.default.number}),numberOfTicks:_propTypes.default.number,renderGradient:_propTypes.default.func,gridMin:_propTypes.default.number,gridMax:_propTypes.default.number,showGrid:_propTypes.default.bool,gridProps:_propTypes.default.object},commonDefaultProps:{strokeColor:'#22B6B0',strokeWidth:2,contentInset:{},numberOfTicks:10,showGrid:true,gridMin:0,gridMax:0,gridStroke:'rgba(0,0,0,0.2)',gridWidth:0.5}};exports.Constants=Constants;var _default=util;exports.default=_default;
//# sourceMappingURL=util.js.map
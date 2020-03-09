import PropTypes from 'prop-types'
import React from 'react'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

const Tooltip = ({ x, y, value, index, height, text, stroke, pointStroke }) => {
    return React.createElement(
        G,
        null,
        React.createElement(Line, {
            x1: x(index),
            y1: height,
            x2: x(index),
            y2: 20,
            stroke: stroke,
        }),
        React.createElement(Circle, {
            cx: x(index),
            cy: y(value),
            r: 4,
            stroke: pointStroke,
            strokeWidth: 2,
            fill: 'white',
        }),
        React.createElement(
            G,
            {
                x: x(index) < 40 ? 40 : x(index),
                y: 10,
            },
            React.createElement(Rect, {
                x: -40,
                y: 1,
                width: 80,
                height: 20,
                fill: 'rgba(0, 0, 0, 0.2)',
                rx: 2,
                ry: 2,
            }),
            React.createElement(Rect, {
                x: -40,
                y: 0,
                width: 80,
                height: 20,
                fill: 'white',
                rx: 2,
                ry: 2,
            }),
            React.createElement(
                Text,
                {
                    fontSize: '12',
                    textAnchor: 'middle',
                },
                text
            )
        )
    )
}

Tooltip.propTypes = {
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired,
    value: PropTypes.number,
    index: PropTypes.number,
    height: PropTypes.number,
    stroke: PropTypes.string,
    pointStroke: PropTypes.string,
    text: PropTypes.string,
}
export default Tooltip
//# sourceMappingURL=tooltip.js.map

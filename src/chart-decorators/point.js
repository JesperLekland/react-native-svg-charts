import PropTypes from 'prop-types'
import React from 'react'
import { Circle } from 'react-native-svg'

const Point = ({ x, y, value, index, radius, color }) => {
    if (isNaN(value)) {
        return <Circle />
    }

    return <Circle cx={x(index)} cy={y(value)} r={radius} stroke={color} fill={'white'} />
}

Point.propTypes = {
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired,
    value: PropTypes.number,
    radius: PropTypes.number,
    index: PropTypes.number,
    color: PropTypes.string,
}

Point.defaultProps = {
    radius: 4,
    color: 'black',
}

export default Point

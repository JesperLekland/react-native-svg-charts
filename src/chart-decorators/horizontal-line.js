import React from 'react'
import { Line } from 'react-native-svg'

class HorizontalLine extends React.Component {
    render() {
        const { y, value, ...other } = this.props
        return <Line x1={'0%'} x2={'100%'} y1={y(value)} y2={y(value)} {...other} />
    }
}

HorizontalLine.defaultProps = {
    stroke: 'black',
}

export default HorizontalLine

import React from 'react'
import PropTypes from 'prop-types'
import { G, Line } from 'react-native-svg'

const Horizontal = ({ ticks = [], y, gridProps = {} }) => {
    return (
        <G>
            {
                ticks.map(tick => (
                    <Line
                        key={ tick }
                        x1={ '0%' }
                        x2={ '100%' }
                        y1={ y(tick) }
                        y2={ y(tick) }
                        strokeWidth={ 1 }
                        stroke={ 'rgba(0,0,0,0.2)' }
                        { ...gridProps }
                    />
                ))

            }
        </G>
    )
}

const Vertical = ({ dataPoints = [], x, gridProps = {} }) => {
    return (
        <G>
            {
                dataPoints.map((_, index) => (
                    <Line
                        key={ index }
                        y1={ '0%' }
                        y2={ '100%' }
                        x1={ x(index) }
                        x2={ x(index) }
                        strokeWidth={ 1 }
                        stroke={ 'rgba(0,0,0,0.2)' }
                        { ...gridProps }
                    />
                ))

            }
        </G>
    )
}

const Both = (props) => {
    return (
        <G>
            <Horizontal { ...props }/>
            <Vertical { ...props }/>
        </G>
    )
}

Vertical.propTypes = {
    x: PropTypes.func.isRequired,
    dataPoints: PropTypes.array.isRequired,
    gridProps: PropTypes.object,
}

Horizontal.propTypes = {
    y: PropTypes.func.isRequired,
    ticks: PropTypes.array.isRequired,
    gridProps: PropTypes.object,
}

Both.propTypes = {
    ...Vertical.propTypes,
    ...Horizontal.propTypes,
}

export default Horizontal

export {
    Horizontal,
    Vertical,
    Both,
}

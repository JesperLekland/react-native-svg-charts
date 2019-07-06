import PropTypes from 'prop-types'

const util = {
    sortDescending(_array) {
        const array = [..._array]
        return array.sort((a, b) => {
            if (a > b) {
                return -1
            }
            if (b > a) {
                return 1
            }
            return 0
        })
    },
}

export const Constants = {
    gridStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    commonProps: {
        svg: PropTypes.object,
        shadowSvg: PropTypes.object,
        shadowWidth: PropTypes.number,
        shadowOffset: PropTypes.number,

        style: PropTypes.any,

        animate: PropTypes.bool,
        animationDuration: PropTypes.number,

        curve: PropTypes.func,
        contentInset: PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
        }),
        numberOfTicks: PropTypes.number,

        renderGradient: PropTypes.func,

        gridMin: PropTypes.number,
        gridMax: PropTypes.number,
        showGrid: PropTypes.bool,
        gridProps: PropTypes.object,
    },
    commonDefaultProps: {
        strokeColor: '#22B6B0',
        strokeWidth: 2,
        contentInset: {},
        numberOfTicks: 10,
        showGrid: true,
        gridMin: 0,
        gridMax: 0,
        gridStroke: 'rgba(0,0,0,0.2)',
        gridWidth: 0.5,
    },
}

export default util

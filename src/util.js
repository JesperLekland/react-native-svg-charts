const util = {

    sortDescending(_array) {
        const array = [ ..._array ]
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
}

export default util

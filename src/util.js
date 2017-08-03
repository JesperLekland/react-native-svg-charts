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

export default util

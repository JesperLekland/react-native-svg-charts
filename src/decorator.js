import React from 'react'
import { G } from 'react-native-svg'

const Decorator = ({ children, data, ...props }) => {
    return (
        <G>
            {
                React.Children.map(children, child => {
                    return child ? data.map((value, index) => React.cloneElement(child, { value, index, ...props })) : null
                })
            }
        </G>
    )
}

export default Decorator

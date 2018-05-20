import React from 'react'
import { G } from 'react-native-svg'

const Extra = ({ children, ...props }) => {
    return (
        <G>
            {
                React.Children.map(children, child => {
                    return child ? React.cloneElement(child, props) : null
                })
            }
        </G>
    )
}

export default Extra

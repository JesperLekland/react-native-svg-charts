import React from 'react'
import { SafeAreaView, View } from 'react-native'

const ShowcaseCard = ({ children }) => (
    <SafeAreaView>
        <View style={{
            margin: 16,
            paddingHorizontal: 16,
            backgroundColor: 'white',
            shadowOffset: {
                height: 2,
                width: 2,
            },
            elevation: 4,
            shadowColor: 'black',
            shadowOpacity: 0.5,
        }}>
            {children}
        </View>
    </SafeAreaView>
)

export default ShowcaseCard

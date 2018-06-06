import React from 'react'
import { storiesOf } from '@storybook/react-native'

import YMinMax from './y-min-max'
import LayeredChart from './layered-charts'
import ShowcaseCard from '../showcase-card'

storiesOf('Others', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('YMinMax', () => <YMinMax/>)
    .add('Layered chart', () => <LayeredChart/>)

import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ScaleLinear from './scale-linear'
import ScaleTime from './scale-time'
import ScaleBand from './scale-band'
import WithComplexData from './data-object'
import ShowcaseCard from '../showcase-card'

storiesOf('XAxis', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Scale linear', () => <ScaleLinear/>)
    .add('Scale time', () => <ScaleTime/>)
    .add('Scale band', () => <ScaleBand/>)
    .add('With complex data', () => <WithComplexData/>)

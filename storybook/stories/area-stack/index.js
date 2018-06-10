import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Regular from './standard'
import WithTimeScale from './with-time-scale'
import WithGradient from './with-gradient'
import WithYAxis from './with-y-axis'
import ShowcaseCard from '../showcase-card'

storiesOf('StackedAreaChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Regular/>)
    .add('With time scale', () => <WithTimeScale/>)
    .add('With y axis', () => <WithYAxis/>)
    .add('With gradient', () => <WithGradient/>)

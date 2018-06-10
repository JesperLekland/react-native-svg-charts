import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Standard from './standard'
import WithCenteredText from './with-center-text'
import Gauge from './gauge'
import ShowcaseCard from '../showcase-card'

storiesOf('ProgressCircle', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Standard/>)
    .add('Gauge', () => <Gauge/>)
    .add('With centered text', () => <WithCenteredText/>)

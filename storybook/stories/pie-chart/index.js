import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Standard from './standard'
import WithCenteredText from './with-center-text'
import WithLabels from './with-labels'
import ShowcaseCard from '../showcase-card'

storiesOf('PieChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Standard/>)
    .add('With centered text', () => <WithCenteredText/>)
    .add('With labels', () => <WithLabels/>)

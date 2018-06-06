import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Standard from './standard'
import ShowcaseCard from '../showcase-card'

storiesOf('YAxis', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Standard/>)

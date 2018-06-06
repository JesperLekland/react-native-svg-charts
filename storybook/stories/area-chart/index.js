import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Regular from './standard'
import Partial from './partial'
import WithGradient from './with-gradient'
import ShowcaseCard from '../showcase-card'

storiesOf('AreaChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Regular/>)
    .add('Partial', () => <Partial/>)
    .add('With gradient', () => <WithGradient/>)

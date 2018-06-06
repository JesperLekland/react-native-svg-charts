import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Standard from './standard'
import Horizontal from './horizontal'
import WithOnPress from './with-on-press'
import ShowcaseCard from '../showcase-card'

storiesOf('BarStack', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Standard/>)
    .add('Horizontal', () => <Horizontal/>)
    .add('With onPress', () => <WithOnPress/>)

import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Standard from './standard'
import Horizontal from './horizontal'
import Grouped from './grouped'
import GroupedHorizontal from './horizontal-grouped'
import WithGradient from './with-gradient'
import ShowcaseCard from '../showcase-card'

storiesOf('BarChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Standard/>)
    .add('Grouped', () => <Grouped/>)
    .add('Horizontal', () => <Horizontal/>)
    .add('Horizontal - grouped', () => <GroupedHorizontal/>)
    .add('With gradient', () => <WithGradient/>)

import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Grid from './custom-grid'
import Decorator1 from './decorator-1'
import Decorator2 from './decorator-2'
import GradientArea from './gradient-area'
import GradientLine from './gradient-line'
import GradientBar from './gradient-bar'
import ShowcaseCard from '../showcase-card'

storiesOf('Decorators', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Custom grid', () => <Grid/>)
    .add('1', () => <Decorator1/>)
    .add('2', () => <Decorator2/>)
    .add('Gradient area', () => <GradientArea/>)
    .add('Gradient line', () => <GradientLine/>)
    .add('Gradient bar', () => <GradientBar/>)


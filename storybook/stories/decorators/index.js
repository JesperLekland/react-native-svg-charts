import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Grid from './custom-grid'
import Decorator1 from './decorator-1'
import Decorator2 from './decorator-2'
import ShowcaseCard from '../showcase-card'

storiesOf('Decorators', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Custom grid', () => <Grid/>)
    .add('1', () => <Decorator1/>)
    .add('2', () => <Decorator2/>)


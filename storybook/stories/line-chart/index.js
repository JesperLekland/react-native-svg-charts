import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Standard from './standard'
import Partial from './partial'
import ShowcaseCard from '../showcase-card'

storiesOf('LineChart')
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <Standard/>)
    .add('Partial', () => <Partial/>)

import { ComponentMeta, ComponentStory } from '@storybook/react'

import Bridge from '../components/Bridge/Bridge'
import React from 'react'

export default {
  title: 'Bridge',
  component: Bridge,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Bridge>

const Template: ComponentStory<typeof Bridge> = (args) => <Bridge {...args} />

export const Brige = Template.bind({})

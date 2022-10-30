import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Bridge } from '../expose'
import Controller from '../components/Controller/Controller'
import React from 'react'

export default {
  title: 'Controller',
  component: Controller,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Controller>

const Template: ComponentStory<typeof Controller> = (args) => <Controller {...args} />

export const ControllerComponent = ({ children }: any) => {
  return <Bridge>{children}</Bridge>
}

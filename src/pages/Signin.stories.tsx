import { Meta, StoryObj } from '@storybook/react'
import {within, userEvent, waitFor} from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { rest } from 'msw'
import { SignIn } from './Signin'

export default {
    title: 'Pages/Sign in',
    component: SignIn,
    args: {},
    argTypes: {},
    parameters: {
        msw: {
            handles: [
                rest.post('/sessions', (req, res, ctx) => {
                    message: 'Login realizado!'
                })
            ]
        }
    }
} as Meta

export const Default: StoryObj = {
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'leo_sfrh2011@outlook.com')
        userEvent.type(canvas.getByPlaceholderText('******'), '12345678')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            return expect(canvas.getAllByText('Login realizado!')).toBeInTheDocument()
        })

        
    }
}
import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ChipInput from '../src/ChipInput'
import ControlledChipInput from './ControlledChipInput'

function themed (children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

storiesOf('ChipInput', module)
  .add('with some chips', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
    />
  ))
  .add('with many chips', () => themed(
    <ChipInput
      defaultValue={[...Array(25).keys()].map((c) => `Chip ${c}`)}
      onChange={action('onChange')}
      fullWidth
    />
  ))
  .add('empty with hintText', () => themed(
    <ChipInput
      hintText="Insert your favorite tags here"
      fullWidth
    />
  ))
  .add('with auto complete', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      dataSource={['alpha', 'beta']}
      hintText="Try typing a..."
    />
  ))
  .add('with floating label', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText="Some chips"
      hintText="Try typing a..."
      fullWidth
    />
  ))
  .add('disabled', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText="Disabled input"
      disabled
      fullWidth
    />
  ))
  .add('controlled input', () => themed(
    <ControlledChipInput />
  ))
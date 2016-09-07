import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ChipInput from '../src/ChipInput'
import ControlledChipInput from './ControlledChipInput'

storiesOf('ChipInput', module)
  .add('with some chips', () => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput
        defaultValue={['foo', 'bar']}
        style={{ width: '100%' }}
      />
    </MuiThemeProvider>
  ))
  .add('with many chips', () => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput
        defaultValue={[...Array(25).keys()].map((c) => `Chip ${c}`)}
        onChange={action('onChange')}
        style={{ width: '100%' }}
      />
    </MuiThemeProvider>
  ))
  .add('empty with hintText', () => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput
        hintText="Insert your favorite tags here"
        style={{ width: '100%' }}
      />
    </MuiThemeProvider>
  ))
  .add('with auto complete', () => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ChipInput
        defaultValue={['foo', 'bar']}
        style={{ width: '100%' }}
        dataSource={['alpha', 'beta']}
        hintText="Try typing a..."
      />
    </MuiThemeProvider>
  ))
  .add('controlled input', () => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ControlledChipInput />
    </MuiThemeProvider>
  ));

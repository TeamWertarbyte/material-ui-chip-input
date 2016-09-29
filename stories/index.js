import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {green800, green300} from 'material-ui/styles/colors'
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
      onChange={action('onChange')}
    />
  ))
  .add('with many chips', () => themed(
    <ChipInput
      defaultValue={[...Array(25).keys()].map((c) => `Chip ${c}`)}
      onChange={action('onChange')}
      fullWidth
    />
  ))
  .add('with hintText', () => themed(
    <ChipInput
      hintText="Hint text"
      fullWidth
    />
  ))
  .add('with auto complete', () => themed(
    <ChipInput
      fullWidth
      dataSource={['alpha', 'beta']}
      hintText="Try typing a..."
    />
  ))
  .add('with auto complete, open on focus', () => themed(
    <ChipInput
      fullWidth
      openOnFocus
      dataSource={['alpha', 'beta']}
      hintText="Try typing a..."
    />
  ))
  .add('with floating label', () => themed(
    <ChipInput
      floatingLabelText="Floating label"
      fullWidth
    />
  ))
  .add('with floating label and hint text', () => themed(
    <ChipInput
      floatingLabelText="Floating label"
      hintText="Hint text"
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
  .add('with custom width', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText="A chip input with a width of 321px"
      style={{ width: 321 }}
    />
  ))
  .add('with custom chips', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      chipRenderer={({ value, isFocused, isDisabled, handleClick, handleRequestDelete }, key) => (
        <Chip
          key={key}
          style={{ margin: '8px 8px 0 0', float: 'left', pointerEvents: isDisabled ? 'none' : undefined }}
          backgroundColor={isFocused ? green800 : green300}
          onTouchTap={handleClick}
          onRequestDelete={handleRequestDelete}
        >
          <Avatar size={32}>{value[0].toUpperCase()}</Avatar>
          {value}
        </Chip>
      )}
    />
  ))
  .add('controlled input', () => themed(
    <ControlledChipInput />
  ))
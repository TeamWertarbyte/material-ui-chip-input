import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
// import AutoComplete from '@material-ui/core/AutoComplete'
import { green } from '@material-ui/core/colors'
import ChipInput from '../src/ChipInput'
import CustomizedChipInput from './examples/CustomizedChipInput'
import CustomInputFormatting from './examples/CustomInputFormatting'
import ControlledChipInput from './examples/ControlledChipInput'
import AsynchronousDefaultValue from './examples/AsynchronousDefaultValue'
// import ClipboardExample from './examples/ClipboardExample'

import {
  ReactAutosuggestExample,
  ReactAutosuggestRemoteExample
} from './examples/react-autosuggest'

storiesOf('ChipInput', module)
  .addDecorator(story => (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>{story()}</div>
  ))
  .add('with some chips', () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      onChange={action('onChange')}
    />
  ))
  .add('with many chips', () => (
    <ChipInput
      defaultValue={[...Array(25).keys()].map(c => `Chip ${c}`)}
      onChange={action('onChange')}
      fullWidth
    />
  ))
  .add('with custom styles', () => <CustomizedChipInput />)
  .add('with placeholder', () => (
    <ChipInput placeholder='Placeholder' fullWidth />
  ))
  .add('with floating label', () => (
    <ChipInput label='Floating label' fullWidth />
  ))
  .add('with label and placeholder', () => (
    <ChipInput label='Floating label' placeholder='Placeholder' fullWidth />
  ))
  .add('with non-shrinking floating label and placeholder', () => (
    <ChipInput
      label='Floating label'
      placeholder='Placeholder'
      InputLabelProps={{ shrink: true }}
    />
  ))
  .add('disabled', () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      label='Disabled input'
      disabled
      fullWidth
    />
  ))
  .add('readOnly', () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      label='Readonly input'
      readOnly
      fullWidth
    />
  ))
  .add('with custom width', () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      label='A chip input with a width of 321px'
      style={{ width: 321 }}
    />
  ))
  .add('with custom chips', () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      chipRenderer={(
        {
          value,
          isFocused,
          isDisabled,
          isReadOnly,
          handleClick,
          handleDelete,
          className
        },
        key
      ) => (
        <Chip
          key={key}
          className={className}
          style={{
            pointerEvents: isDisabled || isReadOnly ? 'none' : undefined,
            backgroundColor: isFocused ? green[800] : green[300]
          }}
          onClick={handleClick}
          onDelete={handleDelete}
          label={value}
          avatar={<Avatar size={32}>{value[0].toUpperCase()}</Avatar>}
        />
      )}
    />
  ))
  .add('with helperText', () => (
    <ChipInput helperText='This text is here to help you.' />
  ))
  .add('with error style', () => (
    <ChipInput
      value={['One', 'Two']}
      helperText='At least three chips required.'
      error
    />
  ))
  .add('without underline', () => (
    <ChipInput defaultValue={['foo', 'bar']} fullWidth disableUnderline />
  ))
  .add('with different margins', () => (
    <div>
      <ChipInput label='normal' margin='normal' style={{ float: 'left' }} />
      <ChipInput label='dense' margin='dense' style={{ float: 'left' }} />
      <ChipInput label='none' margin='none' style={{ float: 'left' }} />
    </div>
  ))
  .add('with asynchronous default value', () =>
    <AsynchronousDefaultValue />
  )
  .add('controlled input', () =>
    <ControlledChipInput />
  )
  .add('with controlled text input', () => <CustomInputFormatting />)
  /*
  .add('create tags with comma, space and enter', () =>
    <ChipInput
      newChipKeyCodes={[13, 188, 32]}
    />
  )
  .add('uncontrolled verbose log', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onClick={action('onClick')}
    />
  )
  .add('controlled verbose log', () =>
    <ChipInput
      value={['foo', 'bar']}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onClick={action('onClick')}
    />
  )
  .add('objects as chips, uncontrolled', () =>
    <ChipInput
      dataSource={[{ label: 'Chip 1', id: 'one' }, { label: 'Chip 2', id: 'two' }]}
      dataSourceConfig={{ text: 'label', value: 'id' }}
      defaultValue={[{ label: 'Chip 1', id: 'one' }]}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onClick={action('onClick')}
    />
  )
  .add('objects as chips, controlled', () =>
    <ChipInput
      dataSource={[{ label: 'Chip 1', id: 'one' }, { label: 'Chip 2', id: 'two' }]}
      dataSourceConfig={{ text: 'label', value: 'id' }}
      value={[{ label: 'Chip 1', id: 'one' }]}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onClick={action('onClick')}
    />
  )
  .add('controlled input with auto complete', () =>
    <ControlledChipInput
      openOnFocus
      dataSource={['foo', 'bar']}
      inputProps={{ fullWidth: true }}
    />
  )
  */
  .add('with fullWidthInput', () => (
    <ChipInput
      label='The input is always full-width here'
      fullWidth
      fullWidthInput
    />
  ))
  /*
  .add('with clipboard manipulation', () =>
    <ClipboardExample
      onPaste={action('onPaste')}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onClick={action('onClick')}
    />
  )
  */
  .add('add text input value on blur', () => <ChipInput blurBehavior='add' />)
  .add('clear text input value on blur ', () => (
    <ChipInput blurBehavior='clear' />
  ))
  .add('keep text input value on blur ', () => (
    <ChipInput blurBehavior='none' />
  ))
  /*
  .add('in a form', () =>
    <form onSubmit={e => { e.preventDefault(); action('onSubmit')() }}>
      <ChipInput
        onChange={action('onChange')}
        floatingLabelText='This is a single chip input inside a form. Note that pressing Enter does not submit the form if a chip is being added.'
        fullWidth
      />
    </form>
  )
  */
  .add('with duplicates allowed', () => (
    <ChipInput defaultValue={['foo', 'bar', 'foo', 'bar']} allowDuplicates />
  ))
  /*
  .add('with onBeforeAdd returning false', () =>
    <ChipInput
      defaultValue={['foo', 'bar', 'foo', 'bar']}
      onBeforeAdd={() => false}
    />
  )
  .add('tabbing between fields', () =>
    <form>
      <ChipInput
        floatingLabelText='"Tab" key selects the next field when there is no active chip.'
        newChipKeyCodes={[9, 13]}
        fullWidth
      />
      <br />
      <input type='text' />
    </form>
  )
  */
  .add('with react-autosuggest', () => (
    <ReactAutosuggestExample
      label='Country search'
      placeholder='Search a country'
      fullWidth
    />
  ))
  .add('with react-autosuggest and remote data', () => (
    <ReactAutosuggestRemoteExample
      label='Remote country search.'
      placeholder='Search a country'
      fullWidth
    />
  ))
  .add('with react-autosuggest and add on blur', () => (
    <ReactAutosuggestRemoteExample
      label='Remote country search.'
      placeholder='Search a country'
      blurBehavior='add'
      fullWidth
    />
  ))
  .add('with "outlined" variant', () => (
    <div>
      <ChipInput variant='outlined' label='Add Tags' />
      <h2>Different Margins</h2>
      <div>
        <ChipInput variant='outlined' label='normal' margin='normal' style={{ float: 'left' }} />
        <ChipInput variant='outlined' label='dense' margin='dense' style={{ float: 'left' }} />
        <ChipInput variant='outlined' label='none' margin='none' style={{ float: 'left' }} />
      </div>
    </div>
  ))

  .add('with "outlined" variant fullWidth', () => (
    <ChipInput defaultValue={['foo', 'bar']} variant='outlined' label='Add Tags' fullWidth fullWidthInput />
  ))
  .add('with "filled" variant', () => (
    <div><ChipInput variant='filled' label='Add Tags' />
      <h2>Different Margins</h2>
      <div>
        <ChipInput variant='filled' label='normal' margin='normal' style={{ float: 'left' }} />
        <ChipInput variant='filled' label='dense' margin='dense' style={{ float: 'left' }} />
        <ChipInput variant='filled' label='none' margin='none' style={{ float: 'left' }} />
      </div>
    </div>
  ))
  .add('with "filled" variant full width', () => (
    <ChipInput defaultValue={['foo', 'bar']} variant='filled' label='Add Tags' fullWidth fullWidthInput />
  ))
  .add('with custom container style', () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      onChange={action('onChange')}
      chipContainerStyle={{ marginTop: 0 }}
    />
  ))

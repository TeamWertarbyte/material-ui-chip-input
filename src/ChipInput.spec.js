/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Chip from '@material-ui/core/Chip'
import ChipInput from './ChipInput'

describe('uncontrolled mode', () => {
  it('matches the snapshot', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} />
    )
    expect(tree).toMatchSnapshot()
  })

  it('displays the default value in chips', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar', 'foobar']} />
    )
    expect(tree.find('Chip').map((chip) => chip.text())).toEqual(['foo', 'bar', 'foobar'])
  })

  it('displays added chips', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} />
    )
    tree.find('input').getDOMNode().value = 'test'
    tree.find('input').simulate('keyDown', { keyCode: 13 }) // press enter
    expect(tree.find('Chip').map((chip) => chip.text())).toEqual(['foo', 'bar', 'test'])
  })

  it('calls onChange when adding new chips', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput onChange={handleChange} />
    )

    tree.find('input').getDOMNode().value = 'foo'
    tree.find('input').simulate('keyDown', { keyCode: 13 }) // press enter
    expect(handleChange).toBeCalledWith(['foo'])

    tree.find('input').getDOMNode().value = 'bar'
    tree.find('input').simulate('keyDown', { keyCode: 13 }) // press enter
    expect(handleChange).toBeCalledWith(['foo', 'bar'])
  })

  it('calls onChange when deleting chips with backspace key', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} onChange={handleChange} />
    )

    tree.find('input').simulate('keyDown', { keyCode: 8 }) // backspace (to focus the chip)
    tree.find('input').simulate('keyDown', { keyCode: 8 }) // backspace (to remove the chip)
    expect(handleChange).toBeCalledWith(['foo'])
  })

  it('calls onChange when deleting chips with delete key', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} onChange={handleChange} />
    )

    tree.find('input').simulate('keyDown', { keyCode: 8 }) // backspace (to focus the chip)
    tree.find('input').simulate('keyDown', { keyCode: 46 }) // del (to remove the chip)
    expect(handleChange).toBeCalledWith(['foo'])
  })

  it('calls onChange when deleting chips by clicking on the remove button', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} onChange={handleChange} />
    )
    tree.find('Cancel').first().simulate('click')
    expect(handleChange).toBeCalledWith(['bar'])
  })

  it('does not add empty chips', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput onChange={handleChange} />
    )

    tree.find('input').getDOMNode().value = ' '
    tree.find('input').simulate('keyDown', { keyCode: 13 }) // press enter
    expect(handleChange).not.toBeCalled()
  })

  it('does not add duplicate chips by default', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput defaultValue={['a']} onChange={handleChange} />
    )

    tree.find('input').getDOMNode().value = 'a'
    tree.find('input').simulate('keyDown', { keyCode: 13 }) // press enter
    expect(handleChange).not.toBeCalled()
  })

  it('does add duplicate chips if allowDuplicates is set to true', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput defaultValue={['a']} onChange={handleChange} allowDuplicates />
    )

    tree.find('input').getDOMNode().value = 'a'
    tree.find('input').simulate('keyDown', { keyCode: 13 }) // press enter
    expect(handleChange).toBeCalledWith(['a', 'a'])
  })

  it('calls inputRef when it set', () => {
    let inputRef
    mount(
      <ChipInput inputRef={ref => { inputRef = ref }} />
    )

    expect(inputRef.tagName.toLowerCase()).toBe('input')
  })

  it('calls onUpdateInput when the input changes', () => {
    const handleUpdateInput = jest.fn()
    const tree = mount(
      <ChipInput onUpdateInput={handleUpdateInput} />
    )

    tree.find('input').getDOMNode().value = 'foo'
    tree.find('input').simulate('change', { target: tree.find('input').getDOMNode() })
    expect(handleUpdateInput).toBeCalledWith(
     expect.objectContaining({
       target: expect.anything()
     })
    )
  })
})

describe('chip focusing', () => {
  function getFocusedChip (tree) {
    return tree.find('Chip').filterWhere((chip) => chip.getDOMNode().style.backgroundColor !== '')
  }

  function focusChip (tree, name) {
    tree.find('Chip').filterWhere((chip) => chip.text() === name).simulate('click')
  }

  it('focuses a chip on click', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} />
    )
    tree.find('Chip').at(1).simulate('click')
    expect(getFocusedChip(tree).length).toBe(1)
    expect(getFocusedChip(tree).text()).toBe('bar')
  })

  it('focuses the last chip when pressing backspace', () => {
    const tree = mount(
      <ChipInput defaultValue={['a', 'b', 'c']} />
    )
    tree.find('input').simulate('keyDown', { keyCode: 8 }) // backspace
    expect(getFocusedChip(tree).text()).toBe('c')
  })

  it('focuses the last chip when pressing the left arrow key if the input is empty', () => {
    const tree = mount(
      <ChipInput defaultValue={['a', 'b', 'c']} />
    )
    tree.find('input').simulate('keyDown', { keyCode: 37 }) // arrow left
    expect(getFocusedChip(tree).text()).toBe('c')

    // don't focus the chip if the input is not empty
    tree.find('input').getDOMNode().value = 'd'
    tree.find('input').simulate('keyDown')
    expect(getFocusedChip(tree).length).toBe(0)
    tree.find('input').simulate('keyDown', { keyCode: 37, target: { value: 'd' } }) // arrow left
    expect(getFocusedChip(tree).length).toBe(0)
  })

  it('unfocuses the focused chip while adding a new chip', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} />
    )
    focusChip(tree, 'foo')
    tree.find('input').simulate('keyDown')
    expect(getFocusedChip(tree).length).toBe(0)
  })

  it('unfocuses the focused chip on blur', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} />
    )
    focusChip(tree, 'foo')
    tree.find('input').simulate('blur')
    expect(getFocusedChip(tree).length).toBe(0)
  })

  it('unfocuses the focused chip when switching to disabled state', () => {
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} />
    )
    focusChip(tree, 'foo')
    tree.setProps({ disabled: true })
    expect(getFocusedChip(tree).length).toBe(0)
  })

  it('moves the focus to the left when pressing the left arrow key', () => {
    const tree = mount(
      <ChipInput defaultValue={['a', 'b', 'c']} />
    )
    focusChip(tree, 'b')
    tree.find('input').simulate('keyDown', { keyCode: 37 }) // arrow left
    expect(getFocusedChip(tree).text()).toBe('a')

    // keep the first element focused when pressing left if the first element is already focused
    tree.find('input').simulate('keyDown', { keyCode: 37 }) // arrow left
    expect(getFocusedChip(tree).text()).toBe('a')
  })

  it('moves the focus to the right when pressing the right arrow key', () => {
    const tree = mount(
      <ChipInput defaultValue={['a', 'b', 'c']} />
    )
    focusChip(tree, 'b')
    tree.find('input').simulate('keyDown', { keyCode: 39 }) // arrow right
    expect(getFocusedChip(tree).text()).toBe('c')

    // unfocus all chips if the right arrow key is pressed when focusing the last chip
    tree.find('input').simulate('keyDown', { keyCode: 39 }) // arrow right
    expect(getFocusedChip(tree).length).toBe(0)
  })

  it('focuses the chip to the left when removing a chip by pressing backspace', () => {
    const tree = mount(
      <ChipInput defaultValue={['a', 'b', 'c']} />
    )
    focusChip(tree, 'b')

    tree.find('input').simulate('keyDown', { keyCode: 8 }) // backspace
    expect(getFocusedChip(tree).text()).toBe('a')
  })

  it('focuses the chip at the previously focused position when removing a chip by pressing delete', () => {
    const tree = mount(
      <ChipInput defaultValue={['a', 'b', 'c']} />
    )
    focusChip(tree, 'b')

    tree.find('input').simulate('keyDown', { keyCode: 46 }) // delete
    expect(getFocusedChip(tree).text()).toBe('c')
  })
})

describe('placeholder', () => {
  it('displays a placeholder', () => {
    const tree = mount(
      <ChipInput placeholder='Placeholder' />
    )

    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe('Placeholder')
  })

  it('is hidden if there are chips', () => {
    const tree = mount(
      <ChipInput placeholder='Placeholder' value={['foo']} />
    )

    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe(null)
  })

  it('is hidden if there is a floating label', () => {
    const tree = mount(
      <ChipInput placeholder='Placeholder' label='Floating label' />
    )

    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe(null)
  })

  it('is visible if the floating label is floating', () => {
    const tree = mount(
      <ChipInput placeholder='Placeholder' label='Floating label' />
    )
    tree.find('input').simulate('focus')
    expect(tree.find('InputLabel').prop('shrink')).toBe(true)
    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe('Placeholder')
  })
})

describe('floating label', () => {
  it('is displayed', () => {
    const tree = mount(
      <ChipInput label='Floating label' />
    )
    expect(tree.find('InputLabel').text()).toBe('Floating label')
    expect(tree.find('InputLabel').prop('shrink')).toBe(false)
  })

  it('shrinks if there are chips', () => {
    const tree = mount(
      <ChipInput label='Floating label' value={['foo']} />
    )
    expect(tree.find('InputLabel').prop('shrink')).toBe(true)
  })

  it('shrinks if there are no chips but text input', () => {
    const tree = mount(
      <ChipInput label='Floating label' />
    )
    tree.find('input').getDOMNode().value = 'foo'
    tree.find('input').simulate('change')
    expect(tree.find('InputLabel').prop('shrink')).toBe(true)
  })
})

describe('helper text', () => {
  it('is displayed', () => {
    const tree = mount(
      <ChipInput helperText='Helper text' />
    )
    expect(tree.find('FormHelperText').text()).toBe('Helper text')
  })
})

describe('custom chips', () => {
  it('calls a chip renderer for every chip', () => {
    const chipRenderer = jest.fn(({ text }, key) => <Chip key={key} label={text.toUpperCase()} />)
    const tree = mount(
      <ChipInput value={['a', 'b']} chipRenderer={chipRenderer} />
    )
    expect(chipRenderer).toHaveBeenCalledTimes(2)
    expect(tree.find('Chip').map((chip) => chip.text())).toEqual(['A', 'B'])

    expect(chipRenderer.mock.calls[0][0]).toEqual({
      value: 'a',
      text: 'a',
      chip: 'a',
      className: expect.any(String),
      isDisabled: false,
      isFocused: false,
      handleClick: expect.any(Function),
      handleDelete: expect.any(Function)
    })
  })
})

describe('blurBehavior modes', () => {
  it('clears the input on blur', () => {
    const tree = mount(
      <ChipInput value={['a', 'b']} />
      )
    tree.find('input').simulate('change', { target: { value: 'foo' } })
    tree.find('input').simulate('blur')
    expect(tree.find('input').getDOMNode().value).toBe('')
  })

  it('does not clear the input on blur with blurBehavior set to ignore', () => {
    const tree = mount(
      <ChipInput value={['a', 'b']} blurBehavior='ignore' />
      )
    tree.find('input').simulate('change', { target: { value: 'foo' } })
    tree.find('input').simulate('blur')
    expect(tree.find('input').getDOMNode().value).toBe('foo')
  })

  it('adds the input on blur with blurBehavior set to add', () => {
    const handleChange = jest.fn()
    jest.useFakeTimers()
    const tree = mount(
      <ChipInput defaultValue={['a', 'b']} blurBehavior='add' onChange={handleChange} />
      )
    tree.find('input').getDOMNode().value = 'blur'
    tree.find('input').simulate('blur')

    jest.runAllTimers()

    expect(tree.find('input').getDOMNode().value).toBe('')
    expect(setTimeout).toHaveBeenCalledTimes(1)

    setTimeout(_ => {
      expect(tree.find('Chip').map((chip) => chip.text())).toEqual(['a', 'b', 'blur'])
    })
  })
})

describe('keys', () => {
  it('calls onKeyDown prop', () => {
    let keyPressed = null
    const tree = mount(
      <ChipInput value={['a', 'b']}
        onKeyDown={(e) => {
          keyPressed = e.keyCode
        }}
      />
    )
    tree.find('input').simulate('keyDown', {
      keyCode: 40, // down
      metaKey: false,
      ctrlKey: false,
      altKey: false
    })
    expect(keyPressed).toBe(40)
  })

  it('calls onKeyUp prop', () => {
    let keyPressed = null
    const tree = mount(
      <ChipInput value={['a', 'b']}
        onKeyUp={(e) => {
          keyPressed = e.keyCode
        }}
      />
    )
    tree.find('input').simulate('keyUp', {
      keyCode: 123,
      metaKey: false,
      ctrlKey: false,
      altKey: false
    })
    expect(keyPressed).toBe(123)
  })

  it('calls onKeyPress prop', () => {
    let keyPressed = null
    const tree = mount(
      <ChipInput value={['a', 'b']}
        onKeyPress={(e) => {
          keyPressed = e.keyCode
        }}
      />
    )
    tree.find('input').simulate('keyPress', {
      keyCode: 321,
      metaKey: false,
      ctrlKey: false,
      altKey: false
    })
    expect(keyPressed).toBe(321)
  })

  it('stops when onKeyDown prevents the default', () => {
    let preventDefault = false

    function handleKeyDown (e) {
      if (preventDefault) {
        e.preventDefault()
      }
    }

    const tree = mount(
      <ChipInput
        onKeyDown={handleKeyDown}
        newChipKeyCodes={null} /> // This will raise an exception if the code reaches that part
    )
    let input = tree.find('input')

    expect(() => input.simulate('keyDown', {})).toThrow()

    preventDefault = true
    expect(() => input.simulate('keyDown', {})).toBeDefined()
  })

  it('prevents default when chip is added', () => {
    const tree = mount(
      <ChipInput />
    )
    let prevented = false
    tree.find('input').simulate('keyDown', {
      keyCode: 13,
      metaKey: false,
      ctrlKey: false,
      altKey: false,
      target: {value: 'non-empty'},
      preventDefault: () => {
        prevented = true
      }
    })
    expect(prevented).toBe(true)
  })
})

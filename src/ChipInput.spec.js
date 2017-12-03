/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
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
    tree.find('input').simulate('keyDown', { keyCode: 46 }) // backspace (to remove the chip)
    expect(handleChange).toBeCalledWith(['foo'])
  })

  it('calls onChange when deleting chips with delete key', () => {
    const handleChange = jest.fn()
    const tree = mount(
      <ChipInput defaultValue={['foo', 'bar']} onChange={handleChange} />
    )

    tree.find('input').simulate('keyDown', { keyCode: 8 }) // backspace (to focus the chip)
    tree.find('input').simulate('keyDown', { keyCode: 8 }) // delete (to remove the chip)
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

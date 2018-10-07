import * as React from 'react';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText'

export interface ChipRendererArgs {
  value: string;
  text: string;
  chip: string;
  isFocused: boolean;
  isDisabled: boolean;
  handleClick: React.EventHandler<any>;
  handleDelete: React.EventHandler<any>;
  className: string;
}

export type ChipRenderer = (
  args: ChipRendererArgs,
  key: number
) => React.ReactNode;

export interface Props {
  allowDuplicates?: boolean;
  blurBehavior?: 'clear' | 'add' | 'ignore';
  chipRenderer?: ChipRenderer;
  clearInputValueOnChange?: boolean;
  dataSource?: any[];
  dataSourceConfig?: {
    text: string;
    value: string;
  };
  defaultValue?: any[];
  disabled?: boolean;
  FormHelperTextProps?: FormHelperTextProps;
  fullWidth?: boolean;
  fullWidthInput?: boolean;
  helperText?: React.ReactNode;
  InputLabelProps?: object;
  InputProps?: object;
  inputRef?: (ref: React.Ref<HTMLInputElement>) => any;
  label?: React.ReactNode;
  newChipKeyCodes?: number[];
  onAdd?: (chip: string) => any;
  onBeforeAdd?: (chip: string) => boolean;
  onChange?: (chips: string[]) => any;
  onDelete?: (chip:string, index: number) => any;
  onUpdateInput?: React.EventHandler<any>
  placeholder?: string;
  value?: any[];
  error?: boolean;
}

declare const ChipInput: React.ComponentType<Props>;
export default ChipInput;

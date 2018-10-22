import * as React from 'react';
import { FormControlProps } from '@material-ui/core/FormControl';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { InputProps } from '@material-ui/core/Input';
import { InputLabelProps } from '@material-ui/core/InputLabel';

export interface ChipRendererArgs {
  value: string;
  text: string;
  chip: any;
  isFocused: boolean;
  isDisabled: boolean;
  handleClick: React.EventHandler<any>;
  handleDelete: React.EventHandler<any>;
  className: string;
}

export type ChipRenderer = (
  args: ChipRendererArgs,
  key: any
) => React.ReactNode;


type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// omitting onChange from FormControlProps as we use a custom onChange
export interface Props extends Omit<FormControlProps, 'onChange'> {
  allowDuplicates?: boolean;
  blurBehavior?: 'clear' | 'add' | 'ignore';
  chipRenderer?: ChipRenderer;
  classes: Record<string, string>;
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
  InputLabelProps?: InputLabelProps;
  InputProps?: InputProps;
  inputRef?: (ref: React.Ref<HTMLInputElement>) => any;
  label?: React.ReactNode;
  newChipKeyCodes?: number[];
  onAdd?: (chip: any) => any;
  onBeforeAdd?: (chip: any) => boolean;
  onChange?: (chips: any[]) => any;
  onDelete?: (chip:any, index: number) => any;
  onUpdateInput?: React.EventHandler<any>;
  placeholder?: string;
  value?: any[];
  error?: boolean;
}

declare const ChipInput: React.ComponentType<Props>;
export default ChipInput;

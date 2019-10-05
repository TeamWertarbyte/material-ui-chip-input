import * as React from 'react';
import { FormControlProps } from '@material-ui/core/FormControl';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { InputProps as StandardInputProps } from '@material-ui/core/Input';
import { FilledInputProps } from '@material-ui/core/FilledInput';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { InputLabelProps } from '@material-ui/core/InputLabel';

export interface ChipRendererArgs {
  value: string;
  text: string;
  chip: any;
  isFocused: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
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
export interface BaseTextFieldProps extends Omit<FormControlProps, 'onChange'> {
  allowDuplicates?: boolean;
  alwaysShowPlaceholder?: boolean;
  blurBehavior?: 'clear' | 'add' | 'ignore';
  chipRenderer?: ChipRenderer;
  classes?: Record<string, string>;
  clearInputValueOnChange?: boolean;
  dataSource?: any[];
  dataSourceConfig?: {
    text: string;
    value: string;
  };
  defaultValue?: any[];
  disabled?: boolean;
  disableUnderline?: boolean;
  FormHelperTextProps?: FormHelperTextProps;
  fullWidth?: boolean;
  fullWidthInput?: boolean;
  helperText?: React.ReactNode;
  InputLabelProps?: InputLabelProps;
  inputRef?: (ref: React.Ref<HTMLInputElement>) => any;
  inputValue?: string;
  label?: React.ReactNode;
  newChipKeyCodes?: number[];
  onAdd?: (chip: any) => any;
  onBeforeAdd?: (chip: any) => boolean;
  onChange?: (chips: any[]) => any;
  onDelete?: (chip: any, index: number) => any;
  onUpdateInput?: React.EventHandler<any>;
  placeholder?: string;
  readOnly?: boolean;
  value?: any[];
  variant?: 'outlined' | 'standard' | 'filled';
}

export interface StandardTextFieldProps extends BaseTextFieldProps {
  variant?: 'standard';
  InputProps?: Partial<StandardInputProps>;
}

export interface FilledTextFieldProps extends BaseTextFieldProps {
  variant: 'filled';
  InputProps?: Partial<FilledInputProps>;
}

export interface OutlinedTextFieldProps extends BaseTextFieldProps {
  variant: 'outlined';
  InputProps?: Partial<OutlinedInputProps>;
}

export type Props = StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;

declare const ChipInput: React.ComponentType<Props>;
export default ChipInput;

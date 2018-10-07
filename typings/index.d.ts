import * as React from 'react';

interface Props {
  allowDuplicates?: boolean;
  blurBehavior?: 'clear' | 'add' | 'ignore';
  chipRenderer?: (...args: any[]) => any;
  clearInputValueOnChange?: boolean;
  dataSource?: any[];
  dataSourceConfig?: {
    text: string;
    value: string;
  };
  defaultValue?: any[];
  disabled?: boolean;
  FormHelperTextProps?: object;
  fullWidth?: boolean;
  fullWidthInput?: boolean;
  helperText?: React.ReactNode;
  InputLabelProps?: object;
  InputProps?: object;
  inputRef?: (...args: any[]) => any;
  label?: React.ReactNode;
  newChipKeyCodes?: number[];
  onAdd?: (...args: any[]) => any;
  onBeforeAdd?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onDelete?: (...args: any[]) => any;
  onUpdateInput?: (...args: any[]) => any;
  placeholder?: string;
  value?: any[];
  error?: boolean;
}

declare const ChipInput: React.ComponentType<Props>;
export default ChipInput;

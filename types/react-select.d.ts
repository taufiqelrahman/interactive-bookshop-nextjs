declare module 'react-select' {
  import { Component, ReactNode, CSSProperties } from 'react';

  export interface OptionTypeBase {
    [key: string]: any;
  }

  export interface GroupTypeBase<OptionType> {
    options: OptionType[];
    [key: string]: any;
  }

  export interface CommonProps<OptionType> {
    className?: string;
    classNamePrefix?: string;
    clearValue?: () => void;
    getStyles?: (name: string, props: any) => CSSProperties;
    getValue?: () => OptionType[];
    hasValue?: boolean;
    isMulti?: boolean;
    isRtl?: boolean;
    options?: OptionType[];
    selectOption?: (option: OptionType) => void;
    selectProps?: any;
    setValue?: (value: OptionType[], action: string) => void;
    theme?: any;
  }

  export interface Props<OptionType = OptionTypeBase> {
    autoFocus?: boolean;
    backspaceRemovesValue?: boolean;
    blurInputOnSelect?: boolean;
    captureMenuScroll?: boolean;
    className?: string;
    classNamePrefix?: string;
    closeMenuOnSelect?: boolean;
    closeMenuOnScroll?: boolean | ((event: Event) => boolean);
    components?: any;
    controlShouldRenderValue?: boolean;
    defaultInputValue?: string;
    defaultMenuIsOpen?: boolean;
    defaultValue?: OptionType | OptionType[];
    delimiter?: string;
    escapeClearsValue?: boolean;
    filterOption?: ((option: any, rawInput: string) => boolean) | null;
    instanceId?: string | number;
    formatGroupLabel?: (group: GroupTypeBase<OptionType>) => ReactNode;
    formatOptionLabel?: (option: OptionType, labelMeta: any) => ReactNode;
    getOptionLabel?: (option: OptionType) => string;
    getOptionValue?: (option: OptionType) => string;
    hideSelectedOptions?: boolean;
    id?: string;
    inputId?: string;
    inputValue?: string;
    isClearable?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isMulti?: boolean;
    isOptionDisabled?: (option: OptionType) => boolean;
    isOptionSelected?: (option: OptionType, selectValue: OptionType[]) => boolean;
    isRtl?: boolean;
    isSearchable?: boolean;
    loadingMessage?: (obj: { inputValue: string }) => string | null;
    maxMenuHeight?: number;
    menuIsOpen?: boolean;
    menuPlacement?: 'auto' | 'bottom' | 'top';
    menuPortalTarget?: HTMLElement;
    menuShouldBlockScroll?: boolean;
    menuShouldScrollIntoView?: boolean;
    minMenuHeight?: number;
    name?: string;
    noOptionsMessage?: (obj: { inputValue: string }) => string | null;
    onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
    onChange?: (value: OptionType | OptionType[] | null, action: any) => void;
    onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
    onInputChange?: (newValue: string, actionMeta: any) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
    onMenuClose?: () => void;
    onMenuOpen?: () => void;
    onMenuScrollToBottom?: (event: React.SyntheticEvent<HTMLElement>) => void;
    onMenuScrollToTop?: (event: React.SyntheticEvent<HTMLElement>) => void;
    openMenuOnClick?: boolean;
    openMenuOnFocus?: boolean;
    options?: OptionType[];
    pageSize?: number;
    placeholder?: ReactNode;
    screenReaderStatus?: (obj: { count: number }) => string;
    styles?: any;
    tabIndex?: string;
    tabSelectsValue?: boolean;
    theme?: any;
    value?: OptionType | OptionType[] | null;
  }

  export default class Select<OptionType = OptionTypeBase> extends Component<Props<OptionType>> {}

  export class Creatable<OptionType = OptionTypeBase> extends Component<Props<OptionType>> {}
  export class Async<OptionType = OptionTypeBase> extends Component<Props<OptionType>> {}
  export class AsyncCreatable<OptionType = OptionTypeBase> extends Component<Props<OptionType>> {}
}

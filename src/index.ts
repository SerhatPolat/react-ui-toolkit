import "./ui/reference/_colors.scss";
import "./ui/reference/_measurement.scss";

import FormField, {
  FormFieldProps as FormFieldComponentProps
} from "./form/field/FormField";
import Input from "./form/input/Input";
import {InputProps as InputComponentProps} from "./form/input/util/inputTypes";
import PasswordInput, {
  PasswordInputProps as PasswordInputComponentProps
} from "./form/password-input/PasswordInput";
import FileInput, {
  FileInputProps as FileInputComponentProps
} from "./form/input/file/FileInput";
import CheckboxInput, {
  CheckboxInputProps as CheckboxInputComponentProps
} from "./form/input/checkbox/CheckboxInput";
import RadioInput, {
  RadioInputProps as RadioInputComponentProps,
  RadioInputItem as RadioInputComponentItem
} from "./form/input/radio/RadioInput";
import RadioGroup, {
  RadioGroupProps as RadioGroupComponentProps
} from "./form/input/radio/group/RadioGroup";
import TypeaheadInput, {
  TypeaheadInputProps as TypeaheadInputComponentProps
} from "./form/input/typeahead/TypeaheadInput";
import TypeaheadSelect, {
  TypeaheadSelectProps as TypeaheadSelectComponentProps
} from "./select/typeahead/TypeaheadSelect";
import Dropdown, {DropdownProps as DropdownComponentProps} from "./dropdown/Dropdown";
import {
  DropdownOption as DropdownComponentOption,
  DropdownOptionSelectHandler as DropdownOptionSelectComponentHandler,
  DropdownSelectedOption as DropdownSelectedComponentOption
} from "./dropdown/list/item/DropdownListItem";
import List, {ListProps as ListComponentProps} from "./list/List";
import ListItem, {ListItemProps as ListItemComponentProps} from "./list/item/ListItem";
import DescriptionTerm, {
  DescriptionTermProps as DescriptionTermComponentProps
} from "./list/description-term/DescriptionTerm";
import Button, {ButtonProps as ButtonComponentProps} from "./button/Button";
import FileUploadButton, {
  FileUploadButtonProps as FileUploadButtonComponentProps
} from "./button/file-upload/FileUploadButton";
import Spinner, {SpinnerProps as SpinnerComponentProps} from "./spinner/Spinner";
import Tab, {TabItem as TabComponentItem, TabProps as TabComponentProps} from "./tab/Tab";
import Textarea, {
  TextareaProps as TextareaComponentProps
} from "./form/textarea/Textarea";
import {Toggle, ToggleProps as ToggleComponentProps} from "./toggle/Toggle";
import Switch, {SwitchProps as SwitchComponentProps} from "./switch/Switch";
import DateTimer from "./date-timer/DateTimer";
import useDateTimer from "./core/utils/hooks/useDateTimer";
import ProgressBar, {
  ProgressBarProps as ProgressBarComponentProps
} from "./progress-bar/ProgressBar";
import {DateTimerProps as DateTimerComponentProps} from "./date-timer/util/dateTimerTypes";
import Toast, {ToastProps as ToastComponentProps} from "./toast/Toast";
import {useToastContext, useToaster} from "./toast/util/toastHooks";
import {ToastContext, ToastContextProvider} from "./toast/ToastProvider";

export {
  // Components
  FormField,
  Input,
  FileInput,
  PasswordInput,
  CheckboxInput,
  RadioInput,
  RadioGroup,
  TypeaheadInput,
  TypeaheadSelect,
  Dropdown,
  List,
  ListItem,
  DescriptionTerm,
  Button,
  FileUploadButton,
  Spinner,
  Tab,
  DateTimer,
  ProgressBar,
  Textarea,
  Toggle,
  Switch,
  Toast,
  // Hooks
  useToastContext,
  useToaster,
  useDateTimer,
  // Contexts
  ToastContext,
  ToastContextProvider
};

// Types
export type FormFieldProps = FormFieldComponentProps;
export type InputProps = InputComponentProps;
export type FileInputProps = FileInputComponentProps;
export type PasswordInputProps = PasswordInputComponentProps;
export type CheckboxInputProps = CheckboxInputComponentProps;
export type RadioInputProps<Id = string, Context = any> = RadioInputComponentProps<
  Id,
  Context
>;
export type RadioInputItem<Id = string, Context = any> = RadioInputComponentItem<
  Id,
  Context
>;
export type RadioGroupProps<Id = string, Context = any> = RadioGroupComponentProps<
  Id,
  Context
>;
export type TypeaheadInputProps = TypeaheadInputComponentProps;
export type TypeaheadSelectProps = TypeaheadSelectComponentProps;
export type DropdownProps<OptionIdShape> = DropdownComponentProps<OptionIdShape>;
export type DropdownOption<Id = string, Context = any> = DropdownComponentOption<
  Id,
  Context
>;
export type DropdownOptionSelectHandler<
  Id = string,
  Context = any
> = DropdownOptionSelectComponentHandler<Id, Context>;
export type DropdownSelectedOption<
  Id = string,
  Context = any
> = DropdownSelectedComponentOption<Id, Context>;
export type ListProps<Item = any> = ListComponentProps<Item>;
export type ButtonProps = ButtonComponentProps;
export type DescriptionTermProps = DescriptionTermComponentProps;
export type FileUploadButtonProps = FileUploadButtonComponentProps;
export type SpinnerProps = SpinnerComponentProps;
export type TabItem = TabComponentItem;
export type TabProps = TabComponentProps;
export type ProgressBarProps = ProgressBarComponentProps;
export type TextareaProps = TextareaComponentProps;
export type ToggleProps = ToggleComponentProps;
export type SwitchProps = SwitchComponentProps;
export type DateTimerProps = DateTimerComponentProps;
export type ListItemProps = ListItemComponentProps;
export type ToastProps = ToastComponentProps;

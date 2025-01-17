import CaretDownIcon from "../../ui/icons/caret-down.svg";

import "./_typeahead-select.scss";

import React, {useState, useEffect, useRef} from "react";
import classNames from "classnames";

import {DropdownOption} from "../../dropdown/list/item/DropdownListItem";
import TypeaheadInput, {
  TypeaheadInputProps
} from "../../form/input/typeahead/TypeaheadInput";
import {mapDropdownOptionsToTagShapes} from "../../tag/util/tagUtils";
import {TagShape} from "../../tag/Tag";
import Dropdown from "../../dropdown/Dropdown";
import {filterOptionsByKeyword} from "./util/typeaheadSelectUtils";
import {filterOutItemsByKey} from "../../core/utils/array/arrayUtils";
import Spinner from "../../spinner/Spinner";
import {KEYBOARD_EVENT_KEY} from "../../core/utils/keyboard/keyboardEventConstants";
import TypeaheadSelectHeader from "./header/TypeaheadSelectHeader";

export interface TypeaheadSelectProps {
  selectedOptions: DropdownOption[];
  dropdownOptions: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  typeaheadProps: Pick<
    TypeaheadInputProps,
    "id" | "placeholder" | "name" | "onFocus" | "type"
  >;
  testid?: string;
  onKeywordChange?: (value: string) => void;
  initialKeyword?: string;
  controlledKeyword?: string;
  onTagRemove?: (option: DropdownOption) => void;
  selectedOptionLimit?: number;
  customClassName?: string;
  shouldDisplaySelectedOptions?: boolean;
  shouldFilterOptionsByKeyword?: boolean;
  isDisabled?: boolean;
  customSpinner?: React.ReactNode;
  shouldShowEmptyOptions?: boolean;
  canOpenDropdownMenu?: boolean;
  areOptionsFetching?: boolean;
}

/* eslint-disable complexity */
function TypeaheadSelect({
  testid,
  dropdownOptions,
  selectedOptions,
  typeaheadProps,
  onTagRemove,
  onKeywordChange,
  onSelect,
  customClassName,
  selectedOptionLimit,
  shouldDisplaySelectedOptions = true,
  shouldFilterOptionsByKeyword = true,
  isDisabled,
  shouldShowEmptyOptions = true,
  canOpenDropdownMenu = true,
  areOptionsFetching,
  customSpinner,
  initialKeyword = "",
  controlledKeyword
}: TypeaheadSelectProps) {
  const typeaheadInputRef = useRef<HTMLInputElement | null>(null);

  const [isMenuOpen, setMenuVisibility] = useState(false);
  const [computedDropdownOptions, setComputedDropdownOptions] = useState(dropdownOptions);
  const [shouldFocusOnInput, setShouldFocusOnInput] = useState(false);
  const [keyword, setKeyword] = useState(initialKeyword);
  const inputValue = typeof controlledKeyword === "string" ? controlledKeyword : keyword;

  const tags = mapDropdownOptionsToTagShapes(selectedOptions);
  const shouldDisplayOnlyTags = Boolean(
    selectedOptionLimit && selectedOptions.length >= selectedOptionLimit
  );

  const canSelectMultiple = !selectedOptionLimit || selectedOptionLimit > 1;
  const shouldCloseOnSelect =
    !canSelectMultiple ||
    Boolean(selectedOptionLimit && selectedOptions.length >= selectedOptionLimit - 1);

  const typeaheadSelectClassName = classNames("typeahead-select", customClassName, {
    "typeahead-select--has-selected-options": Boolean(selectedOptions.length),
    "typeahead-select--can-select-multiple": canSelectMultiple,
    "typeahead-select--is-dropdown-menu-open": isMenuOpen
  });
  const spinnerContent = customSpinner || (
    <Spinner customClassName={"typeahead-select__spinner"} />
  );

  useEffect(() => {
    setComputedDropdownOptions(dropdownOptions);
  }, [dropdownOptions]);

  useEffect(() => {
    let timeoutId: any;

    if (shouldFocusOnInput) {
      timeoutId = setTimeout(() => {
        if (typeaheadInputRef.current) {
          typeaheadInputRef.current.focus();
          setShouldFocusOnInput(false);
        }
      });
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldFocusOnInput]);

  const dropdownHeader = (
    <div className={"typeahead-select__header-container"}>
      <TypeaheadSelectHeader
        tags={shouldDisplaySelectedOptions ? tags : []}
        handleTagRemove={handleRemove}
        input={
          !shouldDisplayOnlyTags && (
            <TypeaheadInput
              testid={`${testid}.search`}
              customClassName={"typeahead-select__input"}
              id={typeaheadProps.id}
              name={typeaheadProps.name}
              type={typeaheadProps.type}
              placeholder={typeaheadProps.placeholder}
              value={inputValue}
              onQueryChange={handleKeywordChange}
              onKeyDown={handleKeyDown}
              rightIcon={
                areOptionsFetching ? spinnerContent : <CaretDownIcon aria-hidden={true} />
              }
              onFocus={handleTypeaheadInputFocus}
              isDisabled={isDisabled}
            />
          )
        }
      />
    </div>
  );

  return (
    <Dropdown
      testid={testid}
      customClassName={typeaheadSelectClassName}
      headerWithoutButton={dropdownHeader}
      role={"listbox"}
      options={filterOutItemsByKey(computedDropdownOptions, "id", selectedOptions)}
      onSelect={handleSelect}
      selectedOption={null}
      isMenuOpenHook={[isMenuOpen, setMenuVisibility]}
      hasDeselectOption={false}
      shouldCloseOnSelect={shouldCloseOnSelect}
      shouldJumpToQuery={false}
      isDisabled={isDisabled}
      areOptionsFetching={areOptionsFetching}
      shouldShowEmptyOptions={shouldShowEmptyOptions}
      canOpenDropdownMenu={canOpenDropdownMenu}
    />
  );

  function openDropdownMenu() {
    setMenuVisibility(true);
  }

  function handleTypeaheadInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (canOpenDropdownMenu && !isDisabled) {
      openDropdownMenu();
    }

    if (typeaheadProps.onFocus) {
      typeaheadProps.onFocus(event);
    }
  }

  function handleSelect(option: DropdownOption | null) {
    if (!shouldDisplayOnlyTags) {
      onSelect(option!);
      setComputedDropdownOptions(dropdownOptions);
      setKeyword("");
      setShouldFocusOnInput(true);
    }
  }

  function handleRemove(tag: TagShape<DropdownOption>) {
    if (onTagRemove) {
      onTagRemove(tag.context!);
      setShouldFocusOnInput(true);
    }
  }

  function handleKeywordChange(value: string) {
    if (shouldFilterOptionsByKeyword) {
      setComputedDropdownOptions(filterOptionsByKeyword(dropdownOptions, value));
    }

    if (onKeywordChange) {
      onKeywordChange(value);
    }

    if (typeof controlledKeyword === "undefined") {
      setKeyword(value);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const {key} = event;

    if (
      key === KEYBOARD_EVENT_KEY.BACKSPACE &&
      !inputValue &&
      onTagRemove &&
      selectedOptions.length
    ) {
      event.stopPropagation();
      onTagRemove(selectedOptions[selectedOptions.length - 1]);
    }
  }
}
/* eslint-enable complexity */

export default TypeaheadSelect;

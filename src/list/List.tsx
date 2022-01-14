import "./_list.scss";

import React, {Fragment} from "react";
import classNames from "classnames";

import {generateListItemKey} from "./util/listUtils";

export interface ListProps<Item = any> {
  items: Item[];
  children: (item: Item, testid: string, index?: number) => JSX.Element;
  listItemKeyGenerator?: (item: Item, testid: string) => string;
  testid?: string;
  role?: string;
  customClassName?: string;
  placeholderProps?: {
    shouldDisplayPlaceholder: boolean;
    placeholder: React.ReactNode;
  };
  emptyStateProps?: {
    shouldDisplayEmptyState: boolean;
    emptyState: React.ReactNode;
  };
}

function List<Item extends any>({
  items,
  children,
  customClassName,
  testid,
  role,
  listItemKeyGenerator,
  placeholderProps,
  emptyStateProps
}: ListProps<Item>) {
  const listClassName = classNames("list", customClassName);

  return (
    <ul className={listClassName} role={role} data-testid={testid}>
      {items.map((item: Item, index: number) => {
        const listItemTestId = `${testid}.item-${index}`;

        return (
          <Fragment
            key={generateListItemKey({listItemKeyGenerator, listItemTestId, item})}>
            {children(item, listItemTestId, index)}
          </Fragment>
        );
      })}

      {placeholderProps?.shouldDisplayPlaceholder && placeholderProps.placeholder}

      {!placeholderProps?.shouldDisplayPlaceholder &&
        emptyStateProps?.shouldDisplayEmptyState &&
        emptyStateProps.emptyState}
    </ul>
  );
}

export default List;

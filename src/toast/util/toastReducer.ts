import {updateAtIndex} from "../../core/utils/array/arrayUtils";
import {not} from "../../core/utils/function/functionUtils";
import {initialToastState} from "./toastConstants";
import {ToastAction} from "./toastTypes";
import {isSameToast} from "./toastUtils";

type ToastState = typeof initialToastState;

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  let newState = state;

  switch (action.type) {
    case "DISPLAY": {
      const {toastData, limit} = action;

      const toastStack = [
        ...state.toastStack.filter(not(isSameToast(toastData.id))),
        toastData
      ];

      if (limit)
        if (toastStack.length > limit)
          // pop first toast if stack exceeds limit
          toastStack.shift();

      newState = {
        ...state,
        toastStack
      };
      break;
    }

    case "HIDE": {
      newState = {
        ...state,
        toastStack: state.toastStack.filter(not(isSameToast(action.toastId)))
      };
      break;
    }

    case "HIDE_ALL": {
      newState = {
        ...state,
        toastStack: []
      };
      break;
    }

    case "UPDATE": {
      const currentIndex = state.toastStack.findIndex(isSameToast(action.toastId));

      if (currentIndex > -1) {
        newState = {
          ...state,
          toastStack: updateAtIndex(state.toastStack, currentIndex, {
            ...state.toastStack[currentIndex],
            ...action.toastData
          })
        };
      } else {
        throw new Error("Trying to update a Toast that is already removed");
      }

      break;
    }

    default:
      break;
  }

  return newState;
}

export default toastReducer;

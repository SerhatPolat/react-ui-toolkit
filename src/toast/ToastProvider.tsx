import React, {createContext, useReducer, useEffect} from "react";

import ToastStack from "./stack/ToastStack";
import {initialToastState} from "./util/toastConstants";
import toastReducer from "./util/toastReducer";
import {ToastAction, ToastContextState} from "./util/toastTypes";

const ToastContext = createContext<[ToastContextState, React.Dispatch<ToastAction>]>([
  initialToastState,
  () => undefined
]);

ToastContext.displayName = "ToastContext";

interface ToastContextProviderProps {
  children: React.ReactNode;
  customRootId?: string;
  autoCloseToasts?: boolean;
  limit?: number;
}

/**
 * Wraps its children in a context provider
 * these children can then use the useToast hook to show toast messages
 */

function ToastContextProvider({
  children,
  customRootId,
  autoCloseToasts = true,
  limit
}: ToastContextProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, {
    ...initialToastState,
    autoCloseToasts,
    limit
  });

  useEffect(() => {
    if (limit !== undefined) {
      dispatch({type: "SET_LIMIT", limit});
    }
  }, [limit]);

  useEffect(() => {
    dispatch({type: "SET_AUTO_CLOSE", autoCloseToasts});
  }, [autoCloseToasts]);

  return (
    <ToastContext.Provider value={[state, dispatch]}>
      {children}

      <ToastStack customRootId={customRootId} />
    </ToastContext.Provider>
  );
}

export {ToastContext, ToastContextProvider};

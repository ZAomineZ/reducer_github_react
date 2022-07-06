import { createContext, Reducer, useReducer } from "react";

export const START_RESULTUSERS = "startResultUsers";
export const SUCCESS_RESULTUSERS = "successResultUsers";
export const ERROR_RESULTUSERS = "errorResultUsers";
export const START_RESULT_REPOSITORIES = "startResultRepositories";
export const SUCCESS_RESULT_REPOSITORIES = "successResultRepositories";
export const ERROR_RESULT_REPOSITORIES = "errorResultRepositories";

export interface IStoreContext {
  repositories: {
    data: any[];
    loading: boolean;
    error: string | boolean;
    currentSearch: string | null;
  };
  users: {
    data: any[];
    loading: boolean;
    error: string | boolean;
    currentSearch: string | null;
  };
}

interface IStoreContainerProps {
  children: JSX.Element | JSX.Element[];
}

const initialState = {
  repositories: {
    data: [],
    loading: false,
    error: false,
    currentSearch: null,
  },
  users: {
    data: [],
    loading: false,
    error: false,
    currentSearch: null,
  },
};

export type ActionReducer = {
  type: string;
  query: string;
  data: any[];
  error: string;
};

export const StoreContext = createContext<IStoreContext>(initialState);

const reducer = (
  state: IStoreContext,
  action: ActionReducer
): IStoreContext | undefined => {
  switch (action.type) {
    case START_RESULTUSERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          currentSearch: action.query,
        },
      };
    case SUCCESS_RESULTUSERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          data: action.data,
        },
      };
    case ERROR_RESULTUSERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: action.error,
        },
      };
    case START_RESULT_REPOSITORIES:
      return {
        ...state,
        repositories: {
          ...state.repositories,
          loading: true,
        },
      };
    case SUCCESS_RESULT_REPOSITORIES:
      return {
        ...state,
        repositories: {
          ...state.repositories,
          loading: false,
          data: action.data,
        },
      };
    case ERROR_RESULT_REPOSITORIES:
      return {
        ...state,
        repositories: {
          ...state.repositories,
          loading: false,
          error: action.error,
        },
      };
  }
};

export const StoreContainer = ({ children }: IStoreContainerProps) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState as IStoreContext);

  const value = { state, dispatch };

  return (
    // @ts-ignore
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

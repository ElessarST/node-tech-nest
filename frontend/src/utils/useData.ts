import { DependencyList, Reducer, useEffect, useReducer } from 'react';

export type UseData<T> = {
  loading: boolean;
  data: T | undefined;
  error: Error | undefined;
};

enum UseDataAction {
  Fetching = 'fetching',
  Fetched = 'fetched',
  Error = 'error',
}

type FetchingAction = {
  type: UseDataAction.Fetching;
};

type FetchedAction<T> = {
  type: UseDataAction.Fetched;
  payload: T;
};

type ErrorAction = {
  type: UseDataAction.Error;
  payload: Error;
};

type Action<T> = FetchingAction | FetchedAction<T> | ErrorAction;

const initialState = {
  loading: true,
  data: undefined,
  error: undefined,
};

function useDataReducer<T>(state: UseData<T>, action: Action<T>): UseData<T> {
  switch (action.type) {
    case UseDataAction.Fetching:
      return initialState;
    case UseDataAction.Error:
      return {
        loading: false,
        error: action.payload,
        data: undefined,
      };
    case UseDataAction.Fetched:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      };
    default:
      throw new Error();
  }
}

export function useData<T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): UseData<T> {
  const [state, dispatch] = useReducer<Reducer<UseData<T>, Action<T>>>(
    useDataReducer,
    initialState,
  );
  useEffect(() => {
    dispatch({ type: UseDataAction.Fetching });
    fn()
      .then((data) => dispatch({ type: UseDataAction.Fetched, payload: data }))
      .catch((err) => dispatch({ type: UseDataAction.Error, payload: err }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fn, ...deps]);

  return state;
}

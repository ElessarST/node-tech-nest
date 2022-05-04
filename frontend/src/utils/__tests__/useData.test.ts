import { renderHook } from '@testing-library/react-hooks';
import { useData } from '../useData';

const ERROR = new Error('error');

const errorState = {
  loading: false,
  error: ERROR,
  data: undefined,
};

const dataState = {
  loading: false,
  error: undefined,
  data: 'data',
};

const loadingState = {
  loading: true,
  error: undefined,
  data: undefined,
};

describe('useData hook', () => {
  it('should start with loading and return data for success call', async () => {
    const fn = jest.fn().mockResolvedValue('data');
    const { result, waitForNextUpdate } = renderHook(() => useData<string>(fn));

    expect(result.current).toEqual(loadingState);
    await waitForNextUpdate();
    expect(result.current).toEqual(dataState);
  });
  it('should start with loading and return error for failed call', async () => {
    const fn = jest.fn().mockRejectedValue(ERROR);
    const { result, waitForNextUpdate } = renderHook(() => useData<string>(fn));

    expect(result.current).toEqual(loadingState);
    await waitForNextUpdate();
    expect(result.current).toEqual(errorState);
  });
});

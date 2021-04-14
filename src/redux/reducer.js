const initState = {
  counter: 0,
  user: 'Rauf',
  someDate: 'some date ... data .... ',
};

const INC = 'INC';
const DEC = 'DEC';
const RESET = 'RESET';
const GET_DATA_FROM_BACKEND = 'GET_DATA_FROM_BACKEND';

export const actionCreatorINC = () => ({ type: INC });
export const actionCreatorDEC = () => ({ type: DEC });
export const actionCreatorRESET = () => {
  return { type: RESET };
};

export const thunkINC = () => {
  return async (dispatch, getState) => {
    const { counter, user, someDate } = getState();
    const result = await fetchDataToServer({
      counter: counter + 1,
      user,
      someDate,
    });
    if (result.ok) dispatch({ type: INC });
  };
};

export const thunkDEC = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const result = await fetchDataToServer({
      ...state,
      counter: state.counter - 1,
    });
    if (result.ok) dispatch({ type: DEC });
  };
};

export const thunkRESET = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const result = await fetchDataToServer({
      ...state,
      counter: 0,
    });
    result.ok && dispatch({ type: RESET });
  };
};

const fetchDataToServer = (param) =>
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  });

export const thunkGetServerData = () => {
  return async (dispatch, getState) => {
    //доступны все даные редакс-приложения
    const preResult = await fetch('/api');
    const { data } = await preResult.json();

    dispatch({
      type: GET_DATA_FROM_BACKEND,
      payload: data,
    });
  };
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case INC:
      return { ...state, counter: state.counter + 1 };
    case DEC:
      return { ...state, counter: state.counter - 1 };
    case RESET:
      return { ...state, counter: 0 };
    case GET_DATA_FROM_BACKEND:
      return payload;
    default:
      return state;
  }
}

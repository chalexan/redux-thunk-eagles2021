import { useSelector, useDispatch } from 'react-redux';
import {
  thunkINC,
  thunkDEC,
  thunkRESET,
  thunkGetServerData,
} from './redux/reducer';

import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const { counter, user, someDate } = useSelector((state) => state);

  useEffect(() => {
    dispatch(thunkGetServerData());
  }, []);

  return (
    <div>
      <h1>{counter}</h1>
      <h1>{user}</h1>
      <h1>{someDate}</h1>
      <button onClick={() => dispatch(thunkINC())}>INC</button>
      <button onClick={() => dispatch(thunkDEC())}>DEC</button>
      <button onClick={() => dispatch(thunkRESET())}>RESET</button>
    </div>
  );
};

export default App;

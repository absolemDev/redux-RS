import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTaskLoadingStatus,
  createTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>ToDo List</h1>
      <button onClick={() => dispatch(createTask())} disabled={isLoading}>
        Add task
      </button>
      {!isLoading ? (
        <ul>
          {state.map((el) => (
            <li key={el.id}>
              <p>{el.title}</p>
              <p> {`Completed: ${el.completed}`}</p>
              <button onClick={() => dispatch(completeTask(el.id))}>
                Complete
              </button>
              <button onClick={() => dispatch(titleChanged(el.id))}>
                Change title
              </button>
              <button onClick={() => dispatch(taskDeleted(el.id))}>
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

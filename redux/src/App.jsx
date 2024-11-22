import { useSelector, useDispatch } from "react-redux";
import { addtodo } from "./redux/slices/todoSlice";

function App() {
  const alltodos = useSelector((state) => state.todo.value);
  const Dispatch = useDispatch();

  return (
    <>
      <h1>Todos Count: {alltodos?.length || 0}</h1>
      <ul>
        {alltodos?.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={() => Dispatch(addtodo("Hi, my name is Harshith"))}>
        Add Todo
      </button>
    </>
  );
}

export default App;

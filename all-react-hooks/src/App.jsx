/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  forwardRef,
  memo,
  React,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";

//useState
//useEffect
//useReducer
//useRef
//useimperativehandle
//useLayoutEffect
//usememo
//usecallback
//usecontext
//memo
//usetrasition

//------react-19-hooks------------
//useActionState()
//useOptimistic()
//use()
//no farword ref()

function App() {
  const status = useOnlineStatus();
  console.log(typeof status);
  return (
    <div>
      {status.toString()}
      {"harshith"}
      {/* <Usecontextapi> */}
      {/* <Usestate counts={10} />
      <Usestate1 />
      <Usestate2 />
      <UseEffect />
      <UseEffect1 />
    
      <InfiniteScroll /> 
      <Usereducer />
      <Uselayouteffect />
      <Usereducer1 />
      <Useref />
      <Useref1 /> */}
      {/* <ExpensiveCalculationComponent /> */}
      {/* <Usecallback /> */}
      {/* <Gettingcontext /> */}
      {/* </Usecontextapi> */}
      {/* <UseTransition /> */}
    </div>
  );
}
//------------------------usestate-------------------
const Usestate = memo(function Usestate({ counts }) {
  const [count, setcount] = useState(counts);
  return (
    <div>
      <button onClick={() => setcount((pre) => pre - 1)}>-</button>
      <h1>{count}</h1>
      <button onClick={() => setcount((pre) => pre + 1)}>+</button>
      <button onClick={() => setcount(0)}>reset</button>
    </div>
  );
});

function Usestate1() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [model, setmodel] = useState(true);
  return (
    <>
      <div onClick={() => setmodel(!model)}>show model</div>
      {model ? (
        <div>
          <h5>login</h5>
          <p>{JSON.stringify({ username, password })}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function Usestate2() {
  const [form, setform] = useState({
    username: "",
    password: "",
    phonenum: "",
  });

  function handleform(e) {
    return setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div>
      {JSON.stringify(form)}
      <form>
        <label htmlFor="username">usename</label>
        <input type="text" name="username" onChange={handleform} />
        <label htmlFor="password"></label>
        <input type="password" name="password" id="" onChange={handleform} />
        <label htmlFor="phonenum">phonenum</label>
        <input type="text" name="phonenum" onChange={handleform} />
      </form>
    </div>
  );
}
//---------------------useeffect---------------------
function UseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 100) {
      setCount(0);
    }
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Update state
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [count]);

  return <div>{count}</div>;
}

function UseEffect1() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create AbortController outside fetch
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal, // Pass signal correctly
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data"); // Handle non-2xx HTTP responses
        }
        const jsonData = await res.json();

        setData(jsonData); // Update state with data
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message); // Set error state for non-abort errors
        }
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup: abort fetch on unmount
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data &&
        data.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        ))}
    </div>
  );
}

function InfiniteScroll() {
  const [posts, setPosts] = useState([]); // Store posts
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // Check if more posts are available

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // No more data to fetch
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]); // Append new posts
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when page changes
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment page number
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </div>
  );
}

//-----------------------usereducer---------------
function reducer(state, action) {
  console.log("reducerfun", action.payload);
  switch (action.type) {
    case "addtodo":
      return [...state, todoobj(action.payload)];
    case "toggle":
      return state.map((todo) => {
        if (todo.id === action.payload) {
          console.log(todo.id, action.payload);
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}
function todoobj(todoval) {
  const id = new Date().toISOString();
  const date = new Date().toLocaleDateString();
  return {
    id,
    date,
    todoval,
    completed: false,
  };
}
function Usereducer() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [input, setinput] = useState("");
  console.log(input);
  function handlesubmit(e) {
    e.preventDefault();
    dispatch({ type: "addtodo", payload: input });
    setinput("");
  }
  return (
    <>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      {todos.length === 0 && <div>plz add one todo</div>}
      {todos?.map((todo) => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  );
}

function Todo({ todo, dispatch }) {
  console.log("logs");
  function handleToogle() {
    dispatch({ type: "toggle", payload: todo.id });
  }
  function handleDelete() {
    dispatch({ type: "delete", payload: todo.id });
  }
  return (
    <div key={todo.id}>
      <h4>
        {todo.date} || {todo.todoval} || {todo.completed + ""}
      </h4>
      <button onClick={handleToogle}>toggle</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
function reducer1(state, action) {
  switch (action.type) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    default:
      return state;
  }
}
function Usereducer1() {
  const [count, dispatch] = useReducer(reducer1, 0);
  return (
    <div>
      <button onClick={() => dispatch({ type: "dec", payload: count })}>
        -
      </button>
      <h3>{count}</h3>
      <button onClick={() => dispatch({ type: "inc", payload: count })}>
        +
      </button>
    </div>
  );
}
//------------uselayouteffect----------------------------
function Uselayouteffect() {
  let divref = useRef(null);
  const [rect, setrect] = useState({});
  useLayoutEffect(() => {
    const { width, height } = divref.current.getBoundingClientRect();
    setrect({ width, height });
  }, []);
  return (
    <div>
      <div
        ref={divref}
        style={{ width: 400, height: 200, background: "lightblue" }}
      >
        Measure me!
      </div>
      <p>
        Width: {rect.width}, Height: {rect.height}
      </p>
    </div>
  );
}
//--------------useref----------------------
const Useref = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Focus on me!" />;
};

const Useref1 = () => {
  const [count, setcount] = useState(0);
  const ref = useRef(null);

  function handlestart() {
    ref.current = setInterval(() => {
      setcount((pre) => pre + 1);
    }, 1000);
  }

  function handlestop() {
    clearInterval(ref.current);
  }
  return (
    <div>
      <button onClick={handlestop}>stop</button>
      <h3>{count}</h3>
      <button onClick={handlestart}>start</button>
    </div>
  );
};

//--------useImperativeHandle----------------
function ParentComponent() {
  const inputRef = useRef();

  const handleFocusClick = () => {
    inputRef.current.focusInput(); // Calling child's method via ref
  };

  return (
    <div>
      <h1>Using useImperativeHandle Example</h1>
      <CustomInput ref={inputRef} />
      <button onClick={handleFocusClick}>Focus Input</button>
    </div>
  );
}

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current.focus(); // Custom method to focus input
    },
    clearInput() {
      inputRef.current.value = ""; // Custom method to clear input
    },
  }));

  return <input ref={inputRef} type="text" placeholder="Enter something" />;
});

//----------------------usememo---------------
function ExpensiveCalculationComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Expensive function to simulate a heavy calculation
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      /* empty */
    }
    // Simulate heavy computation
    return num * 2;
  };
  // expensiveCalculation(count);
  // Memoize the result of the expensive calculation
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Expensive Value: {memoizedValue}</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Count
      </button>

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p>Typed Text: {text}</p>
      </div>
    </div>
  );
}
//------------------usecallback------------------
function Usecallback() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Callback function memoized with useCallback
  const increment = useCallback(() => {
    // function increment() {
    setCount((prev) => prev + 1);
    // }
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment Count</button>

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p>Typed Text: {text}</p>
      </div>

      {/* Passing increment function to ChildComponent */}
      <ChildComponent onClick={increment} />
    </div>
  );
}

const ChildComponent = memo(({ onClick }) => {
  console.log("ChildComponent Rendered!");
  return (
    <div>
      <button onClick={onClick}>Child Increment</button>
    </div>
  );
});

//---------------------usecontext-api----------
const Contextapi = createContext();
function Usecontextapi({ children }) {
  const [post, setpost] = useState(true);
  const [model, setmodel] = useState(false);

  return (
    <Contextapi.Provider value={{ post, setpost, model, setmodel }}>
      {children}
    </Contextapi.Provider>
  );
}

function Gettingcontext() {
  const { post, setpost, model, setmodel } = useContext(Contextapi);
  return <div>{post.toString()}hi</div>;
}

//---------------useTransition------------------------
const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

function UseTransition() {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    // Start a transition for the filtering
    startTransition(() => {
      const result = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(result);
    });
  };

  return (
    <div>
      <h1>Filter Large List</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search items..."
        style={{ marginBottom: "10px" }}
      />
      {isPending && <p>Filtering...</p>}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
//-----------coustam hook and usedebughook-----------------

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Add a debug value for better clarity in React DevTools
  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}

//----------------useid-------------------------------------
function Useid() {
  const id = useId();
  console.log(id);
  //this creates an uniq id that used for forme name so we donot get conflict re-using
}

export default App;

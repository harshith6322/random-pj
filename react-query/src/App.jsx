import { useQuery } from "@tanstack/react-query";
import { fetchpostapi } from "./api/api";

function App() {
  const {
    data: postdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchpostapi,
  });
  // console.log(, isLoading, status);
  return (
    <div className="main">
      {isLoading && <p>loading....</p>}
      {isError && <p>error while fetch</p>}
      {postdata?.map((post) => {
        return (
          <div key={post.id} className="main-box">
            <div className="box">
              {post.id}. {post.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

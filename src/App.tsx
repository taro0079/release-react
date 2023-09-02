import { useState } from "react";
import "./App.css";

type Author = {
  name: string;
  email: string;
  date: Date;
};

type Commit = {
  author: Author;
  message: string;
};
type CommitData = {
  commit: Commit;
};

const App = () => {
  const [data, setData] = useState<string[] | null>(null);
    const [editedData,setEditedData]=useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url =
    import.meta.env.VITE_GITHUB_URL + "pulls/3977/commits";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer "+ import.meta.env.VITE_GITHUB_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error("Response is Error!");
      }
      const responseData: CommitData[] = await response.json();
      const result = responseData.map((data) => {
        return data.commit.message;
      });
      setData(result);
            setEditedData(result?.join("\n"))
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
    const handleTextAreaChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedData(event.target.value)
    }
  return (
    <div>
      <div>
        <h1>りりーすつーる べーたばん</h1>
      </div>
      <div className="staging">
        <p>PRの番号をいれて</p>
        <input type="number"></input>
        <button onClick={fetchData}>Fetch Data</button>
      </div>

      {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
      {data &&
        data.map((d, i) => (
          <p key={i} style={{ textAlign: "left" }}>
            {d}
          </p>
        ))}
      {data && (
        <div>
          <textarea value={editedData} onChange={handleTextAreaChange} />
        </div>
      )}
    </div>
  );
  //
  // const prs = getPr(url)
};

export default App;

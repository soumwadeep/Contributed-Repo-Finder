import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (username !== "") {
      fetchContributedRepositories();
    }
  }, [page]);

  const fetchContributedRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?type=all&page=${page}&per_page=30`
      );
      setRepositories((prevRepositories) => [
        ...prevRepositories,
        ...response.data,
      ]);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section>
      <div className="container">
        <h1 className="text-center">Welcome To Contributed Repo Finder</h1>
        <h4 className="text-center mb-3">
          Enter The Github Username Here And Click On Fetch To Fetch The
          Contributed Repos Of The User:
        </h4>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="btn btn-info"
            type="button"
            id="button-addon2"
            onClick={fetchContributedRepositories}
          >
            Fetch
          </button>
        </div>
        <ul>
          {repositories.map((repo) => (
            <div key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Forks: {repo.forks_count}</p>
            </div>
          ))}
        </ul>
        {repositories.length > 0 && (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </section>
  );
};

export default App;

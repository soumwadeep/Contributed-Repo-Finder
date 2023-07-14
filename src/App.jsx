import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  const fetchContributedRepositories = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?type=all`
      );
      const data = await response.json();
      setRepositories(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <div>
      <h1>Github Contributed Repository List</h1>
      <input
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchContributedRepositories}>
        Fetch Contributed Repositories
      </button>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

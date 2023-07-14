import { useState } from "react";
import axios from "axios";

const AxiosImplementation = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  const fetchContributedRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?type=all`
      );
      setRepositories(response.data);
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
          <li key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosImplementation;

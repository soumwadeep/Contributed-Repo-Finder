import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (username !== "") {
      fetchContributedRepositories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchContributedRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?type=all&page=${page}&per_page=30`
      );
      setRepositories(response.data);
      setHasNextPage(response.data.length === 30);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowBackToTop(scrollTop > 0);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
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
      <div>
        {repositories.map((repo) => (
          <div className="card mt-5" key={repo.id}>
            <div className="card-body">
              <h3 className="card-title">{repo.name}</h3>
              <p className="card-text">{repo.description}</p>
              <button className="btn btn-info me-4">
                <i className="fa-regular fa-star iconfix"></i>
                {repo.stargazers_count}
              </button>
              <button className="btn btn-info">
                <i className="fa-solid fa-code-fork iconfix"></i>
                {repo.stargazers_count}
              </button>
            </div>
          </div>
        ))}
      </div>
      {repositories.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handlePreviousPage}
            className="btn btn-warning me-3"
            disabled={page === 1}
          >
            <i className="fa-solid fa-circle-chevron-left iconfix"></i>
          </button>
          {hasNextPage && (
            <button className="btn btn-warning" onClick={handleNextPage}>
              <i className="fa-solid fa-circle-chevron-right iconfix"></i>
            </button>
          )}
        </div>
      )}
      {showBackToTop && (
        <button
          className="btn btn-info sticky-bottom btnpos"
          onClick={handleScrollToTop}
        >
          <i className="fa-solid fa-circle-chevron-up iconfix"></i>
        </button>
      )}
      <footer className="text-center mt-3">
        <h5>Copyright 2023. All Rights Reserved By Cotributed Repo Finder.</h5>
      </footer>
    </div>
  );
};

export default App;

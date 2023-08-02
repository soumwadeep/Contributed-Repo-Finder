import { useState, useEffect } from "react";
import {
  fetchContributedRepositories,
  handlePreviousPage,
  handleNextPage,
  handleScrollToTop,
} from "./components/FetchContributedRepositories";
import logo from "./icon.webp";

const App = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchClicked, setIsFetchClicked] = useState(false);
  const [isSearchNewClicked, setIsSearchNewClicked] = useState(false);

  useEffect(() => {
    if (username !== "" && isFetchClicked) {
      fetchContributedRepositories(
        username,
        page,
        setRepositories,
        setHasNextPage
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isFetchClicked]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowBackToTop(scrollTop > 0);
  };

  const handleFetchRepositories = () => {
    setPage(1);
    setRepositories([]);
    setHasNextPage(true);
    setIsFetchClicked(true);
    setIsLoading(true);
  };

  const handleSearchNew = () => {
    setIsSearchNewClicked(true);
  };

  useEffect(() => {
    if (isFetchClicked) {
      setIsLoading(false);
    }
  }, [isFetchClicked]);

  useEffect(() => {
    if (isSearchNewClicked) {
      window.location.reload();
    }
  }, [isSearchNewClicked]);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-3 mb-4">
          <img src={logo} alt="logo" className="logo" /> Welcome To Contributed
          Repo Finder
        </h1>
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
            disabled={isFetchClicked}
          />
          <button
            className="btn btn-info"
            type="button"
            id="button-addon2"
            onClick={handleFetchRepositories}
            disabled={isLoading || isFetchClicked}
          >
            {isLoading ? "Fetching..." : "Fetch"}
          </button>
        </div>
        <div>
          {repositories.length === 0 && !isLoading && isFetchClicked ? (
            <p className="text-center mt-3">No Repositories Found.</p>
          ) : (
            repositories.map((repo) => (
              <div className="card mt-5" key={repo.id}>
                <div className="card-body">
                  <a href={repo.clone_url} target="_blank" rel="noreferrer">
                    <h3 className="card-title">{repo.name}</h3>
                  </a>
                  <p className="card-text">{repo.description}</p>
                  <button className="btn btn-info me-4">
                    <i className="fa-regular fa-star iconfix"></i>
                    {repo.stargazers_count}
                  </button>
                  <button className="btn btn-info">
                    <i className="fa-solid fa-code-fork iconfix"></i>
                    {repo.forks_count}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {repositories.length > 0 && (
          <div className="mt-4">
            {page > 1 && (
              <button
                onClick={() => handlePreviousPage(setPage)}
                className="btn btn-warning me-3"
              >
                <i className="fa-solid fa-circle-chevron-left iconfix"></i>
              </button>
            )}
            {hasNextPage && (
              <button
                className="btn btn-warning"
                onClick={() => handleNextPage(setPage)}
              >
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
        <div className="mt-4">
          <button
            className="btn btn-success"
            onClick={handleSearchNew}
            disabled={isSearchNewClicked}
          >
            Search New User
          </button>
        </div>
      </div>
      <footer className="text-center mt-3">
        <h5>© 2023. All Rights Reserved By Contributed Repo Finder.</h5>
      </footer>
    </>
  );
};

export default App;

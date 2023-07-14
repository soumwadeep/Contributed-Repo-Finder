import axios from "axios";

export const fetchContributedRepositories = async (
  username,
  page,
  setRepositories,
  setHasNextPage
) => {
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

export const handlePreviousPage = (setPage) => {
  setPage((prevPage) => prevPage - 1);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const handleNextPage = (setPage) => {
  setPage((prevPage) => prevPage + 1);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

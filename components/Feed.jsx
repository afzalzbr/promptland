"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((prompt) => (
        <PromptCard
          key={prompt?._id}
          post={prompt}
          tag={prompt?.tag}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // case insensitive
    return posts.filter(
      (prompt) =>
        regex.test(prompt?.tag) ||
        regex.test(prompt?.username) ||
        regex.test(prompt?.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce search
    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPrompts(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchedResults(filterPrompts(tag));
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      {searchText != "" ? (
        <PromptCardList data={searchedResults || []} handleTagClick={handleTagClick} />
      ) : (
        posts.length > 0 && (
          <PromptCardList data={posts || []} handleTagClick={handleTagClick} />
        )
      )}
    </section>
  );
};

export default Feed;

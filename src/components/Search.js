import React, { useEffect, useState } from "react";
import { getDB } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  whereField,
  getDocs,
} from "firebase/firestore";
import BarLoaderIcon from "./BarLoaderIcon";
import { Link } from "react-router-dom";
import { SecondaryLink, StyledLink } from "./styled/Links.styled";
import searchImg from "../images/search.svg";
import { SearchButton } from "./styled/SearchButton.styled";
import { StyledSearch } from "./styled/Search.styled";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  function handleInput(e) {
    setSearchTerm(() => e.target.value);
  }

  async function handleSearch() {
    setIsLoading(() => true);
    setDisplayResults(() => true);
    const usersRef = collection(getDB(), "users");
    const tagQuery = query(usersRef, where("tag", "==", searchTerm));
    const nameQuery = query(usersRef, where("displayName", "==", searchTerm));

    const results = await Promise.all([getDocs(tagQuery), getDocs(nameQuery)]);
    const data = [];
    results.forEach((result) => {
      result.forEach((doc) => {
        const exists = data.find((item) => item.tag === doc.data().tag);
        if (!exists) {
          data.push({ ...doc.data() });
        } else {
          return;
        }
      });
    });
    setIsLoading(() => false);
    setSearchResults(() => [...data]);
  }

  let displayItem;

  if (displayResults && searchResults.length === 0 && !isLoading) {
    displayItem = (
      <div style={{ padding: "10px 0px" }}>
        <p style={{ paddingBottom: "10px" }}>
          No users were found. If you expected a result, try again with proper
          casing, as results are case sensitive.
        </p>
        <button
          onClick={() => {
            setDisplayResults(() => false);
            setSearchResults(() => []);
          }}
        >
          Close Search
        </button>
      </div>
    );
  } else if (isLoading) {
    displayItem = <BarLoaderIcon />;
  } else {
    displayItem = null;
  }

  return (
    <div
      style={{
        marginBottom: "240px",
        padding: "10px",
        position: "relative",
      }}
    >
      <StyledSearch>
        <input
          placeholder={"Search"}
          defaultValue={"Search for user"}
          type="text"
          value={searchTerm}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            } else if (e.key === "Escape") {
              setDisplayResults(() => false);
              setSearchResults(() => []);
            }
          }}
        />
        <SearchButton type="button" onClick={handleSearch}>
          <img style={{ width: "20px" }} src={searchImg} alt="search" />
        </SearchButton>
      </StyledSearch>

      <div
        style={
          displayResults
            ? {
                position: "absolute",
                zIndex: "3",
                backgroundColor: "#15202B",
                width: "calc(100% - 20px)",
                border: "1px solid #ababab",
                borderTop: "none",
                left: "10px",
                padding: "15px 10px",
              }
            : null
        }
      >
        {searchResults.length > 0 && displayResults
          ? searchResults.map((result) => {
              return (
                <div
                  style={{
                    padding: "10px",
                    position: "relative",
                  }}
                  key={result.tag}
                >
                  <StyledLink as="a" href={`/profiles/${result.tag}`}>
                    <p style={{ fontSize: "1.3rem" }}>{result.displayName}</p>
                  </StyledLink>
                  <SecondaryLink as="a" href={`/profiles/${result.tag}`}>
                    <p style={{ fontSize: "0.8rem" }}>
                      @<span style={{ fontSize: "0.95rem" }}>{result.tag}</span>
                    </p>
                  </SecondaryLink>
                  <button
                    style={{ position: "absolute", top: "0", right: "0" }}
                    onClick={() => {
                      setDisplayResults(() => false);
                      setSearchResults(() => []);
                    }}
                  >
                    Close Search
                  </button>
                </div>
              );
            })
          : displayItem}
      </div>
    </div>
  );
}

export default Search;

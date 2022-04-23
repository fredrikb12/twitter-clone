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
import { StyledLink } from "./styled/Link.styled";

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
    displayItem = (
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    );
  }

  return (
    <div
      style={{ marginBottom: "240px", padding: "10px", position: "relative" }}
    >
      <label>
        Search for user:
        <input type="text" value={searchTerm} onChange={handleInput} />
      </label>

      <div
        style={{
          position: "absolute",
          zIndex: "3",
          backgroundColor: "#15202B",
          width: "calc(100% - 10px)",
          border: "none",
          left: "-10px",
          paddingTop: "10px",
          minHeight: "200px",
        }}
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
                  <StyledLink
                    as="a"
                    textColor="#efefef"
                    href={`/profiles/${result.tag}`}
                  >
                    <p style={{ fontSize: "1.3rem" }}>{result.displayName}</p>
                  </StyledLink>
                  <StyledLink
                    as="a"
                    textColor="#efefef"
                    href={`/profiles/${result.tag}`}
                  >
                    <p style={{ fontSize: "0.9rem" }}>@{result.tag}</p>
                  </StyledLink>
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
            })
          : displayItem}
      </div>
    </div>
  );
}

export default Search;

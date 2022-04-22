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

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  function handleInput(e) {
    setSearchTerm(() => e.target.value);
  }

  async function handleSearch() {
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
    setSearchResults(() => [...data]);
  }

  return (
    <div style={{ marginBottom: "40px", padding: "10px" }}>
      <label>
        Search for user:
        <input type="text" value={searchTerm} onChange={handleInput} />
      </label>

      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                position: "relative",
              }}
              key={result.tag}
            >
              <p style={{ fontSize: "1.3rem" }}>{result.displayName}</p>
              <p style={{ fontSize: "0.9rem", color: "#1f1f1f" }}>
                @{result.tag}
              </p>
              <button onClick={() => setSearchResults([])}>Close Search</button>
            </div>
          );
        })
      ) : (
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      )}
    </div>
  );
}

export default Search;

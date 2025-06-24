import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { signOutUser } from "../utils/signOutUser";
import { useNavigate } from "react-router-dom";

import { doc, updateDoc } from "firebase/firestore"; // ✅ import Firestore methods
import { db } from "../firebase"; // ✅ import your Firestore instance

const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  margin-bottom: 1rem;

  label {
    flex: 1 1 200px;
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    font-weight: 600;

    input {
      padding: 0.5rem;
      border: 2px solid #707070;
      border-radius: 0.5rem;
      background: none;
      margin-top: 0.25rem;
      font-size: 1rem;
      width: 100%;

      &:focus {
        outline: 1px solid #707070;
      }
    }
  }
`;

const SubmitButton = styled.button`
background: #f8b0ff;
  border: 2px solid rgb(200, 135, 206);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  align-items: center;
  width: 30%;
  
  &:hover {
  background:rgb(218, 151, 224);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ClearHistory = styled.button`
background: #f8b0ff;
  border: 2px solid rgb(200, 135, 206);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  align-items: center;
  
  &:hover {
  background:rgb(218, 151, 224);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin: 2rem 0 1rem;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;

  th,
  td {
    border-bottom: 1px solid black;
    padding: 0.75rem;
    text-align: left;
    background: none !important;
    /* background-color: none; */
  }
  th {
    font-weight: bold;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem
`

const SignOutButton = styled.button`
 background: #b93bf6;
  color: #fff;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 3rem; 
  cursor: pointer;
  &:hover {
    background:rgb(88, 20, 122);
    transition: background 0.3s ease;   
  }
  `;

const Dashboard = () => {

 const [username, setUsername] = useState(
    localStorage.getItem("igUsername") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("igPassword") || ""
  );
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, userData, setUserData, currentUser } = useAuth(); // directly use it
  const [postUrl, setPostUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState({}); // track toggled view per history row

  useEffect(() => {
    const saved = localStorage.getItem("scrapeHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Sync username/password to localStorage
  useEffect(() => {
    localStorage.setItem("igUsername", username);
  }, [username]);
  useEffect(() => {
    localStorage.setItem("igPassword", password);
  }, [password]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResults(null);
    
    if (userData.coins <= 0) {
      setError("You have no coins left. Please buy more.");
      return;
    }

    const alreadyScraped = history.some((item) => item.postUrl === postUrl);
    if (alreadyScraped) {
      const proceed = window.confirm(
        "You've already scraped this post. Scrape again?"
      );
      if (!proceed) return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://getting-americans-back-2.onrender.com/api/scrape",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, postUrl }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Server error");
      }

      const data = await res.json();
      setResults(data);

       const newCoins = userData.coins - 1;
      await updateDoc(doc(db, "users", currentUser.uid), { coins: newCoins });

      // ✅ Sync coins in context
      setUserData((prev) => ({ ...prev, coins: newCoins }));

      const newEntry = {
        postUrl,
        links: data.links,
        timestamp: new Date().toISOString(),
      };
      const updated = [...history, newEntry];
      localStorage.setItem("scrapeHistory", JSON.stringify(updated));
      setHistory(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    localStorage.removeItem("scrapeHistory");
    setHistory([]);
  }

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };


  const handleSignOut = async () => {
    const success = await signOutUser();
    if (success) {
      setIsLoggedIn(false); 
      navigate("/"); // back to home or login
    }
  };


    return (
        <>
         <form onSubmit={handleSubmit}>
        <InputGroup>
          <label>
            Instagram Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </label>
          <label>
            Instagram Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>
        </InputGroup>
        <InputGroup>
          <label style={{ flex: "1 1 100%" }}>
            Target Post URL
            <input
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              required
              placeholder="https://www.instagram.com/p/..."
            />
          </label>
        </InputGroup>
          <SubmitButton type="submit" disabled={loading}>
          {loading ? "Scraping..." : "Scrape"}
        </SubmitButton>
      </form>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {results && results.links?.length > 0 && (
        <>
          <SectionTitle>Results</SectionTitle>
          <p>Found {results.links.length} usernames:</p>
          <ul>
            {results.links.map((link) => (
              <li key={link}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {history.length > 0 && (
        <>
          <SectionTitle>History</SectionTitle>
          <HistoryTable>
            <thead>
              <tr>
                <th>Post URL</th>
                <th>Usernames Found</th>
                <th>Date & Time</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <a href={entry.postUrl} target="_blank" rel="noreferrer">
                        {entry.postUrl}
                      </a>
                    </td>
                    <td>{entry.links.length}</td>
                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    <td>
                      <ToggleButton onClick={() => toggleRow(index)}>
                        {expandedRows[index] ? "Hide" : "View"}
                      </ToggleButton>
                    </td>
                  </tr>
                  {expandedRows[index] && (
                    <tr>
                      <td colSpan={4}>
                        {entry.links.length > 0 ? (
                          <ul style={{ listStyle: "none", padding: 0 }}>
                          <p style={{fontWeight: "bold"}}>Usernames:</p>
                            {entry.links.map((link) => (
                              <li key={link} style={{ marginBottom: "0.25rem" }}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {link}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No usernames found.</p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </HistoryTable>
          <ClearHistory onClick={clearHistory}>
            Clear History
          </ClearHistory>
       
        </>
      )}
         <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </>
    )

}

export default Dashboard;
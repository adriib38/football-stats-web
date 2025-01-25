import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import styled from "styled-components";

export default function SearchHeader() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);

  const Ul = styled.ul`
    position: absolute;
    background: white;
    padding: 10px;
    text-align: left;
    list-style: none;
    width: 160px;

    &.visible {
      display: block;
    }

    &.invisible {
      display: none;
    }
  `;

  const inputStyle = {
    transition: "0.5s",
    outline: "none",
    border: "3px solid #555",
    borderRadius: "3px",
    padding: "10px 5px",
    width: "100%"
  }

  const fetchData = async () => {
    const url = `https://seal-app-myhre.ondigitalocean.app /t/q/${query}`;
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
      }
      const data = await res.json();

      setTeams(data);
    } catch (e) {}
  };

  const textbox = document.getElementById("textbox");
  const handleButton = () => {
    textbox.value = "";
    setQuery("");
    setTeams("");
  };

  useEffect(() => {
    if (query) {
      fetchData();
    } else {
      setTeams([]);
    }
  }, [query]);

  return (
    <>
      <input
        style={inputStyle}
        id="textbox"
        type="text"
        name="query"
        placeholder="Buscar equipo"
        onChange={(e) => setQuery(e.target.value)}
      />

      <Ul className={teams.length > 0 ? "visible" : "invisible"}>
        {teams.length > 0 &&
          teams.map((team, index) => (
            <li
              key={index}
              onClick={() => handleButton(team)}
              value={team.Squad}
            >
              <Link to={`/t/${team.Squad}`}>{team.Squad}</Link>
            </li>
          ))}
      </Ul>
    </>
  );
}

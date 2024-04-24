import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import ClassLocations from "./Models/Locations";

function Dashboard(props) {
  const cookies = new Cookies();
  const classLocations = new ClassLocations();
  const [owner, setOwner] = useState(cookies.get("owner"));
  const [user, setUser] = useState(cookies.get("user"));
  const [token, setToken] = useState(cookies.get("token"));

  const [locations, setLocations] = useState("");

  //charge data onload
  useEffect(() => {
    setLocations(classLocations.FetchLocationsALL(owner, user, token));
    console.log(locations);
  }, []);

  return (
    <>
      <h1>owner: {owner}</h1>
      <h3>user: {user}</h3>
      <h4>token: {token}</h4>
      <h4>token: {locations}</h4>
    </>
  );
}

Dashboard.propTypes = {};

export default Dashboard;

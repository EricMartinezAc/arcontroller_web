import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import ClassLocations from "./Models/Locations";
import "./Dashboard.css";

import FormLocation from "./Partials/Forms/LocationsAll";

function Dashboard(props) {
  const cookies = new Cookies();
  const classLocations = new ClassLocations();
  const [owner, setOwner] = useState(cookies.get("owner"));
  const [user, setUser] = useState(cookies.get("user"));
  const [token, setToken] = useState(cookies.get("token"));

  const [locations, setLocations] = useState([]);

  const resetApp = () => {
    window.location = "/Singin";
  };

  //charge data onload
  useEffect(() => {
    if (
      typeof cookies.get("user") === "undefined" ||
      typeof cookies.get("token") === "undefined"
    ) {
      resetApp();
    }
    const resptAPIFetchLocation = classLocations.FetchLocationsALL(
      owner,
      user,
      token
    );
    setLocations([resptAPIFetchLocation]);
    console.log([1, locations, resptAPIFetchLocation]);
  }, []);

  return (
    <>
      <h1>owner: {owner}</h1>
      <h3>user: {user}</h3>
      <h4>token: {token}</h4>
      {locations.map((el, key) => {
        <h4>locations: {el}</h4>;
      })}
      <button></button>
      <FormLocation user={user} token={token} />
    </>
  );
}

Dashboard.propTypes = {};

export default Dashboard;

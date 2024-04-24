import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

function Dashboard(props) {
  const cookies = new Cookies();
  const [owner, setOwner] = useState(cookies.get("owner"));
  const [user, setUser] = useState(cookies.get("user"));
  const [token, setToken] = useState(cookies.get("token"));

  useEffect(() => {}, []);

  return (
    <>
      <h1>owner: {owner}</h1>
      <h3>user: {user}</h3>
      <h4>token: {token}</h4>
    </>
  );
}

Dashboard.propTypes = {};

export default Dashboard;

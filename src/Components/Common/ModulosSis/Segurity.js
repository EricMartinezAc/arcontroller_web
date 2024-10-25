const ValideDatosMiddle = (proceso, datos) => {
  if (proceso === "branch/add/any") {
    console.log("validacion de datos", [proceso, datos]);
  }
  return true;
};

module.exports = { ValideDatosMiddle };

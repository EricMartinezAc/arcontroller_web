const ValideDatosMiddle = (proceso, datos) => {
  if (proceso === "branch/add/any") {
    console.log([proceso, datos]);
  }
  return true;
};

module.exports = { ValideDatosMiddle };

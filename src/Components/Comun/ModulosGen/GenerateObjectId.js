var GenerateObjectId = function async() {
  var timestamp = await((new Date().getTime() / 1000) | 0).toString(16);
  return "obj";
};

var GenerateObjectId = function async () {
  var timestamp = await ((new Date().getTime() / 1000) | 0).toString(16);
  const resp =
    await timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase();
    console.log(await resp)
    return await resp
};

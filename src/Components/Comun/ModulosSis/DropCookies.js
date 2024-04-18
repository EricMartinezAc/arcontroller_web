const All = (cookies, path) => {
  const allCookies = cookies.getAll();
  for (const key in allCookies) {
    cookies.remove(key, { path });
  }
};
const Any = (cookies, keys, path) => {
  keys.forEach((key) => {
    cookies.remove(key, { path });
  });
};

module.exports = { All, Any };

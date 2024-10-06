export const DropAll = (cookies, path) => {
  const allCookies = cookies.getAll();

  console.log("drop");
  Object.keys(allCookies).forEach((cookie) => {
    cookies.remove(cookie, { path });
  });
};
export const DropAny = (cookies, keys, path) => {
  keys.forEach((key) => {
    cookies.remove(key, { path });
  });
};

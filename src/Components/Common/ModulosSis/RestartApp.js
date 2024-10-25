export default function RestartApp(cookies, DescriptionAlerts, valuesAlert) {
  const keyDatosCookies = cookies.getAll();
  console.log(keyDatosCookies);
  if (Object.keys(keyDatosCookies).length > 0) {
    Object.keys(keyDatosCookies).forEach((key) => {
      cookies.remove(key, {
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 36000,
      });
    });
    DescriptionAlerts[1]([
      valuesAlert[0],
      valuesAlert[1],
      valuesAlert[2],
      valuesAlert[3],
      valuesAlert[4],
    ]);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
}

import { Routes as pages } from "../../../../constans";

export const loadData = async (user, email, token) => {
  try {
    const respSendDats = await fetch(pages.API_URL_SESSIONS_VALIDETOKEN, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, email, token }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return await respSendDats;
  } catch (error) {
    alert(`no se pudo realizar envio de datos: ${error}`);
    return { statusCode: 403, error: error };
  }
};

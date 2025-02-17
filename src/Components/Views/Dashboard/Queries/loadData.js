import { Routes as pages } from "../../../../constans";

export const loadData = async (user) => {
  const path_API = await `${pages.remoteApi}arcontroller/web/loadAllData`;
  try {
    const respSendDats = await fetch(path_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return await respSendDats;
  } catch (error) {
    alert(`no se pudo realizar envio de datos: ${error}`);
    return { statusCode: 403, error: error };
  }
};

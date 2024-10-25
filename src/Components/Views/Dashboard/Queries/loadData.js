import { Routes as pages } from "../../../../constans";

export const loadData = async (owner, token, _id) => {
  const path_API = await `${pages.remoteApi}arcontroller/web/loadAllData`;
  console.log(path_API);
  try {
    const respSendDats = await fetch(path_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ owner, token, _id }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return await respSendDats;
  } catch (error) {
    alert(`no se pudo realizar envio de datos: ${error}`);
    return { statusCode: 403, error: error };
  }
};

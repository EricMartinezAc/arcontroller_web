import { Dispatch, SetStateAction } from "react";

export interface UserDTO {
  _id?: string;
  user: string;
  pswLogin: string;
  token?: string;
  rol: string;
  id_prodct?: string;
  setUser?: Dispatch<SetStateAction<UserDTO>>;
}

import { BranchesDTO } from "./Branches.dto";
import { ProdctDTO } from "./Prodct.dto";
import { UserDTO } from "./User.dto";

export interface SinginProps {
  user: UserDTO;
  setUser: React.Dispatch<React.SetStateAction<UserDTO>>;
  product: ProdctDTO;
  setProduct: React.Dispatch<React.SetStateAction<ProdctDTO>>;
  branches: BranchesDTO;
  setBranches: React.Dispatch<React.SetStateAction<BranchesDTO>>;
}

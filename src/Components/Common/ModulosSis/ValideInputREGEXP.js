const ExprRegulares = {
  product: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  clav_prodct: /^(?=.*[A-Z])(?=.*[*.@_-])[a-zA-Z0-9*.@_-]{4,16}$/,
  usuario: /^(?=.*[A-Z])(?=.*[*.@_-])[a-zA-Z0-9*.@_-]{4,30}$/,
  password: /^(?=.*[A-Z])(?=.*[*.@_-])[a-zA-Z0-9*.@_-]{4,12}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  rol: /^[POM]{2}$/,
};

export const ValideInputProduct = (product) => {
  return ExprRegulares.product.test(product) ? true : false;
};
export const ValideInputClavProduct = (clav_prodct) => {
  return ExprRegulares.clav_prodct.test(clav_prodct) ? true : false;
};

export const ValideInputUsuario = (usuario_) => {
  return ExprRegulares.usuario.test(usuario_) ? true : false;
};
export const ValideInputPassword = (password_) => {
  return ExprRegulares.password.test(password_) ? true : false;
};

export const ValideRol = (rol) => {
  return ExprRegulares.rol.test(rol) ? true : false;
};
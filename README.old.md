# arcontroller_web
#here
- Auth and Register:
    * nombre del producto: El dirección email con que se aquirió el producto. Use 'arcontroller@climatecontrolsing.com' como modo prueba.
    Validación de datos: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/' 
        1. No puede ser vacío.
        2. Tipo email.
        3. Solo alfanumericos despues del @.
        4. Dominio superior como .net, .com, almenos 2 caracteres alfanumericos.
        (recuerda que no permite correos con dominio gmail.com, outlook.com, etc, solo dominios personalizados. estos son requisitos del backend)

    * Clave del producto: El codigo enviado a su dirección email una vez comprado el producto. Use 'Arc2025*' como modo prueba.
    Validación de datos: '/^(?=.*[A-Z])(?=.*[*.@_-])[a-zA-Z0-9*.@_-]{4,16}$/'
        1. No puede ser vacío ni tener espacios..
        2. Tipo Alfanumérico, entre 4 y 16 caracteres.
        3. Permite letras mayúsculas y minúsculas. Asegurate que haya al menos una letra mayúscula.
        4. Permite números (0-9).
        5. Permite especiales (*.@_-). Asegurate que haya al menos un carácter especial de los permitidos.

    * Nombre de usuario: Usuario registrado desde la plataforma en modo Register.
    Use 'ArturoMartinez1992*' en modo de prueba.
    Validación de datos: '/^(?=.*[A-Z])(?=.*[*.@_-])[a-zA-Z0-9*.@_-]{4,30}$/'
        1. No puede ser vacío ni tener espacios..
        2. Tipo Alfanumérico, entre 4 y 30 caracteres.
        3. Permite letras mayúsculas y minúsculas. Asegurate que haya al menos una letra mayúscula.
        4. Permite números (0-9).
        5. Permite especiales (*.@_-). Asegurate que haya al menos un carácter especial de los permitidos.
        
    * Contraseña de usuario: Password registrado desde la plataforma en modo Register.
    Use 'Arc2025*' en modo de prueba.
    Validación de datos: '/^(?=.*[A-Z])(?=.*[*.@_-])[a-zA-Z0-9*.@_-]{4,12}$/'
        1. No puede ser vacío ni tener espacios..
        2. Tipo Alfanumérico, entre 4 y 12 caracteres.
        3. Permite letras mayúsculas y minúsculas. Asegurate que haya al menos una letra mayúscula.
        4. Permite números (0-9).
        5. Permite especiales (*.@_-). Asegurate que haya al menos un carácter especial de los permitidos.
    
    * Rol de usuario: Rol a ingresra solo en la plataforma en modo Register, es el rol inicial que le otorgará permisos sobre los demás usuarios. Puede ser 'project manager'(PO), o 'product manager' (PM). Por defecto es 'PM', al activarlo, sería 'PO'.
    Validación de datos es interna a la plataforma, debido a que el usuario está obligado a elegir un rol:
    '^[POM]{2}$'
        1. Permite solo 2 caracteres.
        2. Solo permite letras P, O y M. 
        3. No permite espacios.

Los datos son enviados a un backend privado, App queda en espera de respuesta


# DESAFIO_Usando_Objeto_PROCESS_EZEQUIEL_PETRONE

Código auto-comentado!

En config/config.js uso DOTENV para setear credenciales de MONGO DB, la cant default de la api que calcula nros random y tiempo de expiración de la sesión Passport según lo que diga el file .env

Además en config/config.js utilizo YARGS para setear el Puerto según parámetro de entrada por CLI.
Se puede usar: -p | --puerto | --port
Ejemplo: node server.js -p 8081

También en config/config.js armo el objeto que utilizo en la ruta '/info' para mostrar información sobre el Node Process. (Esa vista la dejé como un JSON formateado, si me alcanza el tiempo le hago un html...)

En routes/routes.js el manejo de rutas/endpoints de todo lo que es home, login, signup, logout e info.

En routes/apiRouter.js el cálculo de los nros aleatorios.

La actualización de productos no la manejo con un router sino en paralelo mediante sockets.



Si bien cumple perfectamente con las consignas, me hubiese gustado poder invertirle más tiempo al desafío para:
- GENERAR VISTA HTML A LA RUTA '/INFO' EN VEZ DE QUE SEA UN JSON!
- Me falta terminar la lógica del cálculo... Todo lo relacionado a crear el fork y comunicar padre e hijo está implementado, pero me falta que el algoritmo sea el de la consigna.
- Intentar hacer llegar los msjs que defino dentro de las estrategias de passport al front (y de esa forma poder informar con mayor detalle si el error de login es que el user no existe o si le pifiaron en la contraseña por ejemplo) Googleando leí que no era tan simple pero de alguna forma u otra se logra.
- Abstraer todo lo relacionado al crud de usuarios en un DAO y no utilizar las funciones nativas de mongo en la configuración de passport...
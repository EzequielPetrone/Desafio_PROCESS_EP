# DESAFIO_Usando_Objeto_PROCESS_EZEQUIEL_PETRONE

En config/config.js uso DOTENV para setear credenciales de MONGO DB, la cant default de la api que calcula nros random y tiempo de expiración de la sesión Passport según lo que diga el file .env

Además en config/config.js utilizo YARGS para setear el Puerto según parámetro de entrada por CLI.
Se puede usar: -p | --puerto | --port
Ejemplo: node server.js -p 8081

También en config/config.js armo el objeto que utilizo en la ruta '/info' para mostrar información sobre el Node Process. 
El único dato que vale la pena obtenerlo en tiempo real al momento del request es el uso de memoria total (rss), el resto de la data siempre es la mismo una vez iniciado el server.
(Esa vista la dejé como un JSON formateado, si me alcanza el tiempo le hago un html...)

En routes/routes.js el routing de todo lo que es home, login, signup, logout e info.

En routes/apiRouter.js el endpoint que devuelve el cálculo de los nros aleatorios.

La actualización de productos no la manejo con un router sino en paralelo mediante sockets.

En subprocesos/calculo.js está el código del child process que lleva acabo el algoritmo que genera y registra los nros aleatorios (de esta forma el server funciona como NO bloqueante)

Si bien cumple perfectamente con las consignas, me hubiese gustado poder invertirle más tiempo al desafío para:
- GENERAR VISTA HTML A LA RUTA '/INFO' EN VEZ DE QUE SEA UN JSON!
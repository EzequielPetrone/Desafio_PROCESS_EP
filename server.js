//Importo y configuro server http y socket
const express = require('express');
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

//Importo otras dependencias
const session = require('express-session');
const handlebars = require('express-handlebars');
const passport = require('passport');

const { PORT, EXP_TIME } = require('./src/config/config') //Importo variables de config

//Importo y seteo contenedor de productos
const { ProductosDaoMongo } = require('./src/daos/productos/ProductosDaoMongo')
const contenedorProd = new ProductosDaoMongo()

//Seteo HBS views
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "/src/views/partials/",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

//Seteo 'public' como static
app.use(express.static(__dirname + "/public"));

//Configuro Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err });
})

//Configuro session e inicializo passport
app.use(session({
    secret: 'clave_test_eze',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: EXP_TIME
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Seteo Routers
const apiRouter = require('./src/routes/apiRouter');
app.use('/api', apiRouter)
const router = require('./src/routes/routes');
app.use('/', router)

//Gestiono conexión con socket clients
io.on('connection', async (socket) => {

    //Envío al nuevo socket los productos registrados al momento
    socket.emit('PRODLIST', await contenedorProd.getAll())

    //Recibo, guardo y retransmito Productos
    socket.on('NEWPROD', async (data) => {
        try {
            let newId = await contenedorProd.saveProducto(data)
            if (newId) {
                io.sockets.emit('PRODLIST', await contenedorProd.getAll());
            } else {
                throw 'Error al guardar nuevo producto'
            }
        } catch (error) {
            console.log(error);
        }
    });
});

//Socket.io Error logging
io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

//Pongo a escuchar al server
try {
    httpServer.listen(PORT, () => console.log(`Server running. PORT: ${httpServer.address().port}`));

} catch (error) {
    //Si falla el listen al puerto estipulado pruebo que se me asigne automáticamente otro puerto libre...
    httpServer.listen(0, () => console.log(`Server running. PORT: ${httpServer.address().port}`));
}
//Server Error handling
httpServer.on("error", error => console.log('Error en el servidor:', error))
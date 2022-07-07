//Importo y configuro el router
const { Router } = require('express')
const apiRouter = Router()

const { CANT_DEFAULT } = require('../config/config') //Importo variable de entorno

const { fork } = require('child_process'); // Importo fork de child_process

// api/randoms calcula nros aleatorios
apiRouter.get('/randoms', (req, res) => {
    // Tomamos el query param CANT del request, en caso que no venga o no sea un nro válido uso valor por default (seteado en el .env)
    const qty = Math.abs(parseInt(req.query.cant) || CANT_DEFAULT)

    const calculo = fork('./src/subprocesos/calculo')

    calculo.send(qty);

    calculo.on('message', result => {
        res.end(JSON.stringify(result))
        // res.end(`La suma es ${sum}`)
    })
});


module.exports = apiRouter
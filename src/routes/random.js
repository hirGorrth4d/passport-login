const {Router} = require('express');
const {fork} = require('child-process');
const path = require('path');
const router = Router()
const scriptPath = path.resolve(__dirname, '../utils/op.js')

router.get('/randoms', (req,res) => {
    const cant = req.query.cant || 10000000
    const computo = fork(scriptPath)

    computo.send(cant)


    computo.on('message', (resultado) => {
        res.json({
            result: resultado
        })
    })
})

module.exports= router
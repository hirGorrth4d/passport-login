const datos = {
    puerto: process.argv.puerto,
    proceso: process.pid
}


const calculo = (cant) => {
    const between = (min, max) => {
        return Math.floor(Math.random()* (max-min) + min);
    }

    const limiteInf= 1;
    const limiteSup= 1000;

    const output= {}

    for (let i = 0; i < cant; i++) {
        const valor = between(limiteInf, limiteSup);

        if(output[valor]){
            output[valor]= output[valor] +1
        }else {
            output[valor] = 1;
        }
        
    }
    return output

}

process.on('message', (msg) => {
    let sum

    if(msg) {
        const cant = msg
        sum = calculo(cant)
    }
    process.send(datos)
})
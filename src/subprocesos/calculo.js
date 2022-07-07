process.on('message', qty => {
    // console.log(`Mensaje del proceso padre:`);
    // console.log(msg.qty);
    
    let sum = 0;
    let array = []
    // 6e9
    for (let index = 0; index < qty; index++) {
        sum += index
        array.push(sum)
    }
    // Me falta terminar la lógica del cálculo... 
    // Todo lo relacionado a crear el fork y comunicar padre e hijo está implementado, 
    // pero me falta que el algoritmo sea el de la consigna.
    process.send(array)
})
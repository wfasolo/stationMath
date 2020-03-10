import axios from 'axios';
import brain from 'brain.js'


async function recebeEstacao() {
    var dados = [];

    
    const {data}= await axios.get("http://i9pool.ddns.net:3333/weatherData");

    for (var i = 0; i < data.length; i++) {
        let v1 = data[i].rain; 
        let v2 = parseFloat(data[i].temperature);
        let v3 = parseFloat(data[i].pressure);
        let v4 = parseFloat(data[i].humidity);
        
        dados[i]={'input':{'temp':v2,'press':v3, 'humid':v4}, 'output':{'chuva':v1}}
     
    }

     var datEst = dados;


    return datEst;
}

async function redeneural() {
   
    var datEst = await recebeEstacao();
    var net = new brain.NeuralNetwork();
    
    net.train(datEst);
 
var output = net.run({ r: 20, g: 1, b: 55 }); 
console.log(output)
}
redeneural()
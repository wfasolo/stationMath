// http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/6307/hours/72?token=731b8df8a43ea344e9f0c0c832322d5f

import axios from 'axios';
import regression from 'regression';

async function recebeAccuweather() {
    var datAcc = [];
   // const {data}= await axios.get("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/32952?apikey=jyIlpBlyf7I3rVIdqKpr4Ozd3GLZGlfT&language=pt-br&details=true&metric=true");
       
    //for (var i = 0; i < data.length; i++) {
    //    let v1 = data[i].EpochDateTime;
    //    let v2 = data[i].Temperature.Value;
    //    datAcc[i] = [v1,v2];
    //}
    datAcc =[[18,284]];
    return datAcc;
}

async function recebeEstacao() {
    var temp = [];
    var hora = [];
    var datEst= [];  
    const {data}= await axios.get("https://samples.openweathermap.org/data/2.5/forecast?lat=-21.1159&lon=-41.673&appid=b6907d289e10d714a6e88b30761fae22");

    data.list.map(list => hora.push(list.dt));
    data.list.map(list => temp.push(list.main.temp));
    
    for (var i = 0; i < hora.length; i++) {
        
        var date = new Date(hora[i]*1000);
        var datas = date.getHours() 
        
        datEst[i] = [datas,temp[i]];
         
    }
    return datEst;
}

async function concatenar() {
    var datEst = await recebeEstacao();
    var datAcc = await recebeAccuweather();
    var dados = datEst.concat(datAcc);
    return dados;
}

 async function regressao() {
    var dados = await concatenar(); 
    var result =  regression.polynomial(dados, {order: 6, precision:10});
    console.log(result);
}

regressao();



import axios from "axios";
import brain from "brain.js";
import Resultados from "./Regressao";

var valores = [];

async function recebetempo() {
  var datAccTempo = [];
  const { data } = await axios.get(
    "https://api.weather.com/v1/geocode/-21.129/-41.677/forecast/hourly/48hour.json?units=m&language=pt-BR&apiKey=320c9252a6e642f38c9252a6e682f3c6"
  );

  for (var i = 0; i < 12; i++) {
    datAccTempo[i] = { tempo: data.forecasts[i].phrase_32char };
  }

  return datAccTempo;
}

async function recebeDados() {
  var dados = [];
  var dados2 = [];
  var datRes = [];

  var result = await Resultados.retornaData();

  for (var i = 0; i < result.temp.length; i++) {
    const resultD = result.temp[i][0];
    const resultT = result.temp[i][1] / 30;
    const resultP = result.press[i][1] / 1020;
    const resultU = result.humid[i][1] / 100;

    dados[i] = {
      temp: parseFloat(resultT.toFixed(1)),
      press: parseFloat(resultP.toFixed(1)),
      humid: parseFloat(resultU.toFixed(1))
    };
    valores[i] = {
      data: result.temp[i][0],
      temp: parseFloat(result.temp[i][1]),
      press: parseFloat(result.press[i][1]),
      humid: parseFloat(result.humid[i][1])
    };
  }

  const { data } = await axios.get("http://i9pool.ddns.net:3333/weatherData");

  for (var i = 0; i < data.length; i++) {
    let v1 = data[i].rain;
    let v2 = parseFloat(data[i].temperature) / 30;
    let v3 = parseFloat(data[i].pressure) / 1020;
    let v4 = parseFloat(data[i].humidity) / 100;

    dados2[i] = {
      input: { temp: v2, press: v3, humid: v4 },
      output: { chuva: v1 }
    };
  }

  datRes = [dados, dados2];

  return datRes;
}

async function redeneural() {
  var datRes = await recebeDados();

  var net = new brain.NeuralNetwork();
  net.train(datRes[1], { errorThresh: 0.000001 });

  var output = [];

  for (var i = 0; i < datRes[0].length; i++) {
    output[i] = net.run(datRes[0][i]);
  }

  const final = {
    regressao: valores,
    previsao: output,
    previsao2: await recebetempo()
  };

  console.log(final);
  return final;
}

redeneural();

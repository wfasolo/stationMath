// http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/6307/hours/72?token=731b8df8a43ea344e9f0c0c832322d5f

import axios from "axios";
import regression from "regression";

class Regressao {
  async recebeAccuweather() {
    var datAccT = [];
    var datAccP = [];
    var datAccU = [];
    var datAcc = [];
    const { data } = await axios.get(
      "https://api.weather.com/v1/geocode/-21.129/-41.677/forecast/hourly/48hour.json?units=m&language=pt-BR&apiKey=320c9252a6e642f38c9252a6e682f3c6"
    );

    for (var i = 0; i < 12; i++) {
      const date = new Date(data.forecasts[i].fcst_valid_local);
      let v1 = date.getTime();

      let v2 = data.forecasts[i].hi;
      let v3 = data.forecasts[i].mslp;
      let v4 = data.forecasts[i].rh;
      datAccT[i] = [v1, v2];
      datAccP[i] = [v1, v3];
      datAccU[i] = [v1, v4];
    }
    datAcc[0] = datAccT;
    datAcc[1] = datAccP;
    datAcc[2] = datAccU;

    return datAcc;
  }

  async recebeEstacao() {
    var datEstT = [];
    var datEstP = [];
    var datEstU = [];
    var datEst = [];

    var i2 = 0;
    const { data } = await axios.get("http://i9pool.ddns.net:3333/weatherData");

    for (var i = 0; i < 48; i++) {
      const date = new Date(data[i].created_at);
      let v1 = date.getTime();

      let v2 = parseFloat(data[i].temperature);
      let v3 = parseFloat(data[i].pressure);
      let v4 = parseFloat(data[i].humidity);
      datEstT[i2] = [v1, v2];
      datEstP[i2] = [v1, v3];
      datEstU[i2] = [v1, v4];
      i2++;
    }

    datEst[0] = datEstT.reverse();
    datEst[1] = datEstP.reverse();
    datEst[2] = datEstU.reverse();

    return datEst;
  }

  async concatenar() {
    var conc = [];
    var datEst = await this.recebeEstacao();
    var datEstT = datEst[0];
    var datEstP = datEst[1];
    var datEstU = datEst[2];

    var datAcc = await this.recebeAccuweather();
    var datAccT = datAcc[0];
    var datAccP = datAcc[1];
    var datAccU = datAcc[2];

    var concT = datEstT.concat(datAccT);
    var concP = datEstP.concat(datAccP);
    var concU = datEstU.concat(datAccU);

    conc[0] = concT;
    conc[1] = concP;
    conc[2] = concU;

    return conc;
  }

  async removeData() {
    var removeT = [];
    var removeP = [];
    var removeU = [];
    var remove = [];
    var valor = await this.concatenar();
    var valorT = valor[0];
    var valorP = valor[1];
    var valorU = valor[2];

    for (var i = 0; i < 60; i++) {
      removeT[i] = [i, valorT[i][1]];
      removeP[i] = [i, valorP[i][1]];
      removeU[i] = [i, valorU[i][1]];
    }
    remove[0] = removeT;
    remove[1] = removeP;
    remove[2] = removeU;

    return remove;
  }

  async regressao() {
    var result = [];
    var valor = await this.removeData();
    var valorT = valor[0];
    var valorP = valor[1];
    var valorU = valor[2];
    var resultT = regression.polynomial(valorT, { order: 6, precision: 15 });
    var resultP = regression.polynomial(valorP, { order: 6, precision: 15 });
    var resultU = regression.polynomial(valorU, { order: 6, precision: 15 });

    result[0] = resultT;
    result[1] = resultP;
    result[2] = resultU;

    return result;
  }

  async retornaData() {
    const valor = await this.regressao();
    var valorT = valor[0];
    var valorP = valor[1];
    var valorU = valor[2];
    var valor2 = await this.concatenar();
    var valor2D = valor2[0];
    var retorna = [];
    var retornaT = [];
    var retornaP = [];
    var retornaU = [];
    var Temp = [];
    for (var i = 48; i < 60; i++) {
      const date = new Date(valor2D[i][0]);
      let v1 = date.toLocaleString();
      let v2 = parseFloat(valorT.points[i][1]);
      let v3 = parseFloat(valorP.points[i][1]);
      let v4 = parseFloat(valorU.points[i][1]);

      if (v4 > 100) {
        v4 = 100;
      }

      retornaT[i] = [v1, v2.toFixed(1)];
      retornaP[i] = [v1, v3.toFixed(1)];
      retornaU[i] = [v1, v4.toFixed(1)];
    }
    retornaT.splice(0, 48);
    retornaP.splice(0, 48);
    retornaU.splice(0, 48);
    retorna["temp"] = retornaT;
    retorna["press"] = retornaP;
    retorna["humid"] = retornaU;

    //var min = Temp.reduce(function(a, b) {
    //return Math.min(a, b); });
    //var max = Temp.reduce(function(a, b) {
    //return Math.max(a, b); });

    return retorna;
  }
}

export default new Regressao();

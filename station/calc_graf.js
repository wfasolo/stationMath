const Calculo = require('./calc_ch');

async function tt() {
    let cc = await Calculo
    let aa = [];
    for (var i = 0; i < cc.regressao.length; i++) {
        aa[i] = cc.regressao[i].temp;
    }
    return aa;
}
//var bb = await tt().then(console.log);
async function grafico() {
    var bb = await tt();

    new Chart(document.getElementById("line-chart").getContext('2d'), {
        type: 'line',
        data: {
            labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
                data: bb,
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
            }, {
                data: [3, 4, 6],
                label: "Asia",
                borderColor: "#8e5ea2",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: 'World population per region (in millions)'
            }
        }
    });
}
grafico()
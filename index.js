import brain from 'brain.js'
import resu  from './convertcsv.json'


console.log(resu[1])

   function recebeDados() {
        var dados = [];
     var vv;
        for (var i = 0; i < resu.length; i++) {
           
            let v1 = parseFloat(resu[i].precipitacao); 
            if (v1 <= 0) { vv = 0 } else {vv=1}
            let v2 = parseFloat(resu[i].temp_inst/100);
            let v3 = parseFloat(resu[i].pressao/1000);
            let v4 = parseFloat(resu[i].umid_inst/100);
            let v5 = parseFloat(resu[i].pto_orvalho_inst/100);
            let v6 = parseFloat(resu[i].hora/24);
            dados[i]={'input':{'temp':v2,'press':v3, 'humid':v4, 'orv':v5, 'hora':v6}, 'output':{'chuva':v1}}
            
        }
    
        
        var net = new brain.NeuralNetwork();
       net.train(dados,{
		errorThresh: 0.025,
		log: false,
		logPeriod: 1,
		learningRate: 0.1});
    
        var output = net.run({'temp':21/100,'press':1007.6/1000, 'humid':97/100,'hora':6/24}); 
           
            
            
        
       
       //
   console.log(output)
        return 
    }
    recebeDados()
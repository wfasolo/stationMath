// http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/6307/hours/72?token=731b8df8a43ea344e9f0c0c832322d5f

import axios from 'axios';


class maxmin {

    async  recebemaxmin(){
             
        const { data } = await axios.get('https://api.weather.com/v3/wx/observations/current?geocode=-21.13%2C-41.68&units=m&language=pt-BR&format=json&apiKey=320c9252a6e642f38c9252a6e682f3c6');

        const max_min = {'t_max':data.temperatureMax24Hour,'t_min':data.temperatureMin24Hour}
        
        return max_min;
        }
}


export default new maxmin();

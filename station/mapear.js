//var raizes = quadrados.map(nu => 0+((nu-0)*(1-0)/(100-0)));


function mapear(intermin, intermax, valores) {

    var min = valores.reduce(function(a, b) {
    return Math.min(a, b); });
    var max = valores.reduce(function(a, b) {
    return Math.max(a, b); });


var mapeamento = valores.map(nu => intermin+((nu-min)*(intermax-intermin)/(max-min)));

return mapeamento
    }
var aa =(mapear(0,1,[10,50,100]))

console.log (aa)
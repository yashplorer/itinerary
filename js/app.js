angular.module('itinerary-app', [])
    .controller('Planner', ['$scope', function($scope) {
        onLoad();
        $scope.data = processData(data);
}])

function parsePrice(argument) {
    return numeral(argument).format('$0.00');
}
function download() {
    var url = 'data:text/JSON,' + 'data = ' + encodeURIComponent(JSON.stringify(data, null, 4));
    window.open(url, '_blank')
}
function onLoad(){
    //body
}
function processData(data){
    for(i in data){
        (function setsDates(){
            if (i + 25 <= 31)
                data[i].date = new Date(2015, 2, i + 25, 0, 0, 0, 0);
            else
                data[i].date = new Date(2015, 3, i - 6, 0, 0, 0, 0);
        })();
        (function setsAccomodations(){
            if( data[i].date.getMonth() === 2    &&
                data[i].date.getDate() >= 25     &&
                data[i].date.getDate() <= 29
            )
                data[i].acc = "Wyndham Mauna Loa Village";
            else if( data[i].date.getDate() === 30)
                data[i].acc = "Volcano House // Cabin";
            else if( data[i].date.getDate() === 02)
                data[i].acc = "Home";
            else
                data[i].acc = "Hilton Waikoloa Village";
        })();
        data[i].monthName = monthNames[data[i].date.getMonth()];
        data[i].dayNum = numeral(data[i].date.getDate()).format('0o');
    }
    return data;
}
$(function onReady(){
    (function setsWeather(){
        for(i in data){
            data[i].weather = {
                "icon" : "loading...",
                "temp" : "loading...",
                "units" : "loading...",
                "text" : "loading..."
            };
        }
    })();
    (function(){
        $.simpleWeather({
            for(i in data){
                location: 'Kailua, HI',
                woeid: '',
                unit: 'c',
                success: function(w) {
                    data[i].weather.icon = "icon-" + w.code;
                    data[i].weather.temp = w.temp;
                    data[i].weather.units = w.units.temp;
                    data[i].weather.text = w.forecast[1].text;
                },
                error: function(error) {
                    console.log("whoops" + error);
                }
            }
        })
    })();
});
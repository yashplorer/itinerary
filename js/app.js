function loadWeather($scope) {
    $scope.data.forEach(function(datum) {
        datum.w_text = 'too far out!';
        datum.w_temp = '0';
        datum.w_icon = "icon-69";
        $.simpleWeather({
            location: datum.location,
            woeid: '',
            unit: 'c',
            success: function(weather) {
                datum._weather = weather;
                datum.w_text = weather.forecast[datum.wref].text;
                datum.w_temp = weather.forecast[datum.wref].high;
                datum.w_icon = "icon-" + weather.forecast[datum.wref].code; 
                $scope.$apply(function() {
                    console.log('o wow it applied');
                });       
            }, 
            error: function(error) {
                datum.w_text = 'error!!!'
            }
        });
    });
}

angular.module('itinerary-app', [])
    .controller('Planner', ['$scope', function($scope) {
        onLoad();
        $scope.data = processData(data);
        loadWeather($scope);
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
        data[i].wref = (function findsForecastRef(){
            var today = new Date().getDate();
            var tomon = new Date().getMonth();
            if(today < data[i].date.getDate() && tomon === data[i].date.getMonth()){
                return data[i].date.getDate() - today;
            } else if (today < data[i].date.getDate() && tomon < data[i].date.getMonth()){
                return (31-today) + data[i].date.getDate();
            }
        })();
        data[i].w = {
            "text" : "too far out!",
            "temp" : "0",
            "icon" : "icon-69"
        };
    }
    return data;
}
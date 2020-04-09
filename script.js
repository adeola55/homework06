let apikey  = "7ba67ac190f85fdba2e2dc6b9d32e93c"
$("#searchWeather").on("click",function(){
    var cityName=$("#searchWeather").val()
    console.log("City",cityName)
    currentForecast(cityName)
})
function currentForecast(cityName){
    var cityname = cityName
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8b1b7b8197776273d463c896bea2dd57&units=imperial"
    // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=imperial`
    $.ajax({
        type: "GET",
        url:queryURL,
        dataType:"JSON",
        success:function(data){
            console.log(data)
        }
    })
}
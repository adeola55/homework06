let apikey  = "8b1b7b8197776273d463c896bea2dd57"
$("#searchWeather").on("click",function(){
    var cityName=$("#cityName").val()
    console.log("City",cityName)
    currentForecast(cityName)
    fivedayforecast(cityName)
    $("#cityName").val("")
    console.log("City",cityName)
})
function currentForecast(cityName){
    var cityname = cityName
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8b1b7b8197776273d463c896bea2dd57&units=imperial"
    // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=imperial`
    $.ajax({
        type: "GET",
        url:queryURL,
        dataType:"JSON",
        success:function(data){
            console.log(data)
            var previoushistory = searchhistory;
            if (previoushistory.indexOf(cityName)== -1){
                previoushistory.push(cityName);
                localStorage.setItem("mycities",JSON.stringify(previoushistory))
                 displaylocalstorage()
            }
            var lat = data.coord.lat
            var lon = data.coord.lon

            displayUVindex(lat,lon)
            $("#currentweather").empty()
            $("#currentweather").append(`
            <div class="card">
            <h1>${cityName}</h1>
            <h4>${data.weather[0].main}</h4>
            <h3>${data.main.temp}°F</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" width="100"/>
            <p>${data.wind.speed}MPH<p>
            `)
        }
    })
}
function displayUVindex(lat,lon){
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+apikey+"&lat=" + lat + "&lon=" + lon+"&units=imperial"
        $.ajax({
        type: "GET",
        url:queryURL,
        dataType:"JSON",
        success:function(data){
            console.log("UV",data)
            $(`#UVindex`).empty()
            $("#UVindex").append(`<h4>UVindex:${data.value}</h4>`)
            if (data.value < 3){
                $("#UVindex").append(`<button class="btn btn-success"><button>`)
            }
            else if(data.value < 7){
                $("#UVindex").append(`<button class="btn btn-warning btn-lg"><button>`)
            }
            else {
                $("#UVindex").append(`<button class="btn btn-danger btn-lg"><button>`)
            }
        }
    })
}
function fivedayforecast(cityName){
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&units=imperial`

    // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=imperial`
    $.ajax({
        type: "GET",
        url:queryURL,
        dataType:"JSON",
        success:function(data){
            console.log(data.list)
            var forecast= data.list 
            $("#5dayforecast").empty()
            for (let i = 0;i < forecast.length; i=i+8){
                console.log(i)
                $("#5dayforecast").append(`
                <div class="card" style="width:250px">
                <h1>${forecast[i].dt_txt}</h1>
                <h4>${forecast[i].weather[0].main}</h4>
                <h3>${forecast[i].main.temp}°F</h3>
                <img src="https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png" width="100"/>
                <p>${forecast[i].wind.speed}MPH<p>
                `)
                }
        }
    })

}
var searchhistory = JSON.parse(localStorage.getItem("mycities")) || []
function displaylocalstorage(){
    console.log(localStorage.getItem("mycities"),searchhistory)
   $(`#previousSearch`).empty()
    for (let i = 0; i < searchhistory.length; i++){
        $("#previousSearch").append(`
        <button class="searchedCity btn btn-warning" data-attributes="${searchhistory[i]}">${searchhistory[i]}</button>`)
    }
    if (searchhistory.length > 0){
        currentForecast(searchhistory[searchhistory.length-1]);
        fivedayforecast(searchhistory[searchhistory.length-1]);
    }
}

displaylocalstorage ()


$("#previousSearch").on("click",".searchedCity",function(){
   var cityName = $(this).attr("data-attributes");
   currentForecast(cityName)
   fivedayforecast(cityName)
})

$("#clearLocalStorage").on("click", function(){
    localStorage.removeItem("mycities")
    location.reload()
})

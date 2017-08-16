function getWeather() {
  var req_id = "3515302";
  var req_key = "127d370b9415ea1c32da57b23db54624";
  var req_code = "http://api.openweathermap.org/data/2.5/weather";//?id="+ req_id + "&appid="+ req_key;

  $.getJSON(req_code, {"id":req_id, "appid":req_key}).done(function(data) {
    console.log("success");
    // Get and process Temperature (K° to °C)
    var temp_c = Math.round(data.main.temp - 273.15) + "°C";
    // Get climate info and icon.
    var w_icon = data.weather[0].icon;
    var w_icon_url = "http://openweathermap.org/img/w/" + w_icon + ".png"; //Icon custom URL
    // Get climate category for background img.
    var w_img = getWeatherType("" + data.weather[0].id);
    console.log("w_img " + w_img);
    var w_img_url = null;
    if (w_img != null){
      w_img_url = "./img/" + w_img + ".jpg";
    }
    // Post data changes.
    var loading = document.getElementById('loading');
    loading.parentNode.removeChild(loading);
    document.getElementById('loc_name').innerHTML = data.name + ",&nbsp;" + data.sys.country;
    document.getElementById('temp_c').innerHTML = temp_c;
    icn_str = "<img src=\"" + w_icon_url + "\"></br>";
    document.getElementById('weather').innerHTML = icn_str + data.weather[0].main;
    if(w_img_url != null){
      document.body.style.background = "url('" + w_img_url + "') no-repeat";
    }
    document.body.style.backgroundSize = "cover";
    //Footer content
    var api_img = "<img src=\"https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg\" width='160px' height='20px'>";
    document.getElementById('footer').innerHTML = "Powered by &nbsp;&nbsp;<a href=\"https://openweathermap.org/\" target=\"_blank\">" + api_img + "</a>";

  }).fail(function(){
    console.log("fail");
    var loading = document.getElementById('loading');
    loading.parentNode.removeChild(loading);
    document.getElementById('temp_c').innerHTML = "Connection Failed";
    document.body.style.background = "#ff5252";
  });
}

function getWeatherType ( w_type ) {
    if (w_type != null || w_type != ""){
      switch(w_type.charAt(0)){
        case '2':
          return "thunderstorm";
        case '3':
          return "drizzle";
        case '5':
          return "rain";
        case '6':
          return "snow";
        case '7':
          return "atmosphere";
        case '8':
          return (w_type == "800") ? "clear" : "clouds";
        case '9':
          return (w_type.charAt(1) == '0') ? "extreme" : "additional";
          // if(w_type.charAt(1) == '0'){
          //   return "extreme";
          // }
          // return "additional";
        default:
          return "default";
      }
    } else {
      return null;
    }
}

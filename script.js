let city = document.getElementById("search");
let weather= document.getElementById("weather_condition");  
let humidity = document.getElementById("humadity");
let wind = document.getElementById("wind");
let Airpresser = document.getElementById("Airpresser");
let image_changer = document.getElementById("weather_img");
let CityName= document.getElementById("cityName");
let tem= document.getElementById("temp");
let long;
let lat;
const Api ="1818d546290ea7dee3a4435ad8dc3ea1";
const apiCall="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
 function getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position,showError);
      long=position.coords.longitude;
      lat=position.coord.latitude;
    }
    else{
      location.reload();
    }
}
const position = async (position)=>{
  let loc_api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${Api}`;
  const res =await fetch(loc_api);
  const data = await res.json();
  CityName.innerHTML=data.name;
  weather.innerHTML=data.weather[0].main;
  humidity.innerHTML = data.main.humidity + " g.m-3";
  tem.innerHTML =Math.round(data.main.temp-273)+' <sup><sup>o</sup>C</sup>';
  Airpresser.innerHTML = data.main.pressure + " Pa";
  wind.innerHTML = data.wind.speed + "km/h";
  document.getElementById("error").innerHTML="";
  console.log(position);
}

const showError = (error)=>{
  switch(error.code){
      case error.PERMISSION_DENIED:
            alert("please allow location to check the weather");
            location.reload();
          break;
      default:
          location.reload();  
  }
}

async function search(){
    if(city.value==""){
        document.getElementById("error").innerHTML="you have an error";
        weather.innerHTML="none";
        humidity.innerHTML="null";
        wind.innerHTML= "null";
        Airpresser.innerHTML="null";
    }
    else{
        const response =await fetch(apiCall + city.value +`&appid=${Api}`);
           const data = await response.json();
           console.log(data);
           CityName.innerHTML=data.name;
           weather.innerHTML=data.weather[0].main;
           humidity.innerHTML = data.main.humidity + " g.m-3";
           tem.innerHTML = data.main.temp +' <sup><sup>o</sup>C</sup>';
           Airpresser.innerHTML = data.main.pressure + " Pa";
           wind.innerHTML = data.wind.speed + "km/h";
           document.getElementById("error").innerHTML="";
           city.value="";
           if(weather.innerHTML=="Haze"){
            image_changer.src='haze.png';
           }
           else if(weather.innerHTML=="Clouds"){
            image_changer.src='clouds.png';
           }
           else if(weather.innerHTML==""){

           }
           else if(weather.innerHTML=="Clear"){
            image_changer.src='clear.png';
           }
           else if(weather.innerHTML=="Rain"){
            image_changer.src='rain.png';
           }
       }
    }

 
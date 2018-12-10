$(document).ready(function(){

	var city 															// String variables makeup URL
	var first = 'http://api.openweathermap.org/data/2.5/weather?q='
	var units = '&units=metric'
	var key = '&APPID=1a449e0f40966c63975d3a3b5a660742'
	$('#cities').change(function(){										//where to get city (select options)

		city = $(this).val()											//make city selected option
		console.log(city)
		console.log(first + city + units + key)							//concatenate string URL
		
		// get and manipulate API data
		$.ajax({
					url: first + city + units + key,
					type:"GET",
					dataType:"jsonp",
					success: function(data){
						//console.log(data)
						var temp = data['main']['temp']
						var min = data['main']['temp_min']
						var max = data['main']['temp_max']
						var desc = data['weather'][0]['description']
						var humidity = data['main']['humidity']
						var speed = data['wind']['speed'] * 3.6 //default windspeed is in m/s, equation changes to km/h
						var speedRounded = Math.round(speed * 100) / 100 //rounds to 2 decimals

						var iconCode = data['weather'][0]['icon']					
						//console.log(temp, min, max, desc)
						changeHeader()
						changeWeather(temp, min, max, desc, humidity, speedRounded)
						changeIcon(iconCode)
					},
					error: function(data){
						console.log(data)
					}
		})
					
	});

});

//changes city header to currently selected city name
function changeHeader() {
  	let header = document.getElementById('city')
	let headerText = document.getElementById('cities').value

    header.innerText = headerText; 
}
//retrieves data for and displays weather data
function changeWeather(temp, min, max, desc, humidity, speed) {
	document.getElementById("temp").innerHTML = temp
	document.getElementById("min").innerHTML = min
	document.getElementById("max").innerHTML = max
	document.getElementById("desc").innerHTML = desc
	document.getElementById("humidity").innerHTML = humidity
	document.getElementById("speed").innerHTML = speed
}
//retrieves data for and displays appropriate weather icon
function changeIcon(iconCode){
	var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
	
	$('#icon').attr('src', iconUrl)
}
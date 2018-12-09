$(document).ready(function(){
	
	var city 
	var first = 'http://api.openweathermap.org/data/2.5/weather?q='
	var units = '&units=metric'
	var key = '&APPID=1a449e0f40966c63975d3a3b5a660742'
	$('#cities').change(function(){

		city = $(this).val()
		console.log(city)
		console.log(first + city + units + key)
		
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
						console.log(temp, min, max, desc)
						changeHeader()
						changeWeather(temp, min, max, desc)
					},
					error: function(data){
						console.log(data)
					}
		})
					
	});

});

function changeHeader() {
  	let header = document.getElementById('city')
	let headerText = document.getElementById('cities').value;

    header.innerText = headerText; 
}

function changeWeather(temp, min, max, desc) {
	document.getElementById("temp").innerHTML = temp;
	document.getElementById("min").innerHTML = min;
	document.getElementById("max").innerHTML = max;
	document.getElementById("desc").innerHTML = desc;
}


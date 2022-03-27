
window.addEventListener('load',()=>{
    let btn = document.getElementById('btn');
    const apiKey = '6dd37a6db1327c360b9f701b3688f6d1'
    let temperatureValue = document.getElementById('temperature-value');
    let temperatureDesc = document.getElementById('temperature-desc');
    let ubication = document.getElementById('ubication');
    let weatherIcon = document.getElementById('weather-icon');
    let humidity1= document.getElementById('humidity');
    let windSpeed = document.getElementById('wind-speed')

    btn.addEventListener('click',()=>{
        let city = document.getElementById('city').value
        
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=${apiKey}`

        if (city === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        } else {

            usaFetch(url);
            
            function usaFetch(url) {
                fetch(url)
                            .then( response => { return response.json()})
                            .then (data => {
                                
                                
                                if (data.cod === '404') {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Try again',
                                        text: 'City not found..'
                                      })
                                } else {

                                    let temp = Math.round(data.main.temp)
                                    temperatureValue.textContent = `${temp}°C`;

                                    let desc = data.weather[0].main
                                        temperatureDesc.textContent = desc;
    
                                    let ubi = data.name
                                            ubication.textContent = ubi;
    
                                    let humidity = data.main.humidity
                                        humidity1.textContent = `Humidity: ${humidity} %`;

                                    let wind = data.wind.speed
                                    windSpeed.textContent = `Wind Speed: ${wind} km/h`
    
                                   /*  weatherIcon.style.width = "128px"
                                    weatherIcon.style.height = "128px" */
                
                                    switch(data.weather[0].main) {
                                        case 'Clear':
                                            weatherIcon.src = 'assets/animated/day.svg'
                                            break;
                
                                        case 'Thunderstorm':
                                            weatherIcon.src = 'assets/animated/thunder.svg'
                                            break;
                
                                        case 'Drizzle':
                                            weatherIcon.src = 'assets/animated/rainy-2.svg'
                                            break;
                
                                        case 'Rain':
                                            weatherIcon.src = 'assets/animated/rainy-7.svg'
                                            break;
                
                                        case 'Snow':
                                            weatherIcon.src = 'assets/animated/snowy-6.svg'
                                            break;
                
                                            case 'Clouds':
                                            weatherIcon.src = 'assets/animated/cloudy-day-1.svg'
                                            break;
                    
                                            case 'Atmosphere':
                                            weatherIcon.src = 'assets/animated/weather.svg'
                                                break;                               
                                        default:
                                            weatherIcon.src = 'assets/animated/cloudy-day-1.svg'
                                        }
                                }
                                
                            })
                            .catch( error => { 
                                console.log(error)})
                            }
        }
    
            
    })
})
            
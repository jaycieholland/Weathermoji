// Declaring the variables
const button = document.querySelector('.cityState')
const api = "17ca0a35a1b1a9c6f5ac02fd133a0961";
let currentEmoji;

const getGeo = (city) => {
	// API URL
	const base = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api}`;

	// Calling the API
	fetch(base)
		.then((response) => {
		return response.json();
		})
		.then((data) => {
		console.log(data.length)
    if (data.length == 0) {
      currentEmoji = `🤬`
      const emojiText = document.querySelector('.emoji')
      emojiText.innerHTML=currentEmoji
    } else {
      const lat = data[0].lat
      const lon = data[0].lon
      getWeather(lat, lon)
    }

  })
  .catch( (error) => currentEmoji = `🤔`)

}

const getWeather = (lat, lon) => {
  const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
  fetch(base)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
    console.log(data);
  emojiRender(data.weather[0].id)
})
.catch( () => currentEmoji = `🤔`)
}

const emojiRender = code =>{
  console.log('main', code);


  if (code >= 200 && code <= 299) {
    //thunder
    currentEmoji = `⛈`
  } else if (code >= 300 && code <= 599) {
  //rain
    currentEmoji = `🌧`
  } else if (code >= 600 && code <= 699) {
    //snow
    currentEmoji = `☃️`
  } else if (code >= 700 && code <= 799) {
    //wind
    currentEmoji = `🍃`
  } else if (code >= 800 && code <= 899) {
    //clouds
    currentEmoji = `☀️`
  } else {
    currentEmoji = `🤔`
  }



  const emojiText = document.querySelector('.emoji')
  emojiText.innerHTML=currentEmoji
}

const handleSearch = () => {
  const city = document.querySelector('#citySearch').value
  getGeo(city);
}
button.addEventListener('click', handleSearch);




//haze clouds

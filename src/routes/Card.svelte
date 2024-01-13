<script>
    import cloud from '$lib/images/cloud.png';
    import thunderstorm from '$lib/images/thunderstorm.png';
    import drizzle from '$lib/images/drizzle.png';
    import nothing from '$lib/images/404.png';
    import clear from '$lib/images/clear.png';
    import mist from '$lib/images/mist.png';
    import rain from '$lib/images/rain.png';
    import snow from '$lib/images/snow.png';
    import { key } from '../key';
    import { weatherList } from '../store.js';
    import { fade, fly } from 'svelte/transition';

    //draggable

    export let left = 100;
	export let top = 100;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
	

    //api logic
    let cityName = '';
    let isWeatherBoxVisible = false;

    function getFetchUrl(cityName) {
        return 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric' + '&appid=' + key;
    }

    async function addWeatherInfo() {

        isWeatherBoxVisible = false;

        const res = await fetch(getFetchUrl(cityName));
        if (res.status === 404) {
            alert('Invalid City Name.');
        } else {
            const weatherData = await res.json();

        // Extract lat and lon
        const { coord: { lat, lon } } = weatherData;
        console.log('Latitude:', lat);
        console.log('Longitude:', lon);
        
        weatherList.setCoords(lat, lon);
        weatherList.add(weatherData);
        };

        isWeatherBoxVisible = true;
        
    }
	
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;"  class="container">
       <div class="search-box">
            <i class='bx bxs-map'></i>
            <input type="text" bind:value="{cityName}" placeholder="enter your location">
            <button type="button" on:click={addWeatherInfo} class="bx bx-search"></button>
       </div>

    {#each $weatherList as weather, index}  
    {#if isWeatherBoxVisible} 
    <div in:fly={{ x: -100, duration: 500 }} out:fly={{ x: 100, duration: 500 }} class="weather-box">
        <div class="box">
            <div class="info-weather">
                <div class="weather">
                    {#if weather.weather[0].main === "Rain"}
                        <img src={rain} alt="rain" />
                    {:else if weather.weather[0].main === "Thunderstorm"}
                        <img src={thunderstorm} alt="thunderstorm" />
                    {:else if weather.weather[0].main === "Drizzle"}
                        <img src={drizzle} alt="drizzle" />
                    {:else if weather.weather[0].main === "Clear"}
                        <img src={clear} alt="clear" />
                    {:else if weather.weather[0].main === "Clouds"}
                        <img src={cloud} alt="cloud" />
                    {:else if weather.weather[0].main === "Snow"}
                        <img src={snow} alt="snow" />
                    {:else if weather.weather[0].main === "Mist"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Smoke"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Haze"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Dust"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Fog"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Sand"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Dust"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Ash"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Squall"}
                        <img src={mist} alt="mist" />
                        {:else if weather.weather[0].main === "Tornado"}
                        <img src={mist} alt="mist" />
                    {:else}
                        <!-- You can provide a default image or handle other cases here -->
                        <img src={nothing} alt="default" />
                    {/if}
                    <p class="temperature">{parseInt(weather.main.temp)}<span>°C</span></p>
                    <p class="description">{weather.weather[0].description}</p>
                </div>
            </div>
        </div>
       </div>
       

       <div class="weather-details">
        <div class="humidity">
            <i class='bx bx-water' ></i>
            <div class="text">
                <div class="info-humidity">
                    <span>{weather.main.humidity}%</span>
                </div>
                <p>Humidity</p>
            </div>
        </div>

        <div class="wind">
            <i class='bx bx-wind' ></i>
            <div class="text">
                <div class="info-wind">
                    <span>{parseInt(weather.wind.speed)} m/s</span>
                </div>
                <p>Wind Speed</p>
            </div>
        </div>

    </div>
    {/if}
    {/each}

</div>
<style>
    .container {
    position: fixed;
    width: 400px;
    height: 550px;
    top: 50%;
    left: 32%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    padding: 20px;
    color: #fff;
    }
        

    .search-box {
        position: relative;
        width: 100%;
        height: 55px;
        display: flex;
        align-items: center;
    }
    
    .search-box i {
        position: absolute;
        left: 10px;
        font-size: 28px;
    }

    .search-box input {
        position: relative;
        width: 100%;
        height: 100%;
        background: transparent;
        border: 2px solid;
        outline: none;
        border-radius: 10px;
        font-size: 22px;
        color: #fff;
        font-weight: 500;
        text-transform: uppercase;
        padding: 0 48px 0 42px;
    }
    .search-box input::placeholder {
        color: #fff;
        text-transform: capitalize;
    }

    .search-box button {
        position: absolute;
        right: 0;
        width: 40px;
        height: 100%;
        background: transparent;
        border: none;
        font-size: 28px;
        color: #fff;
        padding: 0 40px 0 5px;
        cursor: pointer;
    }

    .weather-box {
        text-align: center;
        margin: 40px 0;
        user-select: none;
    }

    .weather-box img {
        width: 50%;
        pointer-events: none;
        
        
    }

    .weather-box .temperature {
        position: relative;
        font-size: 64px;
        line-height: 1;
        font-weight: 700;
        margin: 20px 0 6px -30px;
    }

    .weather-box .temperature span {
        position: absolute;
        font-size: 24px;
        margin-left: 4px;
    }

    .weather-box .description {
        font-size: 22px;
        font-weight: 500;
        text-transform: capitalize;
    }

    .weather-details {
        position: absolute;
        bottom: 40px;
        left: 0;
        width: 100%;
        padding: 0 20px;
        display: flex;
        user-select: none;
    }

    .weather-details .humidity,
    .weather-details .wind {
        display: flex;
       /* align-items: ; */ 
        width: 50%;
    }

    .weather-details .humidity {
        padding-left: 20px;
        justify-content: flex-start;
    }

    .weather-details .wind {
        padding-right: 70px;
        justify-content: flex-end;
    }

    .weather-details i {
        font-size: 56px;
        margin-right: 10px;
        margin-top: -5px;
    }

    .weather-details span {
        display: inline-block;
        font-size: 22px;
        font-weight: 500;
    }

    .weather-details p {
        font-size: 14px;
        font-weight: 500;
        margin-top: 1px;
    }
</style>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
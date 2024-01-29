// store.js
import { writable } from 'svelte/store';

export const weatherList = (() => {
    const { subscribe, update } = writable([]);
    const { subscribe: subscribeCoords, set: setCoords } = writable({ lat: 0, lon: 0 });
    const { subscribe: subscribeWeather, set: setWeather } = writable ({ id: 0 });
    return {
        subscribe,
        add: (weatherInfo) => update(() => [weatherInfo]),
        subscribeCoords,
        setCoords: (lat, lon) => setCoords({ lat, lon }),
        subscribeWeather,
        setId: (id) => setWeather({id})
    };
})();
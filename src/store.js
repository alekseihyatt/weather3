import { writable } from 'svelte/store';

export const weatherList = (() => {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        add: (weatherInfo) => update(() => [weatherInfo]),
        
    };
})();

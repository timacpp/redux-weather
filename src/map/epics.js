import { ofType, combineEpics } from 'redux-observable';
import { map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { from, forkJoin, interval, debounce } from 'rxjs';

import { citiesSelector } from "./selectors"
import { initializeUserLocation, setUserLocation, getLargestCitiesInBounds, setCities} from './reducer';
import { getLocationViaGeolocationApi, getCitiesViaOverpassApi, getCityWeatherViaWeatherApi } from './logic'

const initializeUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(initializeUserLocation.type),
        switchMap(() => 
            from(getLocationViaGeolocationApi()).pipe(
                map(position => setUserLocation([position.coords.latitude, position.coords.longitude]))
            )
        )
    );

  
const getLargestCitiesInBoundsEpic = (action$, state$) =>
    action$.pipe(
        ofType(getLargestCitiesInBounds.type),
        debounce(() => interval(1000)),
        switchMap(({ payload }) => 
            from(getCitiesViaOverpassApi(payload)).pipe(
                map(newPossiblyViewedCities => ({
                    oldCities: citiesSelector(state$.value),
                    newPossibleViewedCities: newPossiblyViewedCities
                })),
                map(({newPossibleViewedCities, oldCities}) => ({
                    oldCities: oldCities,
                    newCitiesWithoutWeather: newPossibleViewedCities.filter(newCity => !oldCities.some(oldCity => oldCity.name === newCity.name))
                })),
                switchMap(({newCitiesWithoutWeather, oldCities}) => 
                    forkJoin(newCitiesWithoutWeather.map(city => getCityWeatherViaWeatherApi(city.name).then(weather => ({...city, ...weather})))).pipe(
                        map(newCities => setCities(newCities.concat(oldCities).slice(0, 100)))
                    )
                )
            )
        )
    );

export const mapEpics = combineEpics(
    initializeUserLocationEpic,
    getLargestCitiesInBoundsEpic
);

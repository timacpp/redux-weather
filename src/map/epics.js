import { ofType, combineEpics } from 'redux-observable';
import { map, startWith, filter, tap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { initializeUserLocation, setUserLocation, getLargestCitiesInBounds, setCities } from './reducer';
import { getLocationViaGeolocationApi, getCitiesViaOverpassApi } from './logic'

const initializeUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(initializeUserLocation.type),
        switchMap(() => 
            from(new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve))).pipe(
                map(position => setUserLocation([position.coords.latitude, position.coords.longitude])))
            )
    );

const getLargestCitiesInBoundsEpic = (action$) =>
    action$.pipe(
        ofType(getLargestCitiesInBounds.type));

export const mapEpics = combineEpics(
    initializeUserLocationEpic,
    getLargestCitiesInBoundsEpic
);

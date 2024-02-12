import { ofType, combineEpics } from 'redux-observable';
import { map, startWith, filter, tap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { initializeUserLocation, setUserLocation, getLargestCitiesInBounds, setCities } from './reducer';
import { getLocationViaGeolocationApi, getCitiesViaOverpassApi } from './logic'

const initializeUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(initializeUserLocation.type),
        switchMap(() => 
            from(getLocationViaGeolocationApi()).pipe(
                map(position => setUserLocation([position.coords.latitude, position.coords.longitude]))
            )
        )
    );

const getLargestCitiesInBoundsEpic = (action$) =>
    action$.pipe(
        ofType(getLargestCitiesInBounds.type),
        switchMap(({ payload }) => 
            from(getCitiesViaOverpassApi(payload)).pipe(
                map(cities => setCities(cities))
            )
        )
    );

export const mapEpics = combineEpics(
    initializeUserLocationEpic,
    getLargestCitiesInBoundsEpic
);

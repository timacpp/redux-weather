import { ofType, combineEpics } from 'redux-observable';
import { map, startWith, filter, tap, switchMap} from 'rxjs/operators';
import { from } from 'rxjs';

const initializeUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(initializeUserLocation.type),
        switchMap((ignored) => 
            from(new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve))).pipe(
                map(position => setUserLocation([position.coords.latitude, position.coords.longitude]))
            )
        )
    );

export const gameEpics = combineEpics(
    initializeUserLocationEpic
);

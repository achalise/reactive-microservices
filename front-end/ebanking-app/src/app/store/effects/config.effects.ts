import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/common/auth.service';
import { ConfigActionTypes, ConfigLoadAction, ConfigLoadSuccessAction } from '@app/store/actions/config.actions';
import { ConfigData } from '@app/store/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ConfigEffects {
    constructor(private authService: AuthService,
                private actions$: Actions) {}

    // TODO The effects below will not be required when we initialise through APP_INITIALIZER

    @Effect() init$: Observable<Action> = this.actions$.ofType('@ngrx/effects/init').pipe(
        tap(() => {
            console.log('Captured the effects init action, do whatever bootstrapping stuff we want to do here ...');
        }),
        map(() => new ConfigLoadAction())
    );

    @Effect() configLoad$: Observable<Action> = this.actions$.ofType(ConfigActionTypes.ConfigLoadAction).pipe(
        switchMap(() => {
            return this.authService.retrieveConfigData();
        }),
        map((c: ConfigData) => new ConfigLoadSuccessAction(c))
    );
}

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { authReducer } from './reducers/auth.reducer';
// import { AuthEffects } from './effects/auth.effects';
import { loadingReducer } from './reducers/loading.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
    // StoreModule.forFeature( 'auth', authReducer ),
    EffectsModule.forRoot([]),
    // EffectsModule.forFeature([ AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
})
export class AppStoreModule {}

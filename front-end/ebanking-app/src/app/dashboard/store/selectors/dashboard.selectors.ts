import { DashBoardState } from '@app/dashboard/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getDashboardState = createFeatureSelector<DashBoardState>('dashboard');
export const getAccounts = createSelector(getDashboardState, state => state.accounts);

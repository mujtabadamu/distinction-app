import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../rootReducer';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

import {createStore,} from 'redux';
import { deals } from './deals';
import { categories } from './categories';
import { ideas } from './ideas';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}


export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            deals,
            categories,
            ideas,
        }),
    );

    const persistor = persistStore(store)
    return { persistor, store };
}
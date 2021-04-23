import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user'
import tradesReducer from './trades'
import insposReducer from './inspos'
import searchReducer from './search'
import navReducer from './nav'

export default configureStore({
    reducer: {
        user: userReducer,
        trades: tradesReducer,
        inspos: insposReducer,
        search: searchReducer,
        nav: navReducer,
    }
})
import * as ActionTypes from './ActionTypes';

export const categories = (categories = [
], action) => {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CATEGORY:
            return [...categories, action.payload];

        case ActionTypes.DELETE_CATEGORY:
            return categories.filter(item => item.id != action.payload);
        
        default: 
            return categories;
    }
}
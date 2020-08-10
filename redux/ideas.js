import * as ActionTypes from './ActionTypes';

export const ideas = (state = {ideas:[
]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NEW_IDEA:
            return {...state, ideas: [...state.ideas, action.payload]};

        case ActionTypes.CHANGE_RESULT_OF_THE_IDEA:
            return {...state, ideas: state.ideas.map(item => {
                if (item.id == action.payload.id)
                    item.status = action.payload.result;
                return item;
            })}
        
        case ActionTypes.DELETE_IDEA:
            return {...state, ideas: state.ideas.filter(item => item.id != action.payload)}

        case ActionTypes.DELETE_IDEAS_FOR_CATEGORY:
            return {...state, ideas: state.ideas.filter(item => item.cat_id != action.payload)}
        
        default:
            return state;
    }
}
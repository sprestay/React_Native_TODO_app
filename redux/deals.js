import * as ActionTypes from './ActionTypes';

export const deals = (state = {deals:[
]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NEW_DEAL:
            return {...state, deals: [...state.deals, action.payload]};
        case ActionTypes.CHANGE_MOTIVE_STATUS:
            {
            var new_deals = state.deals.map(item => {
                    if (item.id == action.payload[0]) {
                        item.motives.map(motive => {
                            if (motive.id == action.payload[1]) {
                                motive.status = action.payload[2];
                            }
                            return motive;
                        });
                    }
                    return item;
                });
            return {...state, deals: new_deals}
        }
        case ActionTypes.ADD_COMMENT:
            return {...state, deals: state.deals.map(item => {
                if (item.id == action.payload[0])
                    item.comments.push({id: action.payload[2], comment: action.payload[1]});
                return item;
            })}

        case ActionTypes.UPDATE_DEAL: 
            return {...state, deals: state.deals.map(item => {
                if (item.id == action.payload.id)
                    item = action.payload
                return item
            })}

        case ActionTypes.DELETE_COMMENT:
            return {...state, deals: state.deals.map(item => {
                if (item.id == action.payload[0]) {
                    item.comments = item.comments.filter(comm => comm.id != action.payload[1]);
                }
                    return item
                })};

        case ActionTypes.DELETE_DEAL:
            return {...state, deals: state.deals.filter(item => item.id != action.payload)}
        
        default:
          return state;
      }
};
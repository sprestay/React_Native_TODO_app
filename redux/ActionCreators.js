import * as ActionTypes from './ActionTypes';

export const addDeal = (deal) => ({
    type: ActionTypes.ADD_NEW_DEAL,
    payload: deal,
});

export const changeMotiveStatus = (id_deal, id_motive, status) => ({
    type: ActionTypes.CHANGE_MOTIVE_STATUS,
    payload: [id_deal, id_motive, status],
});

export const addComment = (deal_id, comment, comment_id) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: [deal_id, comment, comment_id],
})

export const updateDeal = (deal) => ({
    type: ActionTypes.UPDATE_DEAL,
    payload: deal,
})

export const deleteComment = (deal_id, comment_id) => {
    return ({
        type: ActionTypes.DELETE_COMMENT,
        payload: [deal_id, comment_id],})
}

export const deleteDeal = (id) => ({
    type: ActionTypes.DELETE_DEAL,
    payload: id,
})

export const addCategory = (id, category) => ({
    type: ActionTypes.ADD_NEW_CATEGORY,
    payload: {id: id, title: category},
})

export const addIdea = (idea) => ({
    type: ActionTypes.ADD_NEW_IDEA,
    payload: idea,
});

export const changeResult = (id, result) => ({
    type: ActionTypes.CHANGE_RESULT_OF_THE_IDEA,
    payload: {id: id, result: result},
})

export const deleteIdea = (id) => ({
    type: ActionTypes.DELETE_IDEA,
    payload: id,
})

export const deleteCategory = (id) => ({
    type: ActionTypes.DELETE_CATEGORY,
    payload: id,
})

export const deleteRelatedIdeas = (cat_id) => ({
    type: ActionTypes.DELETE_IDEAS_FOR_CATEGORY,
    payload: cat_id,
})
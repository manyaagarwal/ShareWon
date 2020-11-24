export const initialState = { 
    user_id : null,
}

export default (state = initialState, action) =>{ 
    switch(action.type){ 
        default: { 
            return state; 
        }
    }
}
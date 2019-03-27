const initialState = {
    optionsArray: [
    { key: 'S', text: 'Select a value'},
    ],
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    if(action.type === 'DEPARTMENT_OPTION'){
        newState.optionsArray = 
            [{ key: 'S', text: 'Select a value'},
            { key: 'A', text: 'HR'},
            { key: 'B', text: 'ENGINEERING' }]
    }
    return newState;
}

export default reducer;
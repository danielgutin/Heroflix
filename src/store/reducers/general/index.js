// -------- General Reducer ------- //
// Responsible for : 
// 1. Burger Menu Toggle
// 2. Responsive Nav Toggle


import { RESPONSIVE_NAV_TOGGLE } from '../../actions/general/constants';

// Initial State.
const initState = {
    // burgerNav - controlls the responsive menu display
    // true - BurgerMenu change its look ( to X ), responsive nav displayed.
    // false - BurgerMenu untouched, responsive nav hidden.
    burgerNav : false
}

export default ( state= initState, { type, payload } ) => {
    switch(type) {

        case RESPONSIVE_NAV_TOGGLE:
            return {
                ...state,
                burgerNav : !state.burgerNav
            }

        // Default case return state.
        default:
            return state
    }
}
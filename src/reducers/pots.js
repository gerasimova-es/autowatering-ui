import {POTS_FETCHED, STATISTICS_FETCHED} from "../types";

export default function pots(state = {allPots: [], statistics: []}, action = {}) {
    switch (action.type) {
        case POTS_FETCHED:
            return { ...state, ...action.data };
        case STATISTICS_FETCHED:
            return { ...state, ...action.data };
        default:
            return state;
    }
}

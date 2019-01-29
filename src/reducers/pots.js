import { POTS_FETCHED } from "../types";

export default function pots(state = {allPots: []}, action = {}) {
    switch (action.type) {
        case POTS_FETCHED:
            return action.data;
        default:
            return state;
    }
}

import {POTS_FETCHED} from "../types"
import api from "../api";

const potsFetched = data => ({
    type: POTS_FETCHED,
    data
});


export const fetchPots = () => dispatch =>
    api.pots
        .fetchAll()
        .then(allPots => dispatch(potsFetched({allPots})));

export const fetchPot = () => dispatch =>
    api.pots
        .fetchAll()
        .then(pots => dispatch(potsFetched(pots)));

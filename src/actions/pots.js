import {POTS_FETCHED, POT_SAVED} from "../types"
import api from "../api";

const potsFetched = data => ({
    type: POTS_FETCHED,
    data
});

const potSaved = data => ({
    type: POT_SAVED,
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

export const savePot = (pot) => dispatch =>
    api.pots
        .savePot(pot)
        .then(potRes => dispatch(potSaved(potRes)));
import {POTS_FETCHED, POT_SAVED, STATISTICS_FETCHED} from "../types"
import api from "../api";

const potsFetched = data => ({
    type: POTS_FETCHED,
    data
});

const potSaved = data => ({
    type: POT_SAVED,
    data
});

const statisticsFetched = data => ({
    type: STATISTICS_FETCHED,
    data
});


export const fetchPots = () => dispatch =>
    api.pots
        .fetchAll()
        .then(allPots => dispatch(potsFetched({allPots})));

export const fetchStatistic = (statisticRequest) => dispatch =>
    api.pots
        .fetchStatistic(statisticRequest)
        .then(statistics => dispatch(statisticsFetched({statistics})));

export const fetchPot = () => dispatch =>
    api.pots
        .fetchAll()
        .then(pots => dispatch(potsFetched(pots)));

export const savePot = (pot) => dispatch =>
    api.pots
        .savePot(pot)
        .then(potRes => dispatch(potSaved(potRes)));
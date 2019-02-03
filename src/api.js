import axios from 'axios';

export default {

    pots: {
        fetchAll: () => axios.get('/pot/list').then(res => res.data.payload),
        fetchStatistic: statisticRequest => axios.get(`/pot/statistic/${statisticRequest.code}`, {
            params: {
                dateFrom: statisticRequest.dateFrom,
                dateTo: statisticRequest.dateTo
            }
        }).then(res => res.data.payload),
        savePot: pot =>
            axios.post('/pot/save', pot).then(res => {
                console.log(res);
            })
    }
};

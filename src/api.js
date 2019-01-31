import axios from "axios";

export default {

    pots: {
        fetchAll: () => axios.get("/pot/list").then(res => res.data.payload),
        // fetchCurrent: potId => axios.get("/pot/")
        savePot: pot =>
            axios.post("/pot/save", pot).then(res => res.data.payload)
    }
};

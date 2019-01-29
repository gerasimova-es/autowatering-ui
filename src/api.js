import axios from "axios";

export default {

    pots: {
        fetchAll: () => axios.get("/pot/list").then(res => res.data.payload)
        // fetchCurrent: potId => axios.get("/pot/")
        // create: book =>
        //     axios.post("/api/books", { book }).then(res => res.data.book)
    }
};

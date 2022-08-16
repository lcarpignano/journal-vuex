import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demo-18930-default-rtdb.firebaseio.com'
})

export default journalApi
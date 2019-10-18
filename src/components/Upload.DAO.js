import axios from 'axios';

const uploadFile = (url, data) => {
    alert(url)
    return axios.post(url, data)
    .then(res => { 
        return res.status;
    })
    .catch(err => {
        return err
    })

}

export {uploadFile};
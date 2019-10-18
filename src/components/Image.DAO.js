import axios from 'axios';
import {HOST} from '../config';

const getImages =  (pageNumber, size) => {
    const url = HOST + '/upload/image';
    return axios.get(url, {
        params: {
            pageNumber: pageNumber,
            size: size,
        },
    })
    .then( res => {
        const metadata = [];
        const source = [];
        let newJson;
        const base = [];
        for(let i = 0; i < size; i++) {
            base[i] =  btoa(
                new Uint8Array( res.data.files[i].data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
                ),
            )    
            source.push("data:;base64," + base[i]);
            metadata.push(res.data.message[i].metadata);     
        }     
        newJson = {
            metadata: metadata,
            source: source
        } 
        return newJson;
    }).catch(err => {
        return "error";
    })
}

export {getImages};

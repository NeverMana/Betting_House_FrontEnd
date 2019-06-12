import {environment} from "../../environment";

export class HttpUtil {
    
    static url(path) {
        return environment.api + path;
    }
    
    static headers() {
        const headerParams = {
            'Content-Type': 'application/json;charset=utf-8',
            'X-Origin': 'SCRUM_ACADEMICS',
            Accept: 'application/json',
            Authorization: ''
        };
        const token = localStorage.getItem(environment.userToken);
        if (token) {
            headerParams.Authorization = 'Bearer ' + token;
        }
        return {headers: headerParams};
    }
    
    // TODO implement function to processError
}
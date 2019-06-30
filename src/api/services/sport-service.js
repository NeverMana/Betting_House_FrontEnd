import httpService from '../../api/http/http-service'

export default {
    
    getAllSports() {
        return httpService.get('sports/all');
    },
    
    getSportById(id) {
        return httpService.get('sports/' + id);
    }
}
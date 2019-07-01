import httpService from '../../api/http/http-service'

export default {

    getUserById(id) {
        return httpService.get('users/' + id);
    },
    
    getTransactions() {
        return httpService.get('users/transactions');
    }
}
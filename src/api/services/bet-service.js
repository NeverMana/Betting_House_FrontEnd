import httpService from '../../api/http/http-service'

export default {
    
    saveBet(betDTO) {
        return httpService.post('bets/save', betDTO);
    },
    
    findBetsByEvent(event) {
        return httpService.get('bets/find-bets-by-events/' + event.id)
    }
}
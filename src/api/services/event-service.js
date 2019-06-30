import httpService from '../../api/http/http-service'

export default {
    
    getAllOpenEvents() {
        return httpService.get('events/find-all-open-events');
    },
    
    getAllEvents() {
        return httpService.get('events/all');
    },
    
    getEventOdds(event) {
        return httpService.get('events/find-all-odds/' + event.id)
    },
    
    getEventsBySportId(id) {
        return httpService.get('events/find-events-by-sport-id/' + id)
    },
    
    persistEvent(event) {
        return httpService.post('events/', event);
    }
}
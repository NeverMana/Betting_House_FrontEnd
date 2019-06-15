export default class Team {
    
    constructor(id, name, sport) {
        this._id = id;
        this._name = name;
        this._sport = sport;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get sport() {
        return this._sport;
    }
}
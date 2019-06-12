export default class MessageModel {
    
    constructor(useCase, message) {
        this._useCase = useCase;
        this._message = message;
    }

    get useCase() {
        return this._useCase;
    }

    get message() {
        return this._message;
    }
}
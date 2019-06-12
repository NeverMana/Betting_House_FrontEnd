export default class User {
    
    constructor (id, name, login, email) {
        this._id = id;
        this._name = name;
        this._login = login;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get login() {
        return this._login;
    }

    get email() {
        return this._email;
    }
}
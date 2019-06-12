export default class User {
    
    constructor (id, name, profile, login, email) {
        this._id = id;
        this._name = name;
        this._profile = profile;
        this._login = login;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get profile() {
        return this._profile;
    }

    get login() {
        return this._login;
    }

    get email() {
        return this._email;
    }
}
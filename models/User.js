class User {
    constructor(email, username, password) {
        this.email = email
        this.username = username
        this.password = password
    }

    static findUser(username, password) {

    }
} 

module.exports = User
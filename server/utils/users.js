// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('Jatinder', 30);
// var desc = me.getUserDescription();
// console.log(desc);

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
}

module.exports = {Users};
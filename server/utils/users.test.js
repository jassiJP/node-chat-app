const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '123',
            name: 'Jatinder',
            room: 'home'
        }, {
            id: '124',
            name: 'Ginni',
            room: 'office'
        }, {
            id: '125',
            name: 'Mummy',
            room: 'home'
        }]
    });

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'Jatinder',
            room: 'Some room'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toMatchObject([user]);
    });

    it('should remove the user', () => {
        var userId = '123';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '111';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '123';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = '111';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return name for home room', () => {
        var userList = users.getUserList('home');
        expect(userList).toEqual(['Jatinder', 'Mummy']);
    });

    it('should return name for office room', () => {
        var userList = users.getUserList('office');
        expect(userList).toEqual(['Ginni']);
    });
});
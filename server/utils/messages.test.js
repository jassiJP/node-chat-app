const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Jatinder';
        var text = 'hey';
        var res = generateMessage(from, text);

        expect(res).toMatchObject({from, text});
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Jatinder';
        var longitude = 15;
        var latitude = 10;
        var url = 'https://www.google.com/maps?q=10,15';
        var res = generateLocationMessage(from, latitude, longitude);

        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({from, url});
    });
});
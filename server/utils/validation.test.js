const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        var somenum = 123;
        expect(isRealString(somenum)).toBeFalsy();
    });

    it('should reject strings with only spaces', () => {
        var spaces_only = '     ';
        expect(isRealString(spaces_only)).toBeFalsy();
    });

    it('should allow string with non-space values', () => {
        var someString = 'hey ';
        expect(isRealString(someString)).toBeTruthy();
    });
});
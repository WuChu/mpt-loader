var assert = require('assert');
var should = require('should');

var targetMpt = require('../lib/mpt');
var targetUtils = require('../lib/utils');

describe('Empty Test', function () {
    [{}, {source: ''}, undefined].forEach(function (arg) {
        context('#mpt(' + JSON.stringify(arg) + '): ', function () {
            it('should not thorw an error', function () {
                (function () {
                    targetMpt(arg);
                }).should.not.throw();
            });
            it('should return a empty string', function () {
                targetMpt(arg).should.be.exactly('').and.be.String();
            });
        });
    });
});

describe('Normal Test', function () {
    context('#mpt(...)', function () {
        it('should not contain media rule', function () {
            var result = targetMpt({
                source: 'body { width: 12px }'
            });
            should.exist(result);
            result.should.not.be.exactly('');
            /@media/.test(result).should.be.exactly(false);
        });
    });
    context('#mpt(...mpt & queryList)', function () {
        it('should contain exactly media rule count', function () {
            var result = targetMpt({
                source: 'body { width: 50mpt }',
                queryList: [360, 450, 414],
                baseWidth: 320,
                uiWidth: 720
            });
            should.exist(result);
            result.should.not.be.exactly('');
            /@media/.test(result).should.be.exactly(true);
            var count = 0;
            result.replace(/@media/g, function (matched) {
                count += 1;
                return matched;
            });
            count.should.be.exactly(3);
        });
    });
});

describe('Utils Test', function () {
    context('#getOptions()', function () {
        it('should not contain baseWidth', function () {
            var result = targetUtils.getOptions({
                baseWidth: 320,
                queryList: [320, 360, 414, 780]
            });
            result.should.have.property('sortedQueryList', [360, 414, 780]);
        });
    });
});

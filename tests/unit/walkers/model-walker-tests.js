var assert = chai.assert;
var should = chai.should();

describe('Model Walker', function () {

    it('should walk simple tree', function () {
        var data = {
            value1: 10,
            value2: "hello"
        };

        var matches = [];
        var dataFound = function(entry) {
            matches.push(entry);
        };

        var walker = new ClientFramework.ModelWalker();
        walker.WalkTree(data, dataFound);

        expect(matches.length).to.equal(2);
        expect(matches[0].Type).to.equal("number");
        expect(matches[0].ValueAccessor()).to.equal(10);
        expect(matches[1].Type).to.equal("string");
        expect(matches[1].ValueAccessor()).to.equal("hello");
    });

    it('should walk array in tree', function () {
        var data = {
            value1: 10,
            value2: [
                { value1: 10, value2: "22" },
                { value1: 11, value2: "23" }
            ]
        };

        var matches = [];
        var dataFound = function(entry) {
            matches.push(entry);
        };

        var walker = new ClientFramework.ModelWalker();
        walker.WalkTree(data, dataFound);

        expect(matches.length).to.equal(6);
        expect(matches[0].Type).to.equal("number");
        expect(matches[0].ValueAccessor()).to.equal(10);
        expect(matches[1].Type).to.equal("array");
        expect(matches[1].ValueAccessor().length).to.equal(2);
        expect(matches[2].Type).to.equal("number");
        expect(matches[2].ValueAccessor()).to.equal(10);
        expect(matches[3].Type).to.equal("string");
        expect(matches[3].ValueAccessor()).to.equal("22");
        expect(matches[4].Type).to.equal("number");
        expect(matches[4].ValueAccessor()).to.equal(11);
        expect(matches[5].Type).to.equal("string");
        expect(matches[5].ValueAccessor()).to.equal("23");
    });


    it('should walk an object in tree', function () {
        var data = {
            value1: 10,
            value2: {
                prop1: 22,
                prop2: "hello"
            }
        };

        var matches = [];
        var dataFound = function(entry) {
            matches.push(entry);
        };

        var walker = new ClientFramework.ModelWalker();
        walker.WalkTree(data, dataFound);

        expect(matches.length).to.equal(4);
        expect(matches[0].Type).to.equal("number");
        expect(matches[0].ValueAccessor()).to.equal(10);
        expect(matches[1].Type).to.equal("object");
        expect(matches[2].Type).to.equal("number");
        expect(matches[2].ValueAccessor()).to.equal(22);
        expect(matches[3].Type).to.equal("string");
        expect(matches[3].ValueAccessor()).to.equal("hello");
    });

});
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;

describe('Structure Watcher', function () {

    it('should notify when model structure changes', function () {
        var modelWithArray = {
            someValue: 10,
            arrayData: [
                { value1: 10, value2: 22 }
            ]
        };

        ko.track(modelWithArray);

        var timesChanged = 0;
        var structureWatcher = new ClientFramework.StructureWatcher();
        structureWatcher.NotifyOnChange(modelWithArray, function(){
            timesChanged++;
        });

        expect(timesChanged).to.equal(0);

        modelWithArray.arrayData.push({ value1: 30, value2: 42 });
        modelWithArray.arrayData.push({ value1: 31, value2: 43 });
        modelWithArray.arrayData.splice(2, 1);

        expect(timesChanged).to.equal(3);
    });

    it('should provide the observable array and changes when model structure changes', function (done) {
        var modelWithArray = {
            someValue: 10,
            arrayData: [
                { value1: 10, value2: 22 }
            ]
        };

        ko.track(modelWithArray);

        var structureWatcher = new ClientFramework.StructureWatcher();
        structureWatcher.NotifyOnChange(modelWithArray, function(observableArray, changes){
            expect(observableArray().length).to.equal(2);

            var element0 = observableArray()[0];
            expect(element0.value1).to.equal(10);
            expect(element0.value2).to.equal(22);

            var element1 = observableArray()[1];
            expect(element1.value1).to.equal(30);
            expect(element1.value2).to.equal(42);

            expect(changes.length).to.equal(1);
            expect(changes[0].index).to.equal(1);

            done();
        });


        modelWithArray.arrayData.push({ value1: 30, value2: 42 });
    });

});
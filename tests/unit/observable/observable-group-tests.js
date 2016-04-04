var assert = chai.assert;
var should = chai.should();

describe('Observable Group', function () {

    it('should notify when an observable changes', function () {
        var observables = [
            ko.observable(10),
            ko.observable(5)
        ];

        var observableGroup = new ClientFramework.ObservableGroup(observables);
        var changes = [];

        observableGroup.subscribe(function(value){
            changes.push(value);
        });

        observables[0](22);
        observables[0](13);
        observables[1](1);

        expect(changes.length).to.equal(3);
        expect(changes).to.eql([22, 13, 1]);
    });

    it('should throttle notifications correctly', function (done) {
        var observables = [
            ko.observable(10)
        ];

        var observableGroup = new ClientFramework.ObservableGroup(observables);
        var newValue = 0;

        observableGroup.throttle(100).subscribe(function(value){
            newValue += value; // we += to catch incase it does this multiple times
        });

        observables[0](22);
        observables[0](13);

        expect(newValue).to.equal(0);
        setTimeout(function(){
            expect(newValue).to.equal(22);
            done();
        }, 300);
    });

});
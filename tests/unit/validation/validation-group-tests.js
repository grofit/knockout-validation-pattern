var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;

describe('Validation Groups', function () {

    it('should provide validation information for invalid model', function (done) {
        var invalidModel = {
            validValue: 10,
            invalidValue: 22
        };

        ko.track(invalidModel);
        ko.getObservable(invalidModel, "validValue").extend({ required: true, equal: 10 });
        ko.getObservable(invalidModel, "invalidValue").extend({ required: true, equal: 10 });

        var validationGroup = new ClientFramework.ValidationGroup(invalidModel);
        validationGroup.Validate()
            .then(function(isValid){
                expect(isValid).to.be.false;
                expect(validationGroup.Errors.length).to.equal(1);
                expect(validationGroup.Errors[0].PropertyName).to.equal("invalidValue");
                console.log(validationGroup.Errors);
                done();
            })
            .catch(done);
    });

    it('should notify on validation changes when subscribed', function (done) {
        var model = {
            value: 10
        };

        ko.track(model);
        ko.getObservable(model, "value").extend({ required: true, equal: 10 });

        var timesVisited = 0;

        var shouldBeInvalid = function(validator) {
            expect(validator.PropertyName).to.equal("value");
            expect(validator.ValueLocator()).to.equal(13);
            expect(validator.ValidationLocator()).to.equal(false);
        };

        var shouldBeValid = function(validator) {
            expect(validator.PropertyName).to.equal("value");
            expect(validator.ValueLocator()).to.equal(10);
            expect(validator.ValidationLocator()).to.equal(true);
        };

        var validationGroup = new ClientFramework.ValidationGroup(model);
        validationGroup.OnValidationChanged(function(validator){
            if(timesVisited == 0)
            {
                shouldBeInvalid(validator);
                timesVisited++;
            }
            else
            {
                shouldBeValid(validator);
                done();
            }
        });

        model.value = 13;
        model.value = 10;
    });

    it('should validate array elements with rules added after creation', function (done) {
        var model = {
            arrayData: [10]
        };

        var addValidationRule = function(observableValue) {
            observableValue.extend({required: true, equal: 10});
        };

        ko.track(model);

        var observableArray = ko.getObservable(model, "arrayData");
        console.log(ko.getObservable(observableArray, 0));

        var oldObservable = ko.getObservable(model, "arrayData[0]");
        addValidationRule(oldObservable);

        var validationGroup = new ClientFramework.ValidationGroup(observableArray);

        model.push(33);
        var newObservable = ko.getObservable(model, "arrayData[1]");
        addValidationRule(newObservable);

        validationGroup.Validate()
            .then(function(isValid){
                console.log(validationGroup.Errors);

                expect(isValid).to.be.false;
                expect(validationGroup.Errors.length).to.equal(1);
//                expect(validationGroup.Errors[0].PropertyName).to.equal("");
                done();
            })
            .catch(done);
    });

});
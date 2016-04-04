var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;

describe('Knockout Validation Walker', function () {

    it('should only hook validatable properties in a model', function () {
        var validatableModel = {
            nonValidationValue: 10,
            validatedValue: 22
        };

        ko.track(validatableModel);
        ko.getObservable(validatableModel, "validatedValue").extend({ required: true });

        var validationWalker = new ClientFramework.KnockoutValidationWalker();
        var validationHooks = validationWalker.ExtractValidationHooks(validatableModel);

        console.log(validationHooks);

        expect(validationHooks.length).to.equal(1);
        expect(validationHooks[0].PropertyName).to.equal("validatedValue");
    });

});
import * as Promise from "bluebird";
import * as ko from "knockout-es5";
import {ValidationHook} from "./validation-hook";
import {IValidationWalker} from "./ivalidation-walker";
import {IModelWalker} from "../walkers/imodel-walker";
import {ModelWalker} from "../walkers/model-walker";
import {WalkedEntry} from "../../dist/typings/walkers/walked-entry";

export class KnockoutValidationWalker implements IValidationWalker
{
    private modelWalker: IModelWalker;

    public ExtractValidationHooks = (model: any) : Array<ValidationHook> =>
    {
        var validationList = [];

        var examineEntry = function(entry: WalkedEntry): void {
            if(entry.Type == "object") { return; }

            let possibleObservable = ko.getObservable(entry.Model, entry.PropertyName);
            if(possibleObservable)
            {
                if(typeof(possibleObservable.isValid) == "function")
                {
                    let validationHook = new ValidationHook(
                        entry.PropertyName,
                        <Function>possibleObservable,
                        <Function>possibleObservable.error,
                        <Function>possibleObservable.isValid);

                    validationList.push(validationHook);
                }
            }
        };

        this.modelWalker = new ModelWalker();
        this.modelWalker.WalkTree(model, examineEntry);
        return validationList;
    };
}
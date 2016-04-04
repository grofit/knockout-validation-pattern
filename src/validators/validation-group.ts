import * as Promise from "bluebird";
import * as ko from "knockout-es5";
import * as Enumerable from "linq";

import {ValidationHook} from "./validation-hook";
import {IValidationWalker} from "./ivalidation-walker";
import {KnockoutValidationWalker} from "./knockout-validation-walker";
import {ValidationError} from "./validation-error";
import {ObservableGroup} from "../observables/observable-group";
import {StructureWatcher} from "./structure-watcher";

export class ValidationGroup
{
    private validatorList: Array<ValidationHook>;
    private validationWalker: IValidationWalker;
    private observableGroup: ObservableGroup;
    private structureWatcher: StructureWatcher;

    public Errors: Array<ValidationError>;

    constructor(model: any)
    {
        this.validationWalker = new KnockoutValidationWalker();
        this.structureWatcher = new StructureWatcher();
        this.Errors = [];

        this.structureWatcher.NotifyOnChange(model, function(){
            this.generateValidationList(model);
        });

        this.generateValidationList(model);
    }

    private generateValidationList = (model: any) => {
        this.validatorList = this.validationWalker.ExtractValidationHooks(model);
    };

    public OnValidationChanged(subscription: Function)
    {
        var validatorList = Enumerable.from(this.validatorList);

        if(!this.observableGroup) {
            var observableList = validatorList.select("$.ValidationLocator").toArray();
            this.observableGroup = new ObservableGroup(observableList);
        }

        this.observableGroup.subscribe((value, observable) => {
            var validator = validatorList.single((x: ValidationHook) => { return x.ValidationLocator == observable });
            subscription(validator);
        });
    }

    public Validate(): Promise<boolean>
    {
        var areValid = (validators: Array<ValidationHook>) => {
            this.Errors.length = 0;
            for(let i=0;i<validators.length;i++)
            {
                let validationHook = validators[i];
                if(validationHook.ValidationLocator() == false)
                {
                    let validationError = new ValidationError(validationHook.PropertyName, validationHook.ErrorLocator());
                    this.Errors.push(validationError);
                }
            }
            return this.Errors.length <= 0;
        };

        return Promise.resolve(this.validatorList)
            .then(areValid);
    }
}
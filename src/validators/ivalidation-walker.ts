import {ValidationHook} from "./validation-hook";

export interface IValidationWalker {
    ExtractValidationHooks(model: any) : Array<ValidationHook>;
}
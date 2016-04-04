import {ValidationGroup} from "./validation-group"

export interface IValidator<T>
{
    CreateValidatorFor(model: T): ValidationGroup;
}
export class ValidationHook
{
    constructor(public PropertyName: string, public ValueLocator: Function,
                public ErrorLocator: Function, public ValidationLocator: Function)
    {}
}
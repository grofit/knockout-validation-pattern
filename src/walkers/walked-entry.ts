export class WalkedEntry
{
    public ValueAccessor(): any
    { return this.Model[this.PropertyName]; }

    constructor(public Type: string, public Model: any, public PropertyName: any)
    {}
}
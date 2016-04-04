export class ObservableGroup
{
    private observables: Array<KnockoutObservable<any>>;
    private throttleDuration: number;
    private throttleTimeout: any;

    constructor(observables: Array<KnockoutObservable<any>>)
    {
        this.observables = observables;
    }

    public throttle(duration: any) : ObservableGroup
    {
        this.throttleDuration = duration;
        return this;
    }

    public subscribe(handler: Function){
        var throttleObservable = (index: number) => {
            return (val: any) => {
                if(this.throttleDuration > 0) {
                    if(!this.throttleTimeout) {
                        this.throttleTimeout = setTimeout(() => {
                            this.throttleTimeout = undefined;
                            handler(val, this.observables[index]);
                        }, this.throttleDuration);
                    }
                }
                else
                { handler(val, this.observables[index]); }
            };
        };

        for(var i = 0; i < this.observables.length; i++)
        { this.observables[i].subscribe(throttleObservable(i)); }

        return this;
    }
}
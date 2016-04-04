import {WalkedEntry} from "./walked-entry";

export class ModelWalker
{
    private getObjectType(obj: any) : string
    {
        if ((obj) && (typeof (obj) === "object") && (obj.constructor == (new Date).constructor)) return "date";
        if(obj instanceof Array) { return "array"; }
        return typeof obj;
    }

    public WalkTree(model: any, propertyHandler: (entry: WalkedEntry) => void): void
    {
        for (var parameter in model)
        {
            var typeOfData = this.getObjectType(model[parameter]);
            switch(typeOfData)
            {
                case "object":
                {
                    propertyHandler(new WalkedEntry("object", model, parameter));
                    this.WalkTree(model[parameter], propertyHandler);
                }
                break;

                case "array":
                {
                    propertyHandler(new WalkedEntry("array", model, parameter));
                    model[parameter].forEach((entry: any, index: number) => {
                        this.WalkTree(model[parameter][index], propertyHandler);
                    });
                }
                break;

                default:
                {
                    if(typeof(model[parameter]) == "function")
                    { propertyHandler(new WalkedEntry("function", model, parameter)); }
                    else
                    { propertyHandler(new WalkedEntry(typeOfData, model, parameter)); }
                }
                break;
            }
        }
    }
}
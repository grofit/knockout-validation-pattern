import {IModelWalker} from "../walkers/imodel-walker";
import {ModelWalker} from "../walkers/model-walker";
import {WalkedEntry} from "../walkers/walked-entry";

export class StructureWatcher
{
    private modelWalker: IModelWalker;

    constructor()
    {
        this.modelWalker = new ModelWalker();
    }

    public NotifyOnChange(model: any, callback: Function)
    {
        this.modelWalker.WalkTree(model, (entry: WalkedEntry) => {
            if(entry.Type != "array") { return; }

            let possibleObservable = ko.getObservable(entry.Model, entry.PropertyName);

            if(possibleObservable)
            { possibleObservable.subscribe(function(changes){ callback(possibleObservable, changes); }, null, "arrayChange"); }
        });
    }
}
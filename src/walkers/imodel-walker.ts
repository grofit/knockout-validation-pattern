import {WalkedEntry} from "./walked-entry";

export interface IModelWalker
{
    WalkTree(model: any, propertyHandler: (entry: WalkedEntry) => void): void;
}
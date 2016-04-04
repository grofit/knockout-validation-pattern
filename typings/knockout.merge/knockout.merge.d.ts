/// <reference path="../knockout/knockout.d.ts" />
interface KnockoutMerge {
    fromJS(model: any, data: any): void;
    rules: Function[];
}

interface KnockoutObservableArray<T> {
    withMergeConstructor(objectConstructor: Function) : KnockoutObservableArray<T>;
    withMergeConstructor(objectConstructor: Function, replaceOnMerge: boolean) : KnockoutObservableArray<T>;
}

interface KnockoutObservable<T> {
    withMergeMethod(mergeMethod: Function) : KnockoutObservable<T>;
    withMergeRule(mergeRule: string) : KnockoutObservable<T>;
}

interface KnockoutStatic
{
    merge: KnockoutMerge;
}

declare var merge: KnockoutMerge;
declare module "knockout.merge"
{
    export = merge;
}
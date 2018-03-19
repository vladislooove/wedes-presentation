interface NodeListOf<TNode extends Node> extends NodeList {
    forEach(callbackfn: (value: TNode, index: number, listObj: NodeListOf<TNode>) => void, thisArg?: any): void 
}

export class NaryNode<T> {
    children: NaryNode<T>[] = [];

    constructor(public value: T) { }

    addChild(value: T): NaryNode<T> {
        const child = new NaryNode<T>(value);
        this.children.push(child);
        return child;
    }
}

export class NaryTree<T> {
    root: NaryNode<T>;

    constructor(rootValue: T) {
        this.root = new NaryNode<T>(rootValue);
    }

    toArray(): T[] {
        const result: T[] = [];
        const visit = (node: NaryNode<T>): void => {
            result.push(node.value);
            node.children.forEach(visit);
        };
        visit(this.root);
        return result;
    }
}
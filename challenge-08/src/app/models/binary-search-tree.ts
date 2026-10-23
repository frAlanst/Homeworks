import { TreeNode } from './tree-node';

export class BinarySearchTree {
    root: TreeNode | null = null;

    insert(value: number): void {
        const node = new TreeNode(value);

        if (!this.root) {
            this.root = node;
            return;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) {
                return;
            }
            if (value < current.value) {
                if (!current.left) {
                    current.left = node;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = node;
                    return;
                }
                current = current.right;
            }
        }
    }

    contains(value: number): boolean {
        let current = this.root;
        while (current) {
            if (value === current.value) {
                return true;
            }
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    inorder(): number[] {
        const result: number[] = [];
        const visit = (node: TreeNode | null): void => {
            if (!node) return;
            visit(node.left);
            result.push(node.value);
            visit(node.right);
        };
        visit(this.root);
        return result;
    }

    preorder(): number[] {
        const result: number[] = [];
        const visit = (node: TreeNode | null): void => {
            if (!node) return;
            result.push(node.value);
            visit(node.left);
            visit(node.right);
        };
        visit(this.root);
        return result;
    }

    postorder(): number[] {
        const result: number[] = [];
        const visit = (node: TreeNode | null): void => {
            if (!node) return;
            visit(node.left);
            visit(node.right);
            result.push(node.value);
        };
        visit(this.root);
        return result;
    }
}
export type NodeType = 'folder' | 'file';

export interface TreeNode {
    id: string;
    name: string;
    type: NodeType;
    parentId: string | null;
    ownerEmail: string;
    createdAt: Date;
    children: TreeNode[];
}
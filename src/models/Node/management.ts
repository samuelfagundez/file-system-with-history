import { Node } from './node';

export class NodeManagement {
  public actual_node: Node;
  public root: Node;

  constructor(node: Node) {
    this.actual_node = node;
    this.root = node;
  }

  /**
   * Function that handles traversing within the tree of nodes associated with this management.
   * 
   * @param name - name of the node to go to. If no name is provided, it will go to the root node.
   * @returns the destination node after the traversal.
   */
  public go(name?: string): Node {
    if (!name) {
      this.go_to_root();
    } else {
      this.go_to_node(name);
    }

    return this.actual_node;
  }

  /**
   * Helper function that ubicates the actual node to the root node.
   * 
   * @returns void
   */
  private go_to_root(): void {
    this.actual_node = this.root;
  }

  /**
   * Helper function that ubicates the actual node to the node with the provided name.
   * 
   * @param name - name of the node to go to.
   * 
   * @returns - a boolean indicating if the node was found or not.
   */
  private go_to_node(name: string): boolean {
    let found = false;

    Object.keys(this.actual_node.childs).forEach((child) => {
      if (child === name) {
        found = true;
        this.actual_node = this.actual_node.childs[child];
      }
    });

    return found;
  }
}
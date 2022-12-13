import { NodeManagement, Node } from "../Node";
import { Version } from "./version";

export class CELV {
  public is_initialized: boolean;
  public current_version: string | null;
  public root_node: Node | null;
  // public node_management: NodeManagement | null;
  public version_history: string[];
  public version_directory: Record<string, Version>;

  constructor() {
    this.is_initialized = false;
    this.current_version = null;
    this.root_node = null;
    // this.node_management = null;
    this.version_history = [];
    this.version_directory = {};
  }

  public init(root: Node): void {
    this.is_initialized = true;
    this.root_node = root;
    // this.node_management = new NodeManagement(root);
    // TODO: verify that in the tree there is not another descendant initialized. Can be done in the manager and not here
  }

  public create_version(): void {
    if (!this.is_initialized) throw new Error("CELV no está inicializado.");
    if (!this.root_node) throw new Error("No existe un nodo raíz.");

    const new_version = new Version(this.deep_copy(this.root_node));
    this.version_history.push(new_version.id);
    this.version_directory[new_version.id] = new_version;
    this.current_version = new_version.id;
  }



  /**
   * Function to create a clone of a Node instance.
   * 
   * What we define as the clone of a Node is a copy of the instance and their childs, and them their childs, and so on.
   * We use recursion on the childs to achieve this.
	 *
	 * @param node - node to clone
	 * @returns the root of the clone Node.
	 */
	private deep_copy(node: Node): Node {
		const nodeToCopy = { ...node } as Node;
		Object.keys(nodeToCopy.childs).forEach((child) => {
			nodeToCopy.childs[child] = this.deep_copy(nodeToCopy.childs[child]);
		});
		return nodeToCopy;
	}
}
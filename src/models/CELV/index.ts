import { Node } from '../Node';
import { Version } from './version';

export class CELV {
	public is_initialized: boolean;
	public current_version: string | null;
	public root_node: Node | null;
	public version_history: string[];
	public version_directory: Record<string, Version>;

	constructor() {
		this.is_initialized = false;
		this.current_version = null;
		this.root_node = null;
		this.version_history = [];
		this.version_directory = {};
	}

	/**
	 * Function that initializes the version manager CELV.
	 *
	 * In order to achieve that, what is being done is:
	 * - The `is_initialized` flag is set to `true`.
	 * - A root folder for the version manager is set.
	 *
	 * @throws Error - if the version manager is already initialized.
	 *
	 * @param root
	 */
	public celv_iniciar(root: Node): void {
		if (this.is_initialized) throw new Error('CELV ya está inicializado.');
		if (this.root_node) throw new Error('No existe un nodo raíz.');

		this.is_initialized = true;
		this.root_node = root;
	}

	/**
	 * Function that creates a new version for the version manager.
	 *
	 * The CELV is initialized in a root node, and it is also responsible for
	 * keeping an eye on all descendant nodes. So, if a change occurs in a node, it must
	 * be registered.
	 *
	 * All version will contain a deep copy of the tree of nodes generated by the root node.
	 * This ensures that the version manager will not be affected by any changes made to the
	 * tree of nodes, by any of the references.
	 *
	 * @throws Error - if the version manager is not initialized.
	 * @throws Error - if the root node is not set.
	 *
	 * @returns void
	 */
	public createVersion(): void {
		if (!this.is_initialized) throw new Error('CELV no está inicializado.');
		if (!this.root_node) throw new Error('No existe un nodo raíz.');

		const new_version = new Version(this.deep_copy(this.root_node));
		this.version_history.push(new_version.id);
		this.version_directory[new_version.id] = new_version;
		this.current_version = new_version.id;
	}

	/**
	 * Function that verifies there are changes between the current tree
	 * of nodes and the previous version's tree of nodes.
	 *
	 * @returns a boolean indicating if there are changes or not.
	 */
	public areNewChanges(): boolean {
		if (!this.is_initialized) throw new Error('CELV no está inicializado.');
		if (!this.root_node) throw new Error('No existe un nodo raíz.');
		if (!this.current_version)
			throw new Error('No existe una versión actual.');

		const previous_root =
			this.version_directory[
				this.version_history[this.version_history.length - 1]
			].root;
		const current_root = this.version_directory[this.current_version].root;

		return this.compareNodes(current_root, previous_root);
	}

	/**
	 * Function that compares if two nodes and their respective
	 * tree of nodes is equal.
	 *
	 * @param node1
	 * @param node2
	 * @returns
	 */
	private compareNodes(node1: Node, node2: Node): boolean {
		if (node1.name !== node2.name) return false;
		if (node1.type !== node2.type) return false;
		if (node1.content !== node2.content) return false;
		if (node1.childs.length !== node2.childs.length) return false;

		let are_equal = true;
		Object.keys(node1.childs).forEach((child) => {
			if (!this.compareNodes(node1.childs[child], node2.childs[child])) {
				are_equal = false;
			}
		});

		return are_equal;
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

	/**
	 * Function that changes the current version of the CELV, in order to explore one of the
	 * other version available in the version history.
	 *
	 * @param versionId - the version that we want to set as the current one.
	 *
	 * @throws Error - if the version manager is not initialized
	 * @throws Error - if there is no root node
	 * @throws Error - if there is no desired versionId registered as a CELV version.
	 *
	 * @returns void
	 */
	public celv_vamos(versionId: string): void {
		if (!this.is_initialized) throw new Error('CELV no está inicializado.');
		if (!this.root_node) throw new Error('No existe un nodo raíz.');
		if (!this.version_history.includes(versionId))
			throw new Error('No existe la versión deseada.');

		this.current_version = versionId;
		this.root_node = this.version_directory[versionId].root;
	}
}

export class Node {
	public name: string;
	public type: "d" | "f";
	public content?: string;
	public childs: Record<string, Node>;
	public parent: Node | null;

	constructor(name: string, type: string, content?: string, parent?: Node) {
		this.childs = {};
		this.parent = parent || null;

		if (type !== "d" && type !== "f") throw new Error("El tipo de nodo es inválido.");

		this.type = type;

		if (!name) throw new Error("El nombre de un directorio no puede ser vacío.");
		this.name = name;

		if (type !== "f" && content) throw new Error("Un directorio solo puede tener contenido.");
		this.content = content;
	}


	/**
	 * Function that creates a directory or a file.
	 * 
	 * In order to create succesfully either, the following conditions must be met:
	 * - The node must be a directory.
	 * - The name must not be empty.
	 * - The name must not be the name of an existing file or directory inside the current directory.
	 *
	 * @param nombre - name of the directory or file to create.
	 * @param type - type of the node to create, must be either 'd' or 'f'.
	 * 
	 * @throws Error if the node is a file.
	 * @throws Error if the name is empty.
	 * @throws Error if the name is the name of an existing file or directory inside the current directory.
	 * 
	 * @returns void
	 */
	public create(nombre: string, type: string): void {
		if (this.type === "f") throw new Error("Un archivo no puede tener hijos.");
		if (!nombre) throw new Error("El nombre del directorio no puede ser vacío.");

		const exists: boolean = !!this.childs[nombre];
		if (exists) throw new Error("El directorio a crear ya existe.");

		const newNode = new Node(nombre, type, undefined, this);
		this.childs = { ...this.childs, [nombre]: newNode };
	}

	/**
	 * Function that deletes a file or directory from the current level.
	 * 
	 * If the file is a directory, it will delete all of its children.
	 *
	 * @param nombre - name of the file or directory to delete.
	 * 
	 * @throws Error if the name is empty.
	 * @throws Error if the file or directory does not exist.
	 * 
	 * @returns void
	 */
	public delete(nombre: string): void {
		if (!nombre) throw new Error("El nombre del archivo o directorio a eliminar no puede ser vacío.");

		const exists: boolean = !!this.childs[nombre];
		if (!exists) throw new Error("El archivo o directorio a eliminar no existe.");

		Object.keys(this.childs[nombre].childs).forEach((child) => {
			this.childs[nombre].delete(child);
		});
		delete this.childs[nombre];
	}

	/**
	 * Function that reads the content of a file.
	 * 
	 * If the file does not exist or it is a directory, it will throw an error.
	 *
	 * @param nombre - name of the file to read.
	 * 
	 * @throws Error if the name is empty.
	 * @throws Error if the file does not exist.
	 * @throws Error if the file is a directory.
	 *
	 * @returns - contenido del archivo.
	 */
	public read(nombre: string): string {
		if (!nombre) throw new Error("El nombre del archivo a leer no puede ser vacío.");

		const exists: boolean = !!this.childs[nombre];
		if (!exists) throw new Error("El archivo a leer no existe.");

		if (this.childs[nombre].type !== "f") throw new Error("El archivo a leer no es un archivo.");

		return this.childs[nombre].content || "";
	}

	/**
	 * Function that allows writing content in a file.
	 * 
	 * If the file does not exist or it is a directory, it will throw an error.
	 *
	 * @param nombre - name of the file to write.
	 * @param contenido - content to write in the file.
	 * 
	 * @throws Error if the name is empty.
	 * @throws Error if the file does not exist.
	 * @throws Error if the file is a directory.
	 * 
	 * @returns void
	 */
	public escribir(nombre: string, content: string): void {
		if (!nombre) throw new Error("El nombre del archivo a escribir no puede ser vacío.");

		const exists: boolean = !!this.childs[nombre];
		if (!exists) throw new Error("El archivo a escribir no existe.");

		if (this.childs[nombre].type !== "f") throw new Error("El archivo a escribir no es un archivo.");

		this.childs[nombre].content = content;
	}

}

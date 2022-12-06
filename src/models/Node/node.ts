export class Node {
	private name: string;
	private type: 'd' | 'f';
	private content?: string;
	private childs: Record<string, Node>;
	private parent: Node | null;

	// Description debe ser algo como 'f name content'
	constructor(description: string, parent?: Node) {
		const splittedDescription = description.split(' ');
		this.childs = {};
		this.parent = parent || null;
		// Si hay 2 argumentos y el primero es d entonces
		if (
			splittedDescription.length === 2 &&
			splittedDescription[0] === 'd'
		) {
			// Es un directorio
			this.type = 'd';
			// Y debe tener un nombre valido
			if (splittedDescription[1]) {
				this.name = splittedDescription[1];
			} else {
				throw new Error(
					'El nombre de archivos y directorios no puede ser vacío.'
				);
			}
			// Si hay 2 o 3 argumentos y el primero es f entonces
		} else if (
			(splittedDescription.length === 2 ||
				splittedDescription.length === 3) &&
			splittedDescription[0] === 'f'
		) {
			// es un file
			this.type = 'f';
			// y debe tener un nombre válido.
			if (splittedDescription[1]) {
				this.name = splittedDescription[1];
			} else {
				throw new Error(
					'El nombre de archivos y directorios no puede ser vacío.'
				);
			}
			// El contenido puede ser vacío.
			this.content = splittedDescription[2] || '';
		} else {
			throw new Error('El archivo o directorio es inválido.');
		}
	}

	/**
	 * Función que crea un directorio.
	 * No puede existir un archivo o directorio con ese nombre.
	 * No retorna nada.
	 *
	 * @param nombre - nombre del directorio a crear, no puede ser vacío.
	 */
	crear_dir(nombre: string): void {
		if (nombre) {
			const exists: boolean = !!this.childs[nombre];
			if (exists) {
				console.log('El directorio a crear ya existe.');
			} else {
				const newDir = new Node(`d ${nombre}`, this);
				this.childs = { ...this.childs, [nombre]: newDir };
			}
		} else {
			console.log('El nombre del directorio no puede ser vacío.');
		}
	}

	/**
	 * Función que crea un archivo.
	 * No puede existir un archivo o directorio con ese nombre.
	 * No retorna nada.
	 *
	 * @param nombre - nombre del archivo a crear, no puede ser vacío.
	 */
	crear_archivo(nombre: string): void {
		if (nombre) {
			const exists: boolean = !!this.childs[nombre];
			if (exists) {
				console.log('El archivo a crear ya existe.');
			} else {
				const newDir = new Node(`f ${nombre}`, this);
				this.childs = { ...this.childs, [nombre]: newDir };
			}
		} else {
			console.log('El nombre del archivo no puede ser vacío.');
		}
	}

	/**
	 * Función que elimina un archivo o directorio del nivel actual.
	 * No retorna nada.
	 *
	 * @param nombre - nombre del archivo a crear, no puede ser vacío.
	 */
	eliminar(nombre: string): void {
		// TODO: hacer borrado recursivo.
		const exists: boolean = !!this.childs[nombre];
		if (!exists) {
			console.log('El archivo a borrar no existe.');
		} else {
			delete this.childs[nombre];
		}
	}

	/**
	 * Función que lee el contenido de un archivo.
	 * Falla si el archivo no existe o se trata de leer un directorio.
	 *
	 * @param nombre - nombre del archivo a leer, no puede ser vacío.
	 *
	 * @returns El contenido del archivo o undefined en caso de no poder leerlo.
	 */
	leer(nombre: string): string | undefined {
		let exists: boolean = !!this.childs[nombre];
		if (!exists) {
			console.log('El archivo a leer no existe.');
		} else if (exists && this.childs[nombre].type === 'd') {
			console.log('El archivo a leer es un directorio.');
		} else {
			console.log(!!this.childs[nombre].content);
			return this.childs[nombre].content;
		}
	}

	/**
	 * Función que permite escribir contenido en un archivo.
	 * Falla si se trata de escribir en un directorio.
	 * No retorna nada.
	 *
	 * @param nombre - nombre del archivo a leer, no puede ser vacío.
	 * @param contenido - contenido del archivo.
	 */
	escribir(nombre: string, contenido: string): void {
		let exists: boolean = !!this.childs[nombre];
		if (!exists) {
			console.log('El archivo a escribir no existe.');
		} else if (exists && this.childs[nombre].type === 'd') {
			console.log('El archivo a escribir es un directorio.');
		} else {
			console.log(!!this.childs[nombre].content);
			this.childs[nombre].content = contenido;
		}
	}

	/**
	 * Función que permite navegar entre los directorios.
	 * No retorna nada.
	 *
	 * @param nombre - nombre del archivo al cual se desea navegar, puede ser undefined para navegar
	 * al nivel superior, no puede ser vacío.
	 * @returns Retorna el nodo del nuevo nivel al que se ha navegado o undefined en caso de que no se haya podido navegar.
	 */
	ir(nombre?: string): Node | undefined {
		if (nombre) {
			let exists: boolean = !!this.childs[nombre];
			if (!exists || this.childs[nombre].type === 'f') {
				console.log('El archivo a ir no existe.');
			} else if (exists && this.childs[nombre].type === 'f') {
				console.log('El archivo a ir no es un directorio.');
			} else {
				return this.childs[nombre];
			}
		} else {
			if (typeof nombre === 'string') {
				console.log('El archivo a ir no existe.');
			} else {
				if (this.parent) {
					return this.parent;
				} else {
					console.log('Es la raiz del arbol.');
				}
			}
		}
	}
}

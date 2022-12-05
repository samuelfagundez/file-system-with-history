// d usb
// f notas.txt

export class Node {
	private name: string;
	private type: 'd' | 'f';
	private content?: string;
	private childs: Record<string, Node>;
	private parent: Node | null;

	constructor(description: string, parent?: Node) {
		const splittedDescription = description.split(' ');
		this.childs = {};
		this.parent = parent || null;
		if (
			splittedDescription.length === 2 &&
			splittedDescription[0] === 'd'
		) {
			this.type = 'd';
			if (splittedDescription[1]) {
				this.name = splittedDescription[1];
			} else {
				throw new Error(
					'El nombre de archivos y directorios no puede ser vacío.'
				);
			}
		} else if (
			(splittedDescription.length === 2 ||
				splittedDescription.length === 3) &&
			splittedDescription[0] === 'f'
		) {
			this.type = 'f';
			if (splittedDescription[1]) {
				this.name = splittedDescription[1];
			} else {
				throw new Error(
					'El nombre de archivos y directorios no puede ser vacío.'
				);
			}
			this.content = splittedDescription[2] || '';
		} else {
			throw new Error('El archivo o directorio es inválido.');
		}
	}

	crear_dir(nombre: string): void {
		// agregar validacion de nombre string vacio.
		const exists: boolean = !!this.childs[nombre];
		if (exists) {
			console.log('El directorio a crear ya existe.');
		} else {
			const newDir = new Node(`d ${nombre}`, this);
			this.childs = { ...this.childs, [nombre]: newDir };
		}
	}

	crear_archivo(nombre: string): void {
		// agregar validacion de nombre string vacio.
		const exists: boolean = !!this.childs[nombre];
		if (exists) {
			console.log('El archivo a crear ya existe.');
		} else {
			const newDir = new Node(`f ${nombre}`, this);
			this.childs = { ...this.childs, [nombre]: newDir };
		}
	}

	eliminar(nombre: string): void {
		// agregar validacion de nombre string vacio.
		// TODO: hacer borrado recursivo.
		const exists: boolean = !!this.childs[nombre];
		if (!exists) {
			console.log('El archivo a borrar no existe.');
		} else {
			delete this.childs[nombre];
		}
	}

	leer(nombre: string): string | undefined {
		// agregar validacion de nombre string vacio.
		let exists: boolean = !!this.childs[nombre];
		if (!exists) {
			console.log('El archivo a leer no existe.');
		} else {
			console.log(!!this.childs[nombre].content);
			return this.childs[nombre].content;
		}
	}

	escribir(nombre: string, contenido: string): void {
		// agregar validacion de nombre string vacio.
		let exists: boolean = !!this.childs[nombre];
		if (!exists) {
			console.log('El archivo a escribir no existe.');
		} else {
			console.log(!!this.childs[nombre].content);
			this.childs[nombre].content = contenido;
		}
	}

	ir(nombre?: string): Node | undefined {
		// agregar validacion de nombre string vacio.
		if (nombre) {
			let exists: boolean = !!this.childs[nombre];
			if (!exists || this.childs[nombre].type === 'f') {
				console.log('El archivo a ir no existe.');
			} else {
				return this.childs[nombre];
			}
		} else {
			if (this.parent) {
				return this.parent;
			} else {
				console.log('Es la raiz del arbol.');
			}
		}
	}
}

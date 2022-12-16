import { NodeManagement, Node } from './models/Node';
import { MenuOptions } from './models/menuOptions';
import menu from './menu';

export const menuText = `
1. Crear directorio
2. Crear archivo
3. Eliminar archivo o directorio
4. Leer archivo
5. Escribir archivo
6. Navegar a un directorio
7. Iniciar CELV
8. Obtener historia del CELV
9. Ir a una version 
10. Salir

Indique el número de la operacion a realizar:`;

const main = () => {
	let opt: MenuOptions;
	const treeManager = new NodeManagement(new Node('.', 'd'));
	// Opening a socket for listening and processing
	console.clear();
	console.log(menuText);
	process.stdin.on('data', (data) => {
		// Data is a buffer which requires casting
		// Also, removing the break line at the end
		opt = data.toString().slice(0, -1) as MenuOptions;
		if (opt === MenuOptions.salir) process.exit();
		menu(opt, treeManager);
	});
};

main();

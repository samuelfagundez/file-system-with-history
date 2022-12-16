import { menuText } from '.';
import { MenuOptions } from './models/menuOptions';
import { NodeManagement } from './models/Node';

// This function is in charge of managing the user selected option to display
const menu = async (opt: MenuOptions, treeManager: NodeManagement) => {
	let mensajeDeSalida: string = '';
	switch (opt) {
		case MenuOptions.crear_dir:
			console.log(`Indique el nombre del directorio a crear:`);
			const stdin = process.openStdin();
			const inputPromise = new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					const name = data.toString();
					try {
						treeManager.actual_node.create(name, 'd');
						resolve('El directorio fue creado con éxito.');
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
					stdin.end();
				});
			});
			mensajeDeSalida = await inputPromise;
			break;

		case MenuOptions.crear_archivo:
			console.log('creando archivo');
			break;

		case MenuOptions.eliminar:
			console.log('eliminando');
			break;

		case MenuOptions.leer:
			console.log('leyendo');
			break;

		case MenuOptions.escribir:
			console.log('escribiendo');
			break;

		case MenuOptions.ir:
			console.log('yendo');
			break;

		case MenuOptions.celv_iniciar:
			console.log('iniciando celv');
			break;

		case MenuOptions.celv_historia:
			console.log('obteniendo historia');
			break;

		case MenuOptions.celv_vamos:
			console.log('celv yendo');
			break;

		default:
			console.log('Error, acción no valida');
			break;
	}
	console.clear();
	console.log(mensajeDeSalida || 'Hubo un error inesperado.');
	console.log(menuText);
};

export default menu;

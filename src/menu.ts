import { menuText } from '.';
import { MenuOptions } from './models/menuOptions';
import { NodeManagement } from './models/Node';

// This function is in charge of managing the user selected option to display
const menu = async (opt: MenuOptions, treeManager: NodeManagement) => {
	let mensajeDeSalida: string = '';
	const stdin = process.openStdin();
	switch (opt) {
		case MenuOptions.crear_dir:
			console.log(`Indique el nombre del directorio a crear:`);
			mensajeDeSalida = await new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					const name = data.toString();
					try {
						treeManager.actual_node.crear_dir(name);
						resolve('El directorio fue creado con éxito.');
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
				});
			});
			break;

		case MenuOptions.crear_archivo:
			console.log(`Indique el nombre del archivo a crear:`);
			mensajeDeSalida = await new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					const name = data.toString();
					try {
						treeManager.actual_node.crear_archivo(name);
						resolve('El archivo fue creado con éxito.');
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
				});
			});
			break;

		case MenuOptions.eliminar:
			console.log(
				`Indique el nombre del archivo o directorio a eliminar:`
			);
			mensajeDeSalida = await new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					const name = data.toString();
					try {
						treeManager.actual_node.eliminar(name);
						resolve('Fue borrado con éxito.');
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
				});
			});
			break;

		case MenuOptions.leer:
			console.log(`Indique el nombre del archivo a leer:`);
			mensajeDeSalida = await new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					const name = data.toString();
					try {
						const content = treeManager.actual_node.leer(name);
						resolve(content);
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
				});
			});
			break;

		case MenuOptions.escribir:
			console.log(
				`Indique la información del archivo a escribir, Este debe ser en formato <nombre>,<contenido>:`
			);
			mensajeDeSalida = await new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					try {
						const info = (data.toString() as string).split(',');
						treeManager.actual_node.escribir(info[0], info[1]);
						resolve('Fue escrito con éxito.');
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
				});
			});
			break;

		case MenuOptions.ir:
			console.log(
				`Indique el directorio al cual desea navegar, no introduzca nada si desea navegar al nivel superior:`
			);
			mensajeDeSalida = await new Promise<string>((resolve, reject) => {
				stdin.addListener('data', (data) => {
					const name = data.toString() as string;
					try {
						treeManager.ir(name);
						resolve('Navegación exitosa.');
					} catch (e) {
						const errorHandler = e as { message: string };
						reject(errorHandler.message);
					}
				});
			});
			break;

		case MenuOptions.celv_iniciar:
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
	stdin.end();
	console.clear();
	console.log(mensajeDeSalida || 'Hubo un error inesperado.');
	console.log(menuText);
};

export default menu;

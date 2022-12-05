import { Node } from './models/Node';

const main = () => {
	try {
		const root = new Node('d usb');
		console.log(root);
		root.crear_dir('test');
		root.crear_archivo('test2');
		root.eliminar('test');
		console.log(root);
	} catch (e) {
		const errorHandler = e as { message: string };
		console.log(errorHandler.message);
	}
};

main();

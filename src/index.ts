import { Node } from './models/Node';

const main = () => {
	try {
		const root = new Node('root', 'd');
		console.log(root);
		root.create('test', 'd');
		root.create('test2', 'f');
		root.delete('test');
		console.log(root);
		console.log(root.childs['test2'].parent);
	} catch (e) {
		const errorHandler = e as { message: string };
		console.log(errorHandler.message);
	}
};

main();

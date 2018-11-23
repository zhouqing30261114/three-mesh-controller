import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/three-mesh-controller.js',
		format: 'umd',
		name: 'MeshController',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
	],
};

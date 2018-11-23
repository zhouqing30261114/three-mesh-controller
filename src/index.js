import { Vector2, Vector3, MOUSE } from 'three';

const STATE = { NONE: -1, ROTATE: 0 };

const state = Symbol();
const rotateStart = Symbol();
const rotateEnd = Symbol();
const rotateDelta = Symbol();

class MeshController {
	constructor(mesh, domElement = document) {
		this.domElement = domElement;
		this.mesh = mesh;

		this[state] = STATE.NONE;
		this[rotateStart] = new Vector2();
		this[rotateEnd] = new Vector2();
		this[rotateDelta] = new Vector2();

		this.domElement.addEventListener('contextmenu', this.onContextMenu.bind(this), false);
		this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
	}
	handleMouseDownRotate(ev) {
		this[rotateStart].set(ev.clientX, ev.clientY);
	}
	handleMouseMoveRotate(ev) {
		this[rotateEnd].set(ev.clientX, ev.clientY);
		this[rotateDelta].subVectors(this[rotateEnd], this[rotateStart]);
		this[rotateStart].copy(this[rotateEnd]);
		this.update();
	}
	onContextMenu(ev) {
		ev.preventDefault();
	}
	onMouseDown(ev) {
		ev.preventDefault();
		if (ev.button === MOUSE.LEFT) {
			this[state] = STATE.ROTATE;
			this.handleMouseDownRotate(ev);
			this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
			this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
		}
	}
	onMouseMove(ev) {
		ev.preventDefault();
		if (this[state] === STATE.ROTATE) {
			this.handleMouseMoveRotate(ev);
		}
	}
	onMouseUp(ev) {
		ev.preventDefault();
		this[state] = STATE.NONE;
		this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
		this.domElement.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
	}
	update() {
		const angle = 2 * Math.PI * (this[rotateDelta].length() / this.domElement.clientWidth);
		let axis = this[rotateDelta].clone().rotateAround(new Vector2(0, 0), Math.PI / 2);
		axis = (new Vector3(axis.x, axis.y, 0)).normalize();
		this.mesh.rotateOnWorldAxis((new Vector3(axis.x, axis.y, 0)).normalize(), angle);
	}
}

export default MeshController;

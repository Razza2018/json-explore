const input = document.getElementById("jsonInput");
const viewer = document.getElementById("viewer");

function createNode(key, value) {
	const node = document.createElement("div");
	const isArray = Array.isArray(value);
	const isObject = typeof value === "object" && value !== null;

	if (isObject) {
		node.classList.add("collapsed");
		node.classList.add(isArray ? "array" : "object");
	}

	const keyEl = document.createElement("p");
	keyEl.className = "key";
	keyEl.textContent = key + (isObject ? ":" : `:`);

	const valueEl = document.createElement("p");
	valueEl.className = "value";

	if (typeof value === "string") {
		value = `"${value}"`;
	}

	if (value === null) {
		value = 'null';
	}

	valueEl.textContent = (!isObject ? value : '');

	node.appendChild(keyEl);
	node.appendChild(valueEl);

	if (isObject) {
		const container = document.createElement("div");
		container.className = "container";

		const entries = isArray ? value.map((v, i) => [i, v]) : Object.entries(value);

		for (const [k, v] of entries) {
			container.appendChild(createNode(k, v));
		}

		node.appendChild(container);

		keyEl.addEventListener("click", () => {
			node.classList.toggle("collapsed");
		});
	}

	return node;
}

function renderViewer(json) {
	viewer.innerHTML = "";
	if (typeof json === "object" && json !== null) {
		for (const [key, value] of Object.entries(json)) {
			viewer.appendChild(createNode(key, value));
		}
	}
}

input.addEventListener("input", () => {
	try {
		const json = JSON.parse(input.value);
		renderViewer(json);
	} catch (e) {
		viewer.innerHTML = `<div style='color: red;'>Invalid JSON</div>`;
	}
});

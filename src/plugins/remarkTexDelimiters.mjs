function paragraphDisplayMath(node) {
	if (node?.type !== 'paragraph' || node.children?.length !== 1) return null;

	const child = node.children[0];
	if (child.type !== 'text') return null;

	const value = child.value.trim();
	const escapedMatch = value.match(/^\\\[([\s\S]+?)\\\]$/);
	const parsedMatch = value.match(/^\[([\s\S]+?)\]$/);
	const match = escapedMatch || parsedMatch;
	const math = match ? match[1].trim() : null;

	return math && looksLikeMath(math) ? math : null;
}

function looksLikeMath(value) {
	return /\\[A-Za-z]+|[_^{}]|[=<>]|[-+*/]/.test(value);
}

function createMathNode(value) {
	return {
		type: 'math',
		meta: null,
		value,
		data: {
			hName: 'pre',
			hChildren: [
				{
					type: 'element',
					tagName: 'code',
					properties: { className: ['language-math', 'math-display'] },
					children: [{ type: 'text', value }],
				},
			],
		},
	};
}

function createInlineMathNode(value) {
	return {
		type: 'inlineMath',
		value,
		data: {
			hName: 'code',
			hProperties: { className: ['language-math', 'math-inline'] },
			hChildren: [{ type: 'text', value }],
		},
	};
}

function replaceInlineMath(parent) {
	if (!Array.isArray(parent.children)) return;

	const children = [];
	const inlineMathPattern = /\\\(([\s\S]+?)\\\)/g;

	for (const child of parent.children) {
		if (child.type !== 'text') {
			children.push(child);
			continue;
		}

		let lastIndex = 0;
		let match;
		inlineMathPattern.lastIndex = 0;

		while ((match = inlineMathPattern.exec(child.value)) !== null) {
			if (match.index > lastIndex) {
				children.push({ type: 'text', value: child.value.slice(lastIndex, match.index) });
			}

			children.push(createInlineMathNode((match[1] || match[2]).trim()));
			lastIndex = inlineMathPattern.lastIndex;
		}

		if (lastIndex === 0) {
			children.push(child);
		} else if (lastIndex < child.value.length) {
			children.push({ type: 'text', value: child.value.slice(lastIndex) });
		}
	}

	parent.children = children;
}

function transformNode(node) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'code' || node.type === 'inlineCode') return;

	if (!Array.isArray(node.children)) return;

	for (let index = 0; index < node.children.length; index += 1) {
		const child = node.children[index];
		const displayMath = paragraphDisplayMath(child);

		if (displayMath) {
			node.children[index] = createMathNode(displayMath);
			continue;
		}

		transformNode(child);
	}

	replaceInlineMath(node);
}

export default function remarkTexDelimiters() {
	return transformNode;
}

import katex from 'katex';
import { fromHtml } from 'hast-util-from-html';

function looksLikeMath(value) {
	return /\\[A-Za-z]+|[_^{}]|[=<>]|[-+*/]/.test(value);
}

function katexNodes(value, displayMode) {
	const html = katex.renderToString(value, {
		displayMode,
		throwOnError: false,
	});

	return fromHtml(html, { fragment: true }).children;
}

function getDisplayMath(node) {
	if (node?.type !== 'element' || node.tagName !== 'p' || node.children?.length !== 1) return null;

	const child = node.children[0];
	if (child.type !== 'text') return null;

	const value = child.value.trim();
	const escapedMatch = value.match(/^\\\[([\s\S]+?)\\\]$/);
	const parsedMatch = value.match(/^\[([\s\S]+?)\]$/);
	const match = escapedMatch || parsedMatch;
	const math = match ? match[1].trim() : null;

	return math && looksLikeMath(math) ? math : null;
}

function replaceInlineMath(parent) {
	if (!Array.isArray(parent.children)) return;

	const nextChildren = [];
	const inlinePattern = /\\\(([\s\S]+?)\\\)|\(([^()]*?(?:\\[A-Za-z]+|[_^{}]|[=<>])[^()]*?)\)/g;

	for (const child of parent.children) {
		if (child.type !== 'text') {
			nextChildren.push(child);
			continue;
		}

		let lastIndex = 0;
		let match;
		inlinePattern.lastIndex = 0;

		while ((match = inlinePattern.exec(child.value)) !== null) {
			if (match.index > lastIndex) {
				nextChildren.push({ type: 'text', value: child.value.slice(lastIndex, match.index) });
			}

			nextChildren.push(...katexNodes((match[1] || match[2]).trim(), false));
			lastIndex = inlinePattern.lastIndex;
		}

		if (lastIndex === 0) {
			nextChildren.push(child);
		} else if (lastIndex < child.value.length) {
			nextChildren.push({ type: 'text', value: child.value.slice(lastIndex) });
		}
	}

	parent.children = nextChildren;
}

function transformNode(node) {
	if (!node || typeof node !== 'object') return;
	if (!Array.isArray(node.children)) return;

	for (let index = 0; index < node.children.length; index += 1) {
		const child = node.children[index];
		const displayMath = getDisplayMath(child);

		if (displayMath) {
			node.children.splice(index, 1, ...katexNodes(displayMath, true));
			index += 1;
			continue;
		}

		transformNode(child);
	}

	replaceInlineMath(node);
}

export default function rehypeTexDelimiters() {
	return transformNode;
}

import { Tree } from './binary-search-tree.js';

const BST = Tree([7, 3, 1, 4, 1, 6, 5, 8, 9]);

console.log(BST);

// BST.insert(7.5);
// BST.delete(5);

BST.postOrderForEach((node) => {console.log(node)});

BST.prettyPrint();

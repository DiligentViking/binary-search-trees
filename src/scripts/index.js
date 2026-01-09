import { Tree } from './binary-search-tree.js';

const BST = Tree([7, 3, 1, 4, 1, 6, 5, 8, 9]);

BST.postOrderForEach((node) => {console.log(node.data)});

BST.prettyPrint();

// ----------
`
const arrOfRandNums = [];
for (let i = 0; i < 20; i++) {
  arrOfRandNums.push(Math.round(Math.random() * 100));
}

const BSTree = Tree(arrOfRandNums);

BSTree.levelOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.inOrderForEach_R((node) => {console.log(node)});
console.log('');
BSTree.preOrderForEach_R((node) => {console.log(node)});
console.log('');
BSTree.postOrderForEach_R((node) => {console.log(node)});

console.log(BSTree.isBalanced());
for (let i = 0; i < 10; i++) {
  BSTree.insert_R(Math.round(Math.random() * 1000));
}
console.log(BSTree.isBalanced());
BSTree.rebalance();
console.log(BSTree.isBalanced());

BSTree.levelOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.inOrderForEach_R((node) => {console.log(node)});
console.log('');
BSTree.preOrderForEach_R((node) => {console.log(node)});
console.log('');
BSTree.postOrderForEach_R((node) => {console.log(node)});

BSTree.prettyPrint();
`

import { Tree } from './binary-search-tree.js';

const BST = Tree([7, 3, 1, 4, 1, 6, 5, 8, 9]);

console.log(BST);

BST.insert(10);
// BST.insert(7.5);
// BST.delete(5);

// BST.inOrderForEach((node, height) => {console.log(node, height)});

BST.rebalance();

console.log(
  BST.isBalanced()
);

BST.prettyPrint();

// ----------

const arrOfRandNums = [];
for (let i = 0; i < 20; i++) {
  arrOfRandNums.push(Math.round(Math.random() * 100));
}

const BSTree = Tree(arrOfRandNums);

BSTree.levelOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.inOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.preOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.postOrderForEach((node) => {console.log(node)});

console.log(BSTree.isBalanced());
for (let i = 0; i < 10; i++) {
  BSTree.insert(Math.round(Math.random() * 1000));
}
console.log(BSTree.isBalanced());
BSTree.rebalance();
console.log(BSTree.isBalanced());

BSTree.levelOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.inOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.preOrderForEach((node) => {console.log(node)});
console.log('');
BSTree.postOrderForEach((node) => {console.log(node)});

BSTree.prettyPrint();

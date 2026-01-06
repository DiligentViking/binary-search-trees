function Node(data, left, right) {
  return {
    data,
    left,
    right
  };
}

export function Tree(inputArr) {
  return {
    root: buildTree(inputArr),

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    },

  };
}

function buildTree(inputArr) {
  inputArr.sort();
  const uniques = [];
  let prev;
  for (const num of inputArr) {
    if (num !== prev) {
      uniques.push(num)
      prev = num;
    };
  }
  inputArr = uniques;

  const rootNode = buildBalancedBST(inputArr);

  return rootNode;
}

function buildBalancedBST(sortedArr, start=0, end=sortedArr.length-1) {
  if (start > end){
    return null;
  }

  const midPoint = Math.floor((start + end) / 2);

  const midNode = Node(
    sortedArr[midPoint],
    buildBalancedBST(sortedArr, start, midPoint-1),
    buildBalancedBST(sortedArr, midPoint+1, end)
  );

  return midNode;
}

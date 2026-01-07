function Node(data, left = null, right = null) {
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

    insert(value, curr = this.root) {
      if (curr === null) return Node(value);
      
      if (value < curr.data) {
        curr.left = this.insert(value, curr.left);
      } else if (value > curr.data) {
        curr.right = this.insert(value, curr.right);
      } else {
        throw new Error('Duplicate values are not allowed, sry');
      }

      return curr;
    },

    find(value) {
      let curr = this.root;

      while (curr !== null) {
        if (value < curr.data) {
          curr = curr.left;
        } else if (value > curr.data) {
          curr = curr.right;
        } else {
          return curr;
        }
      }

      return undefined;
    },

    delete(value) {
      const node = this.find(value);

      let parent = null;
      let curr = this.root;
      if (this.root.data !== value) {
        while (curr !== null) {
          if (curr.left?.data === value || curr.right?.data === value) {
            parent = curr;
            break;
          }
          if (value < curr.data) {
            curr = curr.left;
          } else if (value > curr.data) {
            curr = curr.right;
          }
        }
      }

      if (node.left && node.right) {
        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        this.delete(successor.data);
        node.data = successor.data;
      } else if (node.left || node.right) {
        const nodeChild = node.left || node.right;
        if (parent.left?.data === node.data) {
          parent.left = nodeChild;
        } else {
          parent.right = nodeChild;
        }
      } else {
        if (parent.left?.data === node.data) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
    },

    levelOrderForEach(callback, node = this.root) {
      if (typeof callback !== 'function') {
        throw new Error('Dude, I expected a callback function');
      }

      const queue = [node];
      let i = 0;
      while (i !== queue.length) {
        callback(queue[i]);
        if (queue[i].left) queue.push(queue[i].left);
        if (queue[i].right) queue.push(queue[i].right);
        i++;
      }
    },

    inOrderForEach(callback, node = this.root, depth = 0) {
      if (typeof callback !== 'function') {
        throw new Error('Dude, I expected a callback function');
      }

      if (node === null) return;

      this.inOrderForEach(callback, node.left, depth + 1);
      callback(node, depth);
      this.inOrderForEach(callback, node.right, depth + 1);
    },

    preOrderForEach(callback, node = this.root) {
      if (typeof callback !== 'function') {
        throw new Error('Dude, I expected a callback function');
      }

      if (node === null) return;

      callback(node);
      this.preOrderForEach(callback, node.left);
      this.preOrderForEach(callback, node.right);
    },

    postOrderForEach(callback, node = this.root) {
      if (typeof callback !== 'function') {
        throw new Error('Dude, I expected a callback function');
      }

      if (node === null) return;

      this.postOrderForEach(callback, node.left);
      this.postOrderForEach(callback, node.right);
      callback(node);
    },

    height(value, node) {
      if (!value && !node) return null;
      if (!node) node = this.find(value);
      if (!node) return null;
      
      let deepestDepth = 0;
      this.inOrderForEach((node, depth) => {
        deepestDepth = (depth > deepestDepth) ? depth : deepestDepth;
      }, node);

      return deepestDepth;
    },

    depth(value) {
      let returnVal;
      this.inOrderForEach((node, depth) => {
        if (node.data === value) {
          returnVal = depth;
        }
      });
      return returnVal;  // consider using a flag so we are not always in worst-case time
    },

    isBalanced() {
      let returnVal = true;
      this.preOrderForEach((node) => {
        const leftHeight = this.height(null, node.left);
        const rightHeight = this.height(null, node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) {
          returnVal = false;
        }
      });
      return returnVal;
    },

    rebalance() {
      const arrToInput = [];
      this.inOrderForEach((node) => {
        arrToInput.push(node.data);
      });
      this.root = buildTree(arrToInput);
    }
  };
}

function buildTree(inputArr) {
  inputArr.sort((a, b) => a - b);
  const uniques = [];
  let prev;
  for (const num of inputArr) {
    if (num !== prev) {
      uniques.push(num)
      prev = num;
    };
  }
  inputArr = uniques;
  console.log({inputArr});

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

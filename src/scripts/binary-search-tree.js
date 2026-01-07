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
      let FIREBREAK = 0;
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
          FIREBREAK++;
          if (FIREBREAK > 1000) {
            console.log('FIREBREAK');
            return;
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
    }

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

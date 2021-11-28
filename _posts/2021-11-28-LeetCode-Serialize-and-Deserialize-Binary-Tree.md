---
layout: post
title:  " LeetCode : 297. Serialize and Deserialize Binary Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

### Problem

```
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
```


---

### Example

```
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
```

---

### [1] Code (21. 11. 28)

*Need to Retry*

``` java
n/a
```

---

> Concern Point

* 주어진 값으로 TreeNode 구현 방법

```
preOrder로 정렬된 String이 있으면
TreeNode를 쉽게 만들 수 있다.
```

---

> Wrong Reason

* 접근 자체를 못했다.

  약간의 변명을 하자면 이런 유형에 익숙하지 않아서 그렇다.

---

> Reference Code

**Case 1**

``` java
public class Codec {

    // Encodes a tree to a single string.
    public static String serialize(TreeNode root) {
        if (Objects.isNull(root)) {
            return "null";
        }

        Queue<TreeNode> treeNodeQueue = new ArrayDeque<>();
        treeNodeQueue.offer(root);

        StringJoiner result = new StringJoiner(" ");
        result.add(root.val + "");
        while (!treeNodeQueue.isEmpty()) {
            TreeNode cur = treeNodeQueue.poll();

            if (Objects.isNull(cur.left)) {
                result.add("null");
            } else {
                result.add(cur.left.val + "");
                treeNodeQueue.offer(cur.left);
            }

            if (Objects.isNull(cur.right)) {
                result.add("null");
            } else {
                result.add(cur.right.val + "");
                treeNodeQueue.offer(cur.right);
            }
        }

        return result.toString();
    }

    // Decodes your encoded data to tree.
    public static TreeNode deserialize(String data) {
        StringTokenizer tokenizer = new StringTokenizer(data);
        TreeNode root = null;
        String nodeValue = tokenizer.nextToken();
        if (nodeValue.equals("null")) {
            return root;
        } else {
            root = new TreeNode(Integer.parseInt(nodeValue));
        }

        Queue<TreeNode> treeNodeQueue = new ArrayDeque<>();
        treeNodeQueue.offer(root);
        while (tokenizer.hasMoreTokens()) {
            TreeNode cur = treeNodeQueue.poll();

            String leftNodeValue = tokenizer.nextToken();
            if (!leftNodeValue.equals("null")) {
                cur.left = new TreeNode(Integer.parseInt(leftNodeValue));
                treeNodeQueue.offer(cur.left);
            }

            String rightNodeValue = tokenizer.nextToken();
            if (!rightNodeValue.equals("null")) {
                cur.right = new TreeNode(Integer.parseInt(rightNodeValue));
                treeNodeQueue.offer(cur.right);
            }
        }

        return root;
    }
}
```

* ref : [https://bit.ly/3rcLLMB](https://bit.ly/3rcLLMB)

---

**Case 2**

``` java
/*
The idea is simple: print the tree in pre-order traversal 
and use "X" to denote null node and split node with ",". 
We can use a StringBuilder for building the string on the fly. 

For deserializing, 
we use a Queue to store the pre-order traversal 
and since we have "X" as null node, 
we know exactly how to where to end building subtress.
*/

public class Codec {
    private static final String spliter = ",";
    private static final String NN = "X";

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }

    private void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append(NN).append(spliter);
        } else {
            sb.append(node.val).append(spliter);
            buildString(node.left, sb);
            buildString(node.right,sb);
        }
    }
    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        Deque<String> nodes = new LinkedList<>();
        nodes.addAll(Arrays.asList(data.split(spliter)));
        return buildTree(nodes);
    }
    
    private TreeNode buildTree(Deque<String> nodes) {
        String val = nodes.remove();
        if (val.equals(NN)) return null;
        else {
            TreeNode node = new TreeNode(Integer.valueOf(val));
            node.left = buildTree(nodes);
            node.right = buildTree(nodes);
            return node;
        }
    }
}
```

* ref : [https://bit.ly/3xJtVlL](https://bit.ly/3xJtVlL)

---

> Review

* 이런 문제 유형은 아직 어색하다.

  좀 더 많이 풀어서 익숙해져야겠다.

---

## Reference

* [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
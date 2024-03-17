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

### [2] Code (24. 03. 18)

*Retry*

``` java
// Runtime: 18 ms
// Memory Usage: 45.1 MB
// Ref : https://leetcode.com/submissions/detail/1206403925
class Codec {
    private static final String DELIMETER = "_";
    private static final String NULL = "x";

    // Encodes a tree to a single string.
    public static String serialize(TreeNode root) {
        if (root == null) {
            return NULL;
        }

        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);

        StringBuilder sb = new StringBuilder();
        sb.append(root.val).append(DELIMETER);

        while (!q.isEmpty()) {
            TreeNode node = q.poll();

            if (Objects.nonNull(node.left)) {
                q.add(node.left);
                sb.append(node.left.val).append(DELIMETER);
            } else {
                sb.append(NULL).append(DELIMETER);
            }

            if (Objects.nonNull(node.right)) {
                q.add(node.right);
                sb.append(node.right.val).append(DELIMETER);
            } else {
                sb.append(NULL).append(DELIMETER);
            }
        }
        return sb.toString();
    }

    // Decodes your encoded data to tree.
    public static TreeNode deserialize(String data) {
        String[] splits = data.split(DELIMETER);

        List<String> lists = new ArrayList<>();
        for (String s : splits) {
            if (s.equals(DELIMETER)) {
                continue;
            }
            lists.add(s);
        }

        if (lists.isEmpty()) {
            return null;
        }
        if (lists.get(0).equals(NULL)) {
            return null;
        }
        
        int idx = 0;
        TreeNode root = new TreeNode(Integer.parseInt(lists.get(idx++)));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);

        while (idx < lists.size()) {
            TreeNode node = q.poll();

            String val = lists.get(idx++);
            if (!val.equals(NULL)) {
                node.left = new TreeNode(Integer.valueOf(val));
                q.add(node.left);
            }

            val = lists.get(idx++);
            if (!val.equals(NULL)) {
                node.right = new TreeNode(Integer.valueOf(val));
                q.add(node.right);
            }
        }
        return root;
    }
}
```

* DELIMETER = "\|"

  deserialize 할 때 data 값 = "-1\|1\|..."

  일 경우에 data.split(DELIMETER)를 하면 ["-", "1","1"] 이런 식으로 파싱이 되었다.

  그래서 다른 코드를 참고해서 DELIMETER = "_" 이렇게 수정하니까 

  data.split(DELIMETER)에 원하는 대로 ["-1", "1"]로 파싱이 되었다.

  이거 때문에 한참을 고생했다...

---

> Review

* 아이디어를 떠올리지 못해 정답을 보고 다시 풀었는데도 막혀서 굉장히 난감했다.

  정답 코드를 보면서 뭐가 잘못되었는지 디버깅을 했고

  끝내 해결을 했다.

---

## Reference

* [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
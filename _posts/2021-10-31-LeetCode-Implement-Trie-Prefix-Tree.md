---
layout: post
title:  " LeetCode : 208. Implement Trie (Prefix Tree) "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

### Problem

```
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
```


---

### Example

```
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
```

---

### [1] Code (21. 10. 31)

*Need to Retry -> 자료구조 사용하지말고 직접 구현해서 풀어보기*

``` java
class Trie {
    HashMap<String, Boolean> map;
    HashMap<String, Boolean> subMap;

    public Trie() {
        map = new HashMap<>();
        subMap = new HashMap<>();
    }
    
    public void insert(String word) {
        map.put(word, true);
        for (int i=0; i<word.length(); i++) {
            subMap.put(word.substring(0,word.length()-i), true);
        }
    }
    
    public boolean search(String word) {
        return map.getOrDefault(word, false);
    }

    public boolean startsWith(String prefix) {
        return subMap.getOrDefault(prefix, false);
    }
}
```

---

> Concern Point

**Map에서 Key가 없을 때 NPE 발생**

``` java
public boolean search(String word) {
    return map.get(word);
}
```

* map에 없는 word를 찾으면 null을 return한다.

  이때 그 값을 return하게 되면 

  search( )의 반환 타입은 boolean인데 null을 return하면서 NPE가 발생한다.

---

> Reference Code

``` java
class Node {
    Map<Character, Node> map;
    boolean isExist;

    Node() {
        map = new HashMap<>();
    }
}

class Trie {
    Node root;

    public Trie() {
        root = new Node();
    }

    public void insert(String word) {
        Node node = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (!node.map.containsKey(c)) {node.map.put(c, new Node());}
            node = node.map.get(c);
        }
        node.isExist = true;
    }

    public boolean search(String word) {
        Node node = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (!node.map.containsKey(c)) {return false;}
            node = node.map.get(c);
        }
        return node.isExist;
    }

    public boolean startsWith(String prefix) {
        Node node = root;
        for (int i = 0; i < prefix.length(); i++) {
            char c = prefix.charAt(i);
            if (!node.map.containsKey(c)) {return false;}
            node = node.map.get(c);
        }
        return true;
    }
}
```

---

> Review

* 풀긴 했으나 문제의 의도와는 다소 다른 접근방식으로 풀었다.

---

### [2] Code (24. 02. 11)

*Need to Retry -> 자료구조 사용하지말고 직접 구현해서 풀어보기*

``` java
// Runtime: 246 ms
// Memory Usage: 66.3 MB
// Ref : https://leetcode.com/submissions/detail/1171847730
class Trie {
    private Node root;

    public Trie() {
        root = new Node();
    }

    public void insert(String word) {
        int size = word.length();
        char[] cs = word.toCharArray();

        Node node = root;
        StringBuilder sb = new StringBuilder();
        for (char c : cs) {
            sb.append(String.valueOf(c));
            String key = sb.toString();
            if (node.subs.containsKey(key)) {
                node = node.subs.get(key);
            } else {
                Node newNode = new Node();
                node.subs.put(key, newNode);
                node = newNode;
            }
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        int size = word.length();
        char[] cs = word.toCharArray();

        Node node = root;
        StringBuilder sb = new StringBuilder();
        for (char c : cs) {
            sb.append(String.valueOf(c));
            String key = sb.toString();
            if (node.subs.containsKey(key)) {
                node = node.subs.get(key);
            } else {
                return false;
            }
        }
        return node.isEnd;
    }

    public boolean startsWith(String word) {
        int size = word.length();
        char[] cs = word.toCharArray();

        Node node = root;
        StringBuilder sb = new StringBuilder();
        for (char c : cs) {
            sb.append(String.valueOf(c));
            String key = sb.toString();
            if (node.subs.containsKey(key)) {
                node = node.subs.get(key);
            } else {
                return false;
            }
        }
        return true;
    }

    private class Node {
        Map<String, Node> subs;
        boolean isEnd;

        public Node() {
            this.subs = new HashMap<>();
            this.isEnd = false;
        }
    }
}
```

* map 자료구조를 사용하지 않고

  문제 조건에서 *word and prefix consist only of lowercase English letters.* 라고 되어있으므로

  다음과 같이 배열을 선언해도 됐다.

``` java
if (node.children[c-'a'] == null){
    node.children[c-'a'] = new TrieNode();
}
```

---

> Review

* 풀 수 있을까? 라는 생각으로 접근했는데 풀었다. (뿌듯)

---

## Reference

* [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
---
layout: post
title:  " [Java] 알고리즘(Algorithm)을 위한 코드 정리해두기 "
categories: AlgorithmSkill
author: goodGid
---
* content
{:toc}

## Prologue

* Java로 알고리즘을 풀다 보면 반복적으로 막히는 부분이 있다.

  이런 부분들을 정리해놓기 위한 포스팅이다.


---

## Idea

### Sliding Window

* [LeetCode : 121. Best Time to Buy and Sell Stock]({{site.url}}/LeetCode-Best-Time-to-Buy-and-Sell-Stock)



---

## Algorithm

### PriorityQueue

#### 내림차순 + PriorityQueue 사용 방법

``` java
PriorityQueue<Integer> queue = new PriorityQueue<>(Collections.reverseOrder());

// public class PriorityQueue<E> extends AbstractQueue<E> implements java.io.Serializable
public PriorityQueue(Comparator<? super E> comparator) {
    this(DEFAULT_INITIAL_CAPACITY, comparator);
}
```

* ex) [LeetCode : 215. Kth Largest Element in an Array]({{site.url}}/LeetCode-Kth-Largest-Element-in-an-Array/#2-code-21-11-10-x)

> Point

* comparator 값으로 *Collections.reverseOrder( )*를 넘겨주면 내림차순 우선순위 큐 생성이 가능하다.

---

#### 특정 키 값으로 정렬하기

``` java
public class Main {
    public static void main(String[] args) {
        // 내림차순
        PriorityQueue<Node> pq1 = new PriorityQueue<>((o1, o2) -> o2.getValue() - o1.getValue());
        pq1.add(new Node(1, 1)); pq1.add(new Node(2, 3)); pq1.add(new Node(3, 2));
        while (!pq1.isEmpty()) {
            System.out.println(pq1.peek().getIndex() + " " + pq1.poll().getValue());
        }
        /*
        2 3
        3 2
        1 1
        */

        PriorityQueue<Node> pq2 = new PriorityQueue<>();
        pq2.add(new Node(1, 1)); pq2.add(new Node(2, 3)); pq2.add(new Node(3, 2));
        while (!pq2.isEmpty()) {
            System.out.println(pq2.peek().getIndex() + " " + pq2.poll().getValue());
        }
        /*
        2 3
        3 2
        1 1
        */
        return;
    }
}

class Node implements Comparable<Node> {
    private int index;
    private int value;

    public Node(int index, int value) {
        this.index = index;
        this.value = value;
    }

    public int getIndex() {
        return index;
    }

    public int getValue() {
        return value;
    }

    @Override
    public int compareTo(Node newNode) {
        return newNode.value - value; // 내림차순
        return value - newNode.value; // 오름차순
    }
}
```

* ex) [LeetCode : 1299. Replace Elements with Greatest Element on Right Side]({{site.url}}/LeetCode-Replace-Elements-with-Greatest-Element-on-Right-Side/#2-code-22-03-06-x)




---

### String

#### i번째 값 읽어오기

``` java
String s = "abc";
System.out.println(s.charAt(0)); // a
```

---

#### 범위로 잘라내기

``` java
public String substring(int beginIndex, int endIndex) { ... }
```

* beginIndex부터 포함

  endIndex은 미포함

* ex) [LeetCode : 394. Decode String]({{site.url}}/LeetCode-Decode-String)
  
---

#### 알파벳 순서로 정렬

``` java
char tempArray[] = s.toCharArray();
Arrays.sort(tempArray);
1) String key = String.valueOf(tempArray);
2) String key = new String(tempArray);
```

* ex) [LeetCode : 49. Group Anagrams]({{site.url}}/LeetCode-Group-Anagrams/#49-group-anagrams)

---

### Character

#### 숫자를 나타내는 Character -> int 변환

``` java
char c = '9';
System.out.println(c - 48); // 9 출력
```

* ex) [LeetCode : 394. Decode String]({{site.url}}/LeetCode-Decode-String)

---

#### 주어진 Character가 알파벳인지 숫자인지 체크

``` java
if (Character.isAlphabetic(s.charAt(head))) { ... }
if (Character.isDigit(s.charAt(head))) { ... }
```

* ex) [LeetCode : 394. Decode String]({{site.url}}/LeetCode-Decode-String)

---

### List 사용

#### List 선언과 동시에 값 할당

``` java
// 1. JDK 5 이상에서 사용 가능
List<String> list = Arrays.asList("Amsterdam", "Paris", "London");

// 2.
List<String> list = Arrays.asList(new String[] { "a", "b", "c" });

// 3.
List<String> list = new ArrayList<>() {% raw  %}{{ ... }}{% endraw  %} // Compile Error 발생
List<String> list = new ArrayList<String>() {
    { 
        add("A");
        add("B");
        add("C");
    }
};
```

---

### Map

#### Map 반복문

``` java
Map<String, String> map = new HashMap<>();

map.put("K3", "V3");
map.put("K1", "V1");
map.put("K2", "V2");

// Case 1
Iterator<String> keys = map.keySet().iterator();
while (keys.hasNext()) {
    String key = keys.next();
    System.out.println(key + " " + map.get(key));
}

// Case 2
for (Map.Entry<String, String> elem : map.entrySet()) {
    System.out.println(elem.getKey() + " " + elem.getValue());
}

// Case 3
for (String key : map.keySet()) {
    System.out.println(key + " " + map.get(key));
}

// Output - 3가지 방법 다 동일
K2 V2
K1 V1
K3 V3
```

* 출력 시 순서는 보장되지 않는다.

---

#### 입력 순서가 보장되는 Map

``` java
Map<String, String> map = new LinkedHashMap<>(3, 0.75f, true);

map.put("K3", "V3");
map.put("K1", "V1");
map.put("K2", "V2");

// Case 1
// ConcurrentModificationException 발생  
// 원인 : map.get( ) 코드 
// map.get( )를 사용하지 않으면 Exception이 발생하지 않는다.
Iterator<String> keys = map.keySet().iterator();
while (keys.hasNext()) {
    String key = keys.next();
    System.out.println(key + " " + map.get(key));
}

// Case 2
for (Map.Entry<String, String> elem : map.entrySet()) {
    System.out.println(elem.getKey() + " " + elem.getValue());
}

// Case 3
// ConcurrentModificationException 발생  
// 원인 : map.get( ) 코드 
// map.get( )를 사용하지 않으면 Exception이 발생하지 않는다.
for (String key : map.keySet()) {
    System.out.println(key + " " + map.get(key));
}

// Output
K3 V3
K1 V1
K2 V2
```

* Case 1과 Case 3 방식으로 출력하면 "K3" 값은 출력되고 

  그 다음에 ConcurrentModificationException이 발생한다.

  명확한 이유를 분석하진 않았고 그냥 느낌만 파악하고 넘어갔다.

``` java
// java.util.LinkedHashMap#get
public V get(Object key) {
    Node<K,V> e;
    if ((e = getNode(hash(key), key)) == null)
        return null;
    if (accessOrder)
        afterNodeAccess(e); // <-- [Here] : map.get( ) 호출 시 afterNodeAccess( ) 호출
    return e.value;
}

// java.util.LinkedHashMap#afterNodeAccess
void afterNodeAccess(Node<K,V> e) { // move node to last
    LinkedHashMap.Entry<K,V> last;
    if (accessOrder && (last = tail) != e) {
        ...
        ++modCount; // <-- [Here] : modCount 값을 증가시킨다.
    }
}

// java.util.LinkedHashMap.LinkedValueIterator#next
final class LinkedKeyIterator extends LinkedHashIterator
    implements Iterator<K> {
    public final K next() { return nextNode().getKey(); }  // <-- [Here] : nextNode( ) 호출
}

// java.util.LinkedHashMap.LinkedHashIterator#nextNode
final LinkedHashMap.Entry<K,V> nextNode() {
    LinkedHashMap.Entry<K,V> e = next;
    if (modCount != expectedModCount) // <-- [Here] : 증가된 modCount로 인해 Exception 발생
        throw new ConcurrentModificationException();
    if (e == null)
        throw new NoSuchElementException();
    current = e;
    next = e.after;
    return e;
}
```

---

#### Map에 있는 값들을 List에 담기

``` java
// AS-IS
List<List<String>> answer = new ArrayList<>();
for (Map.Entry<String, List<String>> item : map.entrySet()) {
    answer.add(new ArrayList<>(item.getValue()));
}
return answer;

// TO-BE
1. return new ArrayList(map.values());
2. return answer.addAll(map.values());
```

* ex) [LeetCode : 49. Group Anagrams]({{site.url}}/LeetCode-Group-Anagrams/#49-group-anagrams)


---

### Set

#### Set 반복문

``` java
int[] nums = { 12, 5, 28, 42, -1 };

Set<Integer> set = new HashSet<>();

for (int num : nums) {
    set.add(num);
}

Iterator<Integer> it = set.iterator();
while (it.hasNext()) {
    Integer originValue = it.next();
    System.out.print(originValue + " "); // -1 5 42 12 28 
}
```

* 출력 시 순서는 보장되지 않는다.
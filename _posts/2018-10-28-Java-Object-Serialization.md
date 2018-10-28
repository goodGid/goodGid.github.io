---
layout: post
title:  " 객체 직렬화(Serialization) "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

## Java와 객체

* 자바는 객체지향 언어이다.

* 즉 **가상머신 내**에 존재하는 것은 **객체들**로 이루어져 있다. 

* 물론 객체를 만들기 위한 클래스들도 있다. 

* 그렇기 때문에 객체가 필요하다면 클래스의 형태를 보고 언제든지 만들어 낼 수 있다.

* 컴파일 후 생성된 .class 파일은 클래스의 모든 정보를 담게 된다.

* 이 .class의 바이트는 가상머신에 Class 클래스의 형태로 로딩 되어진다. 

* 그리고 로딩된 클래스의 정보를 보고 객체를 만들게 된다. 











---

## 직렬화

* 직렬화란 **정보를 대상 시스템에 복원 가능**하게 전달하기 위해서 <br> 다른 형태(텍스트, 바이트, JSON, XML 등)로 변경하는 행위이다.

* 자바의 경우 Serializable 인터페이스를 통해서 직렬화를 구현한다.


---


## 객체 직렬화의 개념

* **자바 I/O 처리**는 정수, 문자열, 바이트 단위의 처리만 지원한다. 

* 따라서 복잡한 객체의 내용을 **저장/복원**하거나 <br> **네트워크로 전송**하기 위해서는 객체의 멤버변수의 각 내용을 **일정한 형식(= 패킷)**으로 만들어 전송해야 한다.

* 객체 직렬화는 **객체의 내용(구체적으로는 멤버변수의 내용)을 자바 I/O가 자동적으로 바이트 단위로 변환**하여 <br> 저장/복원하거나 네트워크로 전송할 수 있도록 기능을 제공해준다. <br> Why? 자바 I/O는 **바이트 단위 처리**만 지원하기 때문이다.

* 즉 개발자 입장에서는 객체가 아무리 복잡하더라도 <br> 객체 직렬화를 이용하면 객체의 내용을 자바 I/O가 자동으로 바이트 단위로 변환하여 저장이나 전송을 해주게 된다. 

* 또한 이것은 자바에서 자동으로 처리해주는 것이기 때문에 운영체제가 달라도 전혀 문제되지 않는다.

* 객체를 직렬화 할 때 <br> 객체의 멤버 변수가 다른 객체(Serializable 인터페이스를 구현한)의 레퍼런스 변수인 경우에는 <br> 레퍼런스 변수가 가리키는 해당 객체까지도 같이 객체 직렬화를 시킨다. 

* 또 그 객체가 다른 객체를 다시 가리키고 있다면 <br> 같은 식으로 객체 직렬화가 계속해서 일어나게 된다.

* 이것은 마치 객체 직렬화를 처음 시작한 객체를 중심으로 <br> **트리 구조**의 객체 직렬화가 **연속적**으로 일어나는 것이다.


---

## RMI

* RMI : Remote Method Invocation(원격 메소드 호출)

* RMI는 원격 객체 통신을 지원해야 하기 때문에 객체의 내용이 투명하게 이동할 수 있어야 한다.

* RMI는 한쪽의 JVM에 존재하는 객체가 <br> 네트워크를 통해 다른 곳의 JVM에 존재하는 객체의 메소드를 호출 할 수 있게 해주는 기술이다.

* 자바는 분산환경(서로 다른 컴퓨터에서 주어진 목적을 위해서 협력하는 환경)에서 <br> **분산된 컴퓨터간 객체 정보를 주고 받을 수** 있게 하기 위해서 RMI을 지원한다. 

* 일반적으로 RPC(Remote Procedure Call, 원격 프로시저 호출)라고 불리기도 한다.

* RMI를 사용하기 위해서는 객체를 네트워크로 전송가능한 형태로 바꿀 필요가 있는데 <br> 이 때 사용되는 개념이 **직렬화/역직렬화**이다.

* 이 때 객체 직렬화를 사용하면 편하게 객체의 상태 정보를 저장하는 것이 가능하다.

---

## 객체 직렬화 과정


### 직렬화

* 객체는 ObjectOutputStream의 writeObject() 메소드에 자신을 넘김으로써 **직렬화**된다. 

* writeObject()메소드는 **객체의 모든 것(private 필드와 super 클래스로부터 상속받은 필드 등)**을 기록하게 된다.


---



### 직렬화 해제

* 직렬화 해제는 직렬화와 반대의 과정을 거치게 된다.

* ObjectInputStream의 readObject() 메서드를 호출하여 <br> 스트림으로부터 읽어 들인 값을 직렬화 되기전의 객체로 다시 만들게 된다.



---


## Example

* ObjectOutputStream을 생성해서 writeObject() 메서드를 이용해서 객체를 직렬화하고 

* ObjectInputStream을 생성해서 readObject() 메서드를 통해서 객체를 복원한다. 

* 여기서 눈여겨 볼 점은 SerializableClass가 Serializable을 implements했다는 점이다.

``` java
import java.io.*;

public class ObjectSerializeTest {
    public static void main(String[] args) throws Exception { 

        // 파일을 열어서 그곳에 객체를 직렬화시켜서 저장한다. 
        // 파일 출력스트림을 연다. 
        FileOutputStream fileout = new FileOutputStream("test.txt");

        // 객체스트림을 열고, 객체스트림을 통해 객체를 파일에 저장 
         ObjectOutputStream out = new ObjectOutputStream(fileout); 
        out.writeObject(new SerializableClass("Serialize Test Program", 1014));

        // 객체스트림을 닫는다. 
        out.close();

        // 직렬화 된 객체를 저장된 파일로 부터 객체를 해제시켜 원래의 객체로 복원
         // 파일 입력스트림으로부터 객체 입력스트림을 연다. 
        FileInputStream fileinput = new FileInputStream("test.txt"); 
        ObjectInputStream in = new ObjectInputStream(fileinput);

        // 객체 입력스트림으로부터 객체를 읽어온다. 
        SerializableClass sc = (SerializableClass)in.readObject();

        // 객체스트림을 닫는다.
        in.close(); 

        // 스트림으로부터 읽어들인 객체의 내용을 출력 
         // 원래 생성되었던 객체와 같은 값을 갖는다는 것을 알수가 있다. 
        System.out.println("String : " + sc.Sstr); 
        System.out.println("Integer : " + sc.Sint); 
    } 
}

// 하나의 문자열과 정수를 저장하고 있는 SerializableClass를 
// Serializable을 implements 함으로써 
// 스트림을 통해 직렬화되고 해제되어질 수 있다.
class SerializableClass implements Serializable {
    public String Sstr; 
    public int Sint;

    // 생성자
    public SerializableClass(String s, int i) { 
    this.Sstr = s; 
        this.Sint = i; 
    } 
}
```


---

* ‘이름’, ‘부서’, ‘직책’ 이라는 속성을 가진 직원 클래스가 있고 <br> 이 클래스를 이용하여 두 개의 객체 (직원1 객체와 직원2 객체)가 생성되어 메모리에 저장되어 있다면 <br> 직원1 객체는 이름이 *홍길동* 이고 부서는 *총무부* , 직책은 *과장* 이라는 상태 정보를 저장하고 있다고 가정하자.

* 이러한 객체들이 저장되어 있는 메모리는 휘발성이기 때문에 <br> 컴퓨터의 전원을 종료하게 되면 객체의 상태 정보는 모두 사라지게 된다. 

* 그래서 우리는 이 정보를 DB 혹은 따로 저장해야한다.

* 이 때 데이터 값들을 DB에 저장했을 경우 <br> 다시 객체로 만들기 위해선 DB에서 해당 내용을 찾아 객체의 형태로 재조합해야한다. 

* 이러한 방법 대신 객체 그 자체를 바로 저장하고 불러올 수 있다면 굉장히 효율적일 것이다.

* 다음과 같은 객체를 네트워크를 통해 보낸다면 파싱할 필요도 없고 <br> 특별한 작업 없이도 객체를 사용할 수 있게 된다.

``` java
public class Employee {
   private String name;              // 이름
   private String dept;              // 부서
   private String duties;            // 직책

   // 생성자
   public Employee (String name, String dept, String duties) {
       this.name = name;
       this.dept = dept;
       this.duties = duties;
    }

   // Emp 자체를 네트워크로 전송
    public static void main(String[] args){
        Employee Emp = new Employee("조한서", "인사","차장");
    }
}
```

* 이런 객체 직렬화개념은 RMI, Java Beans등의 핵심 기술이 된다.

* 객체 직렬화는 상당히 복잡한 과정을 필요로 하지만 <br> 내부적으로 완벽하게 감추어져 있기 때문에 <br> 객체 직렬화를 직접 구현을 하는 것이 아니라 **규칙에 맞게 사용하는 방법**을 익히면 된다.


---

## interface Serializable

* 객체 직렬화가 필요한 객체는 반드시 **Serializable** 인터페이스를 구현해야 한다. 

* 그러나 Serializable 인터페이스는 <br> 객체가 직렬화가 제공되어야 함을 **자바가상머신(JVM)에 알려주는 역할만**을 하는 인터페이스다. 

* 따라서 Serializable 인터페이스를 지정하였다고 해도 **필수적으로 구현할 메서드**는 없다.

* 보낼 객체가 직렬화 되어 있으면 <br> 전송은 특정 장치에 연결되어 있는 스트림이 자체적으로 제공한다. <br> 아래 예시에서의 스트림은 FileOutputStream이라고 생각하면 된다.

* 우선 파일이나 네트워크에 **스트림을 생성** 후 

* **객체**를 보낼 수 있는 **스트림으로 변환**을 한다. (= **직렬화** 시킨다.)

* 그리고 직렬화되어 있는 객체를 전송한다.

* 순서를 다시 정리해보면 다음과 같다.

```
1. 네트워크나 파일등에 스트림을 생성한다.

2. 생성된 스트림을 Object스트림으로 변환한다.

3. 입력 스트림은 ObjectInputStream이고 
   출력 스트림은ObjectOutputStream이다.

4. 직렬화된 객체를 객체 스트림을 통해서 전송한다. 
    writeObject(직렬화된 객체)

5. 객체 스트림을 통해서 직렬화된 객체를 받는다.
    readObject(직렬화된 객체들이 담겨있는 스트림)
```

* 위와 같은 순서로 객체 직렬화를 구현한다.

* 추가적으로 보낼 객체에 **impelements Serializable만 선언**해주면 된다.

``` java
import java.io.*;

public class SerialObject implements Serializable{
     private String name; // 이름
     private String dept; // 부서
     private String duties; // 직책

     public SerialObject (String name, String dept, String duties) {
          this.name = name;
          this.dept = dept;
          this.duties = duties;
     }

     public String toString() {
          return name + ":" + dept + ":" + duties;
     }
}
```

``` java
import java.io.*;

public class SerialObjectTest {
     public static void main(String[] args) throws Exception {
        FileOutputStream fileout = new FileOutputStream("test.txt"); 
        ObjectOutputStream out = new ObjectOutputStream(fileout);
        SerialObject se1 = new SerialObject("김언어", "개발부", "팀장");
        SerialObject se2 = new SerialObject("김서리", "자금부", "부장");
        SerialObject se3 = new SerialObject("이회계", "경리부", "차장");
        out.writeObject(se1);
        out.writeObject(se2);
        out.writeObject(se3);
        out.close();

        FileInputStream filein = new FileInputStream("test.txt");
        ObjectInputStream in = new ObjectInputStream(filein);
        SerialObject iso1 = (SerialObject)in.readObject();
        SerialObject iso2 = (SerialObject)in.readObject();
        SerialObject iso3 = (SerialObject)in.readObject();
        System.out.println(iso1.toString());
        System.out.println(iso2.toString());
        System.out.println(iso3.toString9));
        in.close();
     }
}
```

* test.txt파일에 파일 출력 스트림(=FileOutputStream)을 생성한다. 

* 그리고 이 파일 출력 스트림을 ObjectOutputStream 스트림으로 변환한다.

* 스트림을 열었다면 implements Serializable로 구현된 객체를 전송한다.

* 위 예제에서는 3개의 객체를 전송 후 출력 스트림을 닫는다.

* 이제 test.txt가 만들어지고 그 안에는 객체 3개가 순서대로 기록되게 된다.

* 입력된 객체를 읽어 내기 위해서 test.txt 파일에 파일 입력 스트림(=FileInputStream)을 생성한다. 

* 그리고 생성된 FileInputStream ObjectInputStream으로 변환한다. 

* 변환된 ObjectInputStream 객체를 읽어내는데 <br> 반환형이 Object형이기 때문에 강제 Downcasting 시킨다.

* 마지막으로 ObjectInputStream을 닫는다.


> public final void writeObject(Object obj) throws IOException

* writeObject()메서드의 식은 다음과 같다.

``` 
if( obj가 Serializable 인터페이스 구현 || Externalizable 인터페이스 구현){
    자동으로 객체의 상태를 스트림에 기록
}
else{
    return NotSerializableException
}
```

<br> 

> public final Object readObject() throws IOException, ClassNotFoundException

* readObject()메서드의 동작 방식은 다음과 같다.

```
// 연결된 스트림으로부터 객체의 상태 정보를 읽는다.
if( 객체가 Serializable 인터페이스 구현 || Externalizable 인터페이스 구현){
    스트림에 쓰여져 있던 객체의 상태 정보를 기반으로 자동으로 새로운 객체를 복원
}
else{
    return Exception 
}
```

---

## Externalizable

* 객체 직렬화의 또 다른 방법으로는 **Externalizable 인터페이스**를 사용하는 것이다.

* 그 기본 개념은 Serializable과 같다. 

* Externalizable 자체가 Serializable 인터페이스를 상속한 인터페이스이기 때문이다. <br> *인터페이스는 인터페이스 끼리는 상속의 개념이 적용된다.*



* Externalizable의 원형은 다음과 같다.

``` java
public interface Externalizable extends Serializable {
     public void writeExternal(ObjectOutput out) throws IOException;
     public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;
}
```

* Externalizable 인터페이스는 **2개의 메서드를 구현**해야만 사용 가능하다.

* **Serializable**에서는 **자동**으로 데이터가 기록되지만 <br> **Externalizable**에서는 **기록**하는 부분을 **직접 제어**한다.

* 이 때 기록하는 부분은 writeExternal() 메서드에 구현을 한다.

* 읽어내는 부분은 readExternal() 메서드를 통해 기록한 데이터를 복원한다.

* writeExternal() 메서드에서 사용자가 임의로 기록하는 방법을 구현했다면 <br> 읽어내는 순서와 방식을 아는 사람은 writeExternal()을 구현한 개발자 자신이다.

* 그렇기 때문에 암호화의 개념이랑 비슷하다.


``` java
import java.io.*;

public class ExternalObject implements Externalizable {
     private int dept;  // 부서
     private String name;  // 이름
     private float duties;  // 직책

     public ExternalObject() {}

     public ExternalObject(int dept, String name, float duties) {
          this.dept = dept;
          this.name = name;
          this.duties = duties;
     }

     public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
          System.out.println("readExternal() 메서드입니다.");
          dept = in.readInt();
          name = (String)in.readObject();
          duties = in.readFloat();
     }

     public void writeExternal(ObjectOutput out) throws IOException {
          System.out.println("writeExternal() 메서드입니다.");
          out.writeInt(dept);
          out.writeObject(name);
          out.writeFloat(duties);
     }

     public String toString(){
          return dept + ":" + name + ":" + duties;
     }
}
```

* writeExternal함수의 매개변수로 넘어오는 ObjectOutput의 out을 이용하여 <br> 기록하고 싶은 부분을 차례대로 write해준다.

* 여기서는 간단히 int, String, float만을 기록하였지만 <br> ObjectOutput 인터페이스가 제공해주는 메서드들을 전부 사용할 수 있다. <br> writeBoolean, writeByte, writeBytes, writeChar, writeChars, writeDouble, writeFloat, writeInt, writeLong, writeShort, writeUTF

* 그리고 다시 기록한 데이터를 읽어 오는 부분은 기록한 **순서대로** 읽으면 된다.

* 정확하게 순서를 맞추어 호출해야한다.

* 만약 순서가 틀리다면 에러가 발생한다.

* 마지막으로 직렬화된 데이터를 읽어들여서 객체를 만들기 위해 **인자가 없는 생성자**를 호출한다. 

* 이 때 인자가 없는 생성자가 없다면 에러가 발생하기 때문에 <br> public ExternalObject() {} 와 같은 **인자가 없는 생성자**를 선언해줘야한다.

``` java
import java.io.*; 

public class ExternalObjectTest {
     public static void main(String[] args) throws IOException, ClassNotFoundException{
        FileOutputStream fileout= new FileOutputStream("exTest.txt"); 
        ObjectOutputStream out= new ObjectOutputStream(fileout);
        ExternalObject eo1 = new ExternalObject(1, "김사양", 170.25f);
        ExternalObject eo2 = new ExternalObject(2, "이거지", 190.01f);
        ExternalObject eo3 = new ExternalObject(3, "삼다수", 180.34f);
        out.writeObject(eo1 );
        out.writeObject(eo2 );
        out.writeObject(eo3 );
        out.close();

        FileInputStream filein = new FileInputStream("exTest.txt");
        ObjectInputStream in = new ObjectInputStream(filein);
        ExternalObject eso1 = (ExternalObject)in.readObject();
        ExternalObject eso2 = (ExternalObject)in.readObject();
        ExternalObject eso3 = (ExternalObject)in.readObject();
        System.out.println(eso1.toString());
        System.out.println(eso2.toString());
        System.out.println(eso3.toString());
        ois.close();
    }
}
```

---


## transient & static

* 객체 직렬화 후에 **보존하고 싶지 않은 멤버 변수**가 있을 수 있다.

* 그 멤버 변수에 **transient 키워드**를 사용하면 **객체 직렬화 시 저장**하지 않는다.

* 예를 들어 PW 혹은 중요 정보는 복원되면 안된다.

* 따라서 이러한 정보를 갖는 멤버 변수는 transient 키워드를 사용해야 한다.

* 또한 **static**으로 선언된 변수도 직렬화 시 **제외**된다.

* 그 이유는 **공유 메모리 개념**을 가지고 있기 때문이다.

* transient와 static 선언은 직렬화 시 제외하겠다는 의미 이외 별다른 개념이없다.

``` java
import java.io.*;

public class TransientTest implements Serializable {

     // 멤버변수
     private String name;
     transient String passwd;

     // 생성자
     public TransientTest(String s, String p) {
          name = s;
          passwd = p;
          System.out.println("생성자가 호출되었습니다: " + name);
     }

     // toString() 메서드를 오버라이드하여
     // println() 메서드에서 사용할때, 내용을 출력하도록 변경
     public String toString() {
          return "이름은 " + name+ " : 패스워드 : " + passwd;
     }

     public static void main(String args[]) {
          TransientTest tt1, tt2;
          tt1 = new TransientTest("김가방","1234");
          tt2 = new TransientTest("이치민","0011");

          try {
               // 객체 직렬화로 파일에 저장하기 위해
               // FileOutputStream에서 ObjectOutputStream 생성
               ObjectOutputStream out 
                    = new ObjectOutputStream(new FileOutputStream("TransientTest.ser"));

               // writeObject() 메서드를 사용하여 객체 저장
               out.writeObject(tt1);
               out.writeObject(tt2);
               out.close();

               // 객체 직렬화로 파일에 저장된 객체를 복원하기 위해
               // FileInputStream에서 ObjectInputStream 생성
               ObjectInputStream in 
                    = new ObjectInputStream(new FileInputStream("TransientTest.ser"));

               TransientTest tt3, tt4;

               // 해당 스트림에서 readObject() 메서드를 호출
               tt3 = (TransientTest)in.readObject();
               tt4 = (TransientTest)in.readObject();

               System.out.println("다시 복원합니다");

               // 내용을 출력한다
               System.out.println(tt3);
               System.out.println(tt4);

          } catch(Exception e) {
               e.printStackTrace();
          }
     }
}

/*
실행 결과
생성자가 호출되었습니다: 김가방
생성자가 호출되었습니다: 이치민
다시 복원합니다
이름은 김가방 : 패스워드 : null
이름은 이치민 : 패스워드 : null
*/
```

* name 멤버 변수는 그대로 복원이 되었다.

* 하지만 transient로 되어있는 passwd 멤버 변수는 null값이 들어있다.


---

## 참고

* [직렬화에 대한 개념 질문입니다](https://hashcode.co.kr/questions/3297/%EC%A7%81%EB%A0%AC%ED%99%94%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B0%9C%EB%85%90-%EC%A7%88%EB%AC%B8%EC%9E%85%EB%8B%88%EB%8B%A4)

* [객체 직렬화의 개념](http://blog.naver.com/PostView.nhn?blogId=nem0&logNo=100160690432)

* [Serializable(직렬화)란??](http://lueseypid.tistory.com/42)
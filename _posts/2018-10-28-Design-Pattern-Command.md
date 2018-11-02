---
layout: post
title:  " 디자인 패턴 : 커맨드 패턴 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 커맨드 패턴(Command Pattern)

* 요구사항을 **객체로 캡슐화** 할 수 있으며 매개변수를 써서 여러 가지 다른 요구 사항을 집어넣을수 있다.

* **사용자의 요청**을 객체화하고 그 객체만 있으면 해당 커맨드가 어떤 작업을 수행했는지 알 수 있다. 

* 그렇기 때문에 **요청 내역**을 큐에 **저장**하거나 **로그로 기록**할 수 있으며 **작업 취소 기능**도 지원 가능하다.

* 커맨드 객체는 **일련의 행동**을 **특정 리시버**하고 연결시킴으로써 요구사항을 캡슐화한다.

* 이렇게 하기 위해 **행동과 리시버를 한 객체**에 집어넣고 **메소드 하나만 외부에 공개**하는 방법을 사용한다.

* 커맨드 패턴은 **행위 패턴** 카테고리에 속하며 행동을 캡슐화하여 미리 요청을 가지고 있다가 요청할 때 사용할 수 있도록 한다. 

* 따라서 요청과 수행의 관계가 느슨하여 SOLID의 **DIP(The Dependency Inversion Priciple)**를 따른다.


![](/assets/img/posts/design_pattern_command_pettern_2.png)











---

## 다양한 예시



1. 손님이 웨이터에게 주문을 한다.

2. 웨이터가 고객의 주문을 주문서에 적는다.

3. 웨이터는 주문서를 주방에 전달하여 주문을 요청한다.

4. 요리사는 주문서에 적힌 주문대로 음식을 자신의 노하우로 만든다.


<br>

* **손님 == 클라이언트**

* **웨이터 == 인보커 객체**

* **주문을 하는것 == setCommand()**

* **주문서 == 커맨드 객체**

* **주문을 주방장에게 전달하여 요리하는 것 == execute()**

* **주방장 == 리시버 객체**

<br>

1. 클라이언트는 커맨드 객체를 생성한다.

2. 클라이언트에서 인보커 객체 안에 있는 **setCommand() 메소드**를 호출해서 **커맨드 객체**를 넘겨준다. 

3. 이 인보커 객체 안에 커맨드 객체가 쓰이기 전까지 보관된다. 

4. 인보커 객체안에 있는 커맨드 객체의 execute() 메소드를 호출하면 리시버에 있는 특정 행동을 하는 메소드가 호출된다. 

5. 커맨드 패턴에서는 나중에 클라이언트에서 인보커에게 그 명령을 실행시켜 달라는 요청을 한다.

*처음 본다면 당연히 이해가 안될테니 천천히 아래 예시를 통해 개념을 익히고 다시 보자.*

*그러면 이해가 될 것이다.*

<br>

* 커맨드 객체가 제공하는 메소드는 execute() 메소드 하나 뿐이다. 

* 이 안에는 행동과 리시버에 대한 정보가 같이 들어있다. 

``` java
public void execute{        
    receiver.action1();
    receiver.action2();
}
```


![](/assets/img/posts/design_pattern_command_pettern_1.png)



---




### 리모컨 만들기

1) 커맨드 인터페이스 정의하기

``` java
public interface Command { 
    public void execute();
}
```

* 커맨드 객체에는 **execute() 메소드 하나**밖에 지원 하지 않는다. 

* 하지만 나중에 여기에 작업 취소 기능을 위해 undo() 메소드를 추가할 수 있다.

<br>

2) **리시버 객체**(여기서는 전등) 만들기

```java
public class Light {
    public void on() { 
        System.out.println("전등 켜짐"); 
    }

    public void off() { 
        System.out.println("전등 꺼짐"); 
    } 
}
```

<br>


3) 인터페이스를 상속받는 **커맨드 객체** 만들기

```java
public class LightOnCommand implements Command {
    Light light; 
        
    public LightOnCommand(Light light) {
        this.light = light;
    }
 
    public void execute() {
        light.on();
    }
}
```

<br>

4) **인보커 객체** 만들기

``` java
public class SimpleRemoteControl {   
    Command slot;
 
    public SimpleRemoteControl() {}
    
    public void setCommand(Command command) {
        slot = command;
    }
    
    public void buttonPressed() { 
        slot.execute(); 
    }
}
```

* 커맨드 객체를 저장하는 인보커 객체를 만든다. 

* 클라이언트 객체에서 buttonPressed() 메소드를 호출하면 <br> 저장된 커맨드 객체(= slot)에서 execute() 메소드를 호출하게 된다.

<br>

5) **클라이언트 객체** 만들기 

``` java
public class RemoteControlTest {
    public static void main(String[] args) {
        SimpleRemoteControl remote = new SimpleRemoteControl();
        Light light = new Light();
        LightOnCommand lightOn = new LightOnCommand(light);
        
        remote.setCommand(lightOn);
        remote.buttonPressed();
    }
}
```

* 사용자는 **커맨드 객체**(= LightOnCommand lightOn)를 만들어 <br> 인보커 객체인 SimpleRemoteControl 객체로  <br> setCommand() 메소드를 통해 **커맨드 객체**를 전달한다.

* 그리고 클라이언트 객체가 buttonPressed() 메소드를 호출하면 <br> execute() 메소드가 호출되면서 <br> 전등의 on()메소드가 연달아 호출된다.

* 그렇게 되면 콘솔에 "전등 켜짐" 이라고 나타나게 된다. 


---





### 복합 리모컨 만들기

1) Command 인터페이스 정의 하기

``` java
public interface Command {
    public void execute();   
}
```


<br>

2) **리시버 객체** 만들기 (전등 및 음악 플레이어)

``` java
public class Light {
    private String location;
    
    public Light(String location) {
        this.location = location;
    }
    
    public void on() { 
        System.out.println(location + " 전등 켜짐"); 
    }

    public void off() { 
        System.out.println(location +" 전등 꺼짐"); 
    }
}
```

``` java
public class MusicPlayer { 
    public void on() { 
        System.out.println("뮤직 플레이어 켜짐 및 최근 들은 곡 재생");   
    }
        
    public void off() { 
        System.out.println("뮤직 플레이어 꺼짐"); 
    }
}
```

<br>


3) **커맨드 객체** 만들기

``` java
// 전등 On 커맨드
public class LightOnCommand implements Command {
    Light light; 
        
    public LightOnCommand(Light light) {
        this.light = light;
    }
 
    public void execute() {
        light.on();
    }
}
```


``` java
// 전등 Off 커맨드
public class LightOffCommand implements Command {
    Light light; 
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
 
    public void execute() {   
        light.off();
    }
}
```


``` java
// 음악 플레이어 On 커맨드
public class MusicPlayerOnCommand implements Command {    
    private MusicPlayer musicPlayer;

    public MusicPlayerOnCommand(MusicPlayer musicPlayer) {
        this.musicPlayer = musicPlayer;
    }
    
    @Override
    public void execute() {
        musicPlayer.on();
    }
}
```

``` java
// 음악 플레이어 Off 커맨드
public class MusicPlayerOffCommand implements Command {
    private MusicPlayer musicPlayer;
    
    public MusicPlayerOffCommand(MusicPlayer musicPlayer) {
        this.musicPlayer = musicPlayer;
    }
 
    @Override
    public void execute() {
        musicPlayer.off();   
    }
}
```

```java
// 빈 명령 슬롯을 초기화 시키기 위한 Dummy 커맨드
public class NoCommand implements Command {
    @Override
    public void execute() {
        System.out.println("명령 슬롯이 초기화 되어 있지 않습니다.");   
    }
}
```


<br>

4) **인보커 객체** 만들기

``` java
public class MultipleRemoteControl {
    Command[] onCommands;
    Command[] offCommands;
 
    public MultipleRemoteControl() {
        onCommands = new Command[7];
        offCommands = new Command[7];
        NoCommand noCommand = new NoCommand();
 
        for (int i = 0; i < 7; i++) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }
    }
 
    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot]=onCommand;
        offCommands[slot]=offCommand;
    }
 
    public void onButtonPressed(int slot) {
        onCommands[slot].execute();
    }
    
    public void offButtonPressed(int slot) {   
        offCommands[slot].execute();
    }
}
```

* setCommand 메소드로 호출 시 파라미터로 slot번호를 지정해줘야한다.

<br>


5) **클라이언트 객체** 만들기

``` java
public class RemoteControlTest {
    public static void main(String[] args) {
        MultipleRemoteControl remote = new MultipleRemoteControl();
        
        //리시버 및 커맨드 객체 생성
        Light livingLight = new Light("거실");
        LightOnCommand livingLightOn = new LightOnCommand(livingLight);
        LightOffCommand livingLightOff = new LightOffCommand(livingLight);
        
        Light kitchenLight = new Light("부엌");
        LightOnCommand kitchenLightOn = new LightOnCommand(kitchenLight);
        LightOffCommand kitchenLightOff = new LightOffCommand(kitchenLight);
        
        MusicPlayer musicPlayer = new MusicPlayer();
        MusicPlayerOnCommand musicPlayerOnCommand = new MusicPlayerOnCommand(musicPlayer);
        MusicPlayerOffCommand musicPlayerOffCommand = new MusicPlayerOffCommand(musicPlayer);
        
        //인보커 객체의 커맨드 배열에 커맨드 저장
        remote.setCommand(0, livingLightOn, livingLightOff);
        remote.setCommand(1, kitchenLightOn, kitchenLightOff);
        remote.setCommand(2, musicPlayerOnCommand, musicPlayerOffCommand);
        
        //인보커 객체 에서 커맨드 객체의 execute() 메소드 호출
        remote.onButtonPressed(0); // 거실 전등 켜짐
        remote.onButtonPressed(1); // 부엌 전등 켜짐
        remote.onButtonPressed(2); // 뮤직 플레이어 켜짐 및 최근 들은 곡 재생
        
        remote.offButtonPressed(0); // 거실 전등 꺼짐
        remote.offButtonPressed(1); // 부엌 전등 꺼짐
        remote.offButtonPressed(2); // 뮤직 플레이어 꺼짐
             
        remote.onButtonPressed(4); // 명령 슬롯이 초기화 되어 있지 않습니다.
        remote.offButtonPressed(4);  // 명령 슬롯이 초기화 되어 있지 않습니다.
    }
}
```


---




### 작업 취소(Undo) 기능 만들기

1) 인터페이스에 undo 메소드 추가하기

``` java
public interface Command { 
    public void execute();
    public void undo();
}
```

<br>

2) 커맨드 객체에 undo 메소드를 오버라이드

``` java
public class LightOnCommand implements Command {
    Light light; 
        
    public LightOnCommand(Light light) {
        this.light = light;
    }
 
    public void execute() {
        light.on();
    }
    
    /*
    이 객체는 On되어있는 상태에서 On시키는 객체이다.
    그렇기 때문에 undo() 호출 시
    light.off() 메소드를 호출한다.
    */
    public void undo() {   
        System.out.println("-----작업 취소-----");
        light.off();
    }
}
```

``` java
public class LightOffCommand implements Command {
    Light light;
 
    public LightOffCommand(Light light) {
        this.light = light;
    }
 
    public void execute() {
        light.off();
    }

    /*
    이 객체는 On되어있는 상태에서 Off시키는 객체이다.
    그렇기 때문에 undo() 호출 시
    light.on() 메소드를 호출한다.
    */
    public void undo() {   
        System.out.println("-----작업 취소-----");
        light.on();
    }
}
```


---

## 활용


> 요청 내용을 로그에 기록하기 

* 위 예로 설명해보면

``` java
//인보커 객체의 커맨드 배열에 커맨드 저장
remote.setCommand(0, livingLightOn, livingLightOff);
remote.setCommand(1, kitchenLightOn, kitchenLightOff);
remote.setCommand(2, musicPlayerOnCommand, musicPlayerOffCommand);

//인보커 객체 에서 커맨드 객체의 execute() 메소드 호출
remote.onButtonPressed(0); 
remote.onButtonPressed(1); 
remote.onButtonPressed(2); 
```

* remote호출하였을 경우 그 요청들을 원하는 **자료 구조(큐 또는 스택)**에 저장시킨다.

* 그렇다면 0,1,2라는 순서로 선택한 자료구조에 쌓이게 된다.

* 즉 요청한 내용을 로그로 기록할 수 있게 된다.


---

> 작업 취소 기능

* 자료 구조에 요청한 내용이 저장된 상태라고 할 때

* 작업 취소를 위해 가장 마지막에 수행된 작업에 대해 undo를 수행한다.

* 이런식으로 요청한 작업에 대해서 취소가 가능해진다.


---

## 참고

* [디자인패턴 - 커맨드 패턴 (command pattern)](http://jusungpark.tistory.com/18)

* [Command Design Pattern](http://huiyu.tistory.com/entry/7-Command-Pattern%EC%BB%A4%EB%A7%A8%EB%93%9C-%ED%8C%A8%ED%84%B4)

* [[DesignPattern]커맨드 패턴(Command Pattern)](http://minsone.github.io/programming/designpattern-command)

* [[디자인 패턴] 커맨드 패턴 (Command Pattern)](http://gdtbgl93.tistory.com/23)

* [행동을 하나의 객체로 - 커맨드 패턴 Command Pattern](http://moonshoo.tistory.com/5)
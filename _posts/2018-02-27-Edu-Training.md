---
layout: post
title:  " Smart Contract 교육 (2) "
categories: Conference
tags: 
author: goodGid
---
* content
{:toc}


지갑설치를 하자.

메타 마스크(공식 지갑) [설치 경로](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)


{% capture images %}
	/assets/img/block_chain/edu_training_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


P/W를 입력하고 나면 

가운데 Text Box에 12개의 단어가 나온다.

이값들을 기억하고 있어야한다. 

이 블로그에서는 안보이게 수정한 사진을 업로드하였다.

{% capture images %}
	/assets/img/block_chain/edu_training_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

Test상이기 때문에 ether가 필요하다.

[https://faucet.metamask.io](https://faucet.metamask.io)에서 필요한 만큼 이더를 받자.

{% capture images %}
	/assets/img/block_chain/edu_training_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


<center> <kbd>request 1 ether from faucet</kbd>버튼을 누르면 </center>

{% capture images %}
	/assets/img/block_chain/edu_training_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

다음과 같은 Tx가 뜬다.

Tx가 떴다는건 송금이 완료되었다는거다.

<br>

다음으로 코딩을 하기 위해 [https://remix.ethereum.org/](https://remix.ethereum.org/)에 접속을 한다.

remix 홈페이지는 solidity 언어를 코딩 하기위한 온라인 IDE라고 생각하면 된다.

[https://ethereum.org/token](https://ethereum.org/token) 사이트에서 기본적으로 제공하는

코드를 복사하자. 


``` js

contract MyToken {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function MyToken(
        uint256 initialSupply
        ) {
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) {
        require(balanceOf[msg.sender] >= _value);           // Check if the sender has enough
        require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
        balanceOf[msg.sender] -= _value;                    // Subtract from the sender
        balanceOf[_to] += _value;                           // Add the same to the recipient
    }
}

```



Remix사이트에가서 위 코드를 Copy & Paste를 한다.

그리고 오른쪽 `Run`탭을 클릭 후 


{% capture images %}
	/assets/img/block_chain/edu_training_5.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

Environment를 Injected Web3로 변경해준다.

그러면 자동적으로 Metamask의 지갑이 연결이 된다.

그리고 Create를 누르면 Token발급이 된다.


{% capture images %}
	/assets/img/block_chain/edu_training_6.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

저 Tx(Transaction)의 Hash값을 복사한다.

<br>

다시 우측상단에 Metamask로고를 누르고

Token탭을 누른다.

{% capture images %}
	/assets/img/block_chain/edu_training_7.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

<br>

ADD TOKEN버튼을 누른 후 

Tx의 Hash값을 추가해준다.

{% capture images %}
	/assets/img/block_chain/edu_training_8.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


<br>

다시 [https://ethereum.org/token](https://ethereum.org/token) 접속하여

{% capture images %}
	/assets/img/block_chain/edu_training_9.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

밑에 있는 코드를 복사한다.

(코드가 너무 길어 복붙을 못하였다.)

<br>

9번째 줄을 보면

uint8 public decimals = 18;

4로 수정하자.

이 코드는 소숫점 몇자리 까지 보낼지 정해준다.

위에서 했던 스텝과 마찬가지로 

{% capture images %}
	/assets/img/block_chain/edu_training_10.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

[ 100000,"tokenName_goodgid", "tokenSymbol_goodgid" ] 라는 값으로 셋팅을 해주고

Create를 해준다.

여기서 String은 " "로 묶어줘야한다.

<br>

{% capture images %}
	/assets/img/block_chain/edu_training_11.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

ADD TOKEN을 해주게 되면 

새로운 TOKEN이 추가된 것을 볼 수 있다.

<br>

다시 Remix로 돌아와

Burn값에 삭제시킬 TOKEN의 갯수를 지정하고 클릭을 한 후 

지갑으로 돌아가 TOKEN의 수를 확인해보면 

줄어든 것을 확인할 수 있다.

{% capture images %}
	/assets/img/block_chain/edu_training_12.png
	/assets/img/block_chain/edu_training_13.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}


---


[https://ethereum.org/crowdsale](https://ethereum.org/crowdsale)에 접속하자.

{% capture images %}
	/assets/img/block_chain/edu_training_14.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

코드를 복사하자.

주의점: 각 주소는 "주소"와 같이 큰 따옴표로 감싸야 한다.

---

<br>

{% capture images %}
	/assets/img/block_chain/edu_training_15.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


생성자에 값을 넣어보자.

[ "0x2e48deebedfdf5df84d9970d3f72d48f72929cb5", <br> 5000, 4320, 1, <br> "0x80695B7EB1CB1326E32D4EF819B9B1b1884d8592" ]

각 매개변수가 뜻하는건 다음과 같다.

1. 돈 받을 주소 <br> Remix의 우측 상단에 내 지갑 주소가 있다.

2. 5000은 트윈토큰 목표치,

3. 4320은 4320분 즉 3일,

4. 1은 트윈토큰 한개당 가격

5. 트윈토큰이 정의된 컨트랙트 주소 <br> 토큰의 주소


---

<br>

지금부터는 다시 TokenERC20 파일로 돌아와서 진행한다.


{% capture images %}
	/assets/img/block_chain/edu_training_16.png
	/assets/img/block_chain/edu_training_17.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}

[ "0x2e48deebedfdf5df84d9970d3f72d48f72929cb5",1 ]라는 값을 입력 후

transfer버튼을 누른다.

( 여기서 사용되는 40자리의 16진수는 모두다 나의 지갑 주소이다. )

그 후

[https://ropsten.etherscan.io/](https://ropsten.etherscan.io/)에서 

나의 지갑 주소를 검색한다.

전에는 없던 Misc라는 탭이 생기고 Token이 보이게 된다.

{% capture images %}
	/assets/img/block_chain/edu_training_18.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

---

* 추가적으로 질문이 있을 경우 \[ kds@glosfer.com ] 로 메일을 보내자 ! 
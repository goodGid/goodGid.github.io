---
layout: post
title:  " Education :: Training "
date:   2018-02-17
excerpt: " Smart Contract "
cate : "post"
tag:
- Education
---


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


{% highlight JavaScript %}

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

{% endhighlight %}



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

저 Tx의 Hash값을 복사한다.

<br>

다시 우측상단에 Metamask로고를 누르고

Token탭을 누른다.

{% capture images %}
	/assets/img/block_chain/edu_training_7.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

Tx의 Hash값을 추가해준다.

{% capture images %}
	/assets/img/block_chain/edu_training_8.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}




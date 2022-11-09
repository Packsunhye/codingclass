// 01 html / css 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드를 뒤집기 확인하기(첫번째,두번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = memoryWrap.querySelectorAll(".cards li");

const memoryStartBtn = memoryWrap.querySelector("button.use");
const memoryStartBtnEnd = memoryWrap.querySelector("button.useEnd");


const memoryScoreNum = memoryWrap.querySelector(".memory__card .result p");
const memoryScoreFine = memoryWrap.querySelector(".memory__end .endFine p:nth-child(1)");
const memoryScoreOne = memoryWrap.querySelector(".memory__card .result p em");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let countScore = 100;
let sound = [
  "../assets/music/fail.m4a",
  "../assets/music/ture.m4a",
  "../assets/music/ture02.m4a",
];
let soundMatch = new Audio(sound[1]);
let soundUnMatch = new Audio(sound[0]);
let soundGoodMatch = new Audio(sound[2]);


//게임 시작하기
function satrtCard(){
  memoryStart.classList.remove("start");
  memoryInner.classList.add("start");

  //카드 뒤집기
  shuffledCard();
}

//카드 뒤집기
function filpCard(e) {
  let clickdeCard = e.target;

  if (clickdeCard !== cardOne && !disableDeck) {
    clickdeCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickdeCard);
    }

    cardTwo = clickdeCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector(".back img").src;
    let cardTwoImg = cardTwo.querySelector(".back img").src;
    //   console.log(cardOneImg);
    matchCards(cardOneImg, cardTwoImg);
    // console.log(cardOneImg, cardTwoImg);
  }
}



//카드 확인(두개의 이미지 비교)
function matchCards(img1, img2) {
  //   console.log(img2);
  if (img1 == img2) {
    //같을 경우
    matchedCard++;
    // alert("이미지가 일치합니다");
    if (matchedCard == 8) {
      // alert("게임 오버");
      soundGoodMatch.play();
      setTimeout(() => {  
        endCard()
      }, 2000);
      // memoryScoreNum.innerHTML = `축하드립니다. 점수는 <em>${countScore}</em>점 입니다 :3`
      cardOne.removeEventListener("click", filpCard);
      cardTwo.removeEventListener("click", filpCard);
      soundMatch.play();
      cardOne = cardTwo = "";
      disableDeck = false;
    }

    cardOne.removeEventListener("click", filpCard);
    cardTwo.removeEventListener("click", filpCard);
    soundMatch.play();
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    // alert("이미지가 일치하지 않습니다.");
    //일치하지 않는경우(틀린 음악, 이미지가 좌우로 움직임)
    setTimeout(() => {
      cardOne.classList.add("shakeX");
      cardTwo.classList.add("shakeX");
    }, 500);

    setTimeout(() => {
      cardOne.classList.remove("shakeX", "flip");
      cardTwo.classList.remove("shakeX", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1600);

    countScore = countScore - 10;

    if(countScore == 0){
      setTimeout(() => {  
        endCard()
      }, 2000);
      // endCard();
    }
    soundUnMatch.play();
  }
  memoryScoreNum.innerHTML = `점수 : ${countScore}점`;
  // memoryScoreOne.innerText = countScore;
}

//카드 섞기
function shuffledCard() {
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;
  memoryScoreOne.innerText = countScore;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  memoryCards.forEach((card, index) => {
    card.classList.remove("flip");

    setTimeout(() => {
      card.classList.add("flip");
    }, 300 * index);

    setTimeout(() => {  
      card.classList.remove("flip");
    }, 6000);

    let imgTag = card.querySelector(".back img");
    imgTag.src = `../assets/memory/0${arr[index]}.png`;
  });
}

// shuffledCard();

// 게임 끗
function endCard(){
  memoryStart.classList.remove("start");
  memoryInner.classList.remove("start");
  memoryEnd.classList.add("start");

  // alert(countScore);

  memoryScoreFine.innerHTML = `점수는 <em>${countScore}</em>점 입니다 :3`;

}

//카드 클릭 
memoryCards.forEach((card) => {
  card.addEventListener("click", filpCard);
});

// 리스타투
function restartCard(){
  cardReset()
  satrtCard()
  // card.addEventListener("click", filpCard);
  memoryEnd.classList.remove("start");

  // let countScore = 100;

  // memoryScoreOne.innerText = countScore;
  memoryScoreNum.innerHTML = `점수 : ${countScore}점`;
}

// 리셋
function cardReset() {
  memoryStart.classList.add("start");
  memoryEnd.classList.remove("start");
  memoryInner.classList.remove("start");

  
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;
  countScore = 100;
  memoryScoreNum.innerHTML = `점수 : ${countScore}점`;
  cardOne = cardTwo = "";
  // cardOne.removeEventListener("click", filpCard);
  // cardTwo.removeEventListener("click", filpCard);
  soundMatch.play();
  disableDeck = false;
  // cardOne.addEventListener("click", filpCard);
  // cardTwo.addEventListener("click", filpCard);

  memoryScoreOne.innerText = "0";

  memoryCards.forEach((card) => {
      card.classList.remove("flip");
  });
}

// 버튼 이벤트
memoryStartBtn.addEventListener("click", satrtCard); // 게임 시작
memoryStartBtnEnd.addEventListener("click", restartCard); // 게임 재시작
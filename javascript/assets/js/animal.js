const cssProperty = [
    { num: 1, name: "강아지"},
    { num: 2, name: "고양이"},
    { num: 3, name: "햄스터" },
    { num: 4, name: "페럿" },
    { num: 5, name: "기니피그"},
    { num: 6, name: "고슴도치"},
    { num: 7, name: "토끼"},
    { num: 8, name: "멧돼지"},
    { num: 9, name: "돼지"},
    { num: 10, name: "다람쥐"},
    { num: 11, name: "사슴"},
    { num: 12, name: "사자"},
    { num: 13, name: "호랑이"},
    { num: 14, name: "표범"},
    { num: 15, name: "재규어"},
    { num: 16, name: "해파리"},
    { num: 17, name: "돌고래"},
    { num: 18, name: "고래"},
    { num: 19, name: "상어"},
    { num: 20, name: "쥐"},
    { num: 21, name: "원숭이"},
    { num: 22, name: "알파카"},
    { num: 23, name: "곰"},
    { num: 24, name: "라마"},
    { num: 25, name: "물소"},
    { num: 26, name: "하마"},
    { num: 27, name: "삵"},
    { num: 28, name: "고릴라"},
    { num: 29, name: "얼룩말"},
    { num: 30, name: "치타"},
    { num: 31, name: "코끼리"},
    { num: 32, name: "미어캣"},
    { num: 33, name: "문어"},
    { num: 34, name: "너구리"},
    { num: 35, name: "여우"},
    { num: 36, name: "늑대"},
    { num: 37, name: "친칠라"},
    { num: 38, name: "수달"},
    { num: 39, name: "해달"},
    { num: 40, name: "부엉이"},
    { num: 41, name: "올빼미"},
    { num: 42, name: "까치"},
    { num: 43, name: "북극곰"},
    { num: 44, name: "바다표범"},
    { num: 45, name: "물개"},
    { num: 46, name: "펭귄"},
    { num: 47, name: "물범"},
    { num: 48, name: "족제비"},
    { num: 49, name: "라쿤"},
    { num: 50, name: "참새"},
    { num: 51, name: "비둘기"},
    { num: 52, name: "까마귀"},
    { num: 53, name: "앵무새"},
    { num: 54, name: "백조"},
    { num: 55, name: "잉어"},
    { num: 56, name: "붕어"},
    { num: 57, name: "흑등고래"},
    { num: 58, name: "향유고래"},
    { num: 59, name: "흰긴수염고래"},
    { num: 60, name: "불가사리"},
    { num: 61, name: "꽃게"},
    { num: 62, name: "칠게"},
    { num: 63, name: "해삼"},
    { num: 67, name: "조개"},
];

const searchTime = document.querySelector(".time span");
const searchList = document.querySelector(".search__list");
const searchAnswers = document.querySelector(".search__anwers");
const searchMissAnswers = document.querySelector(".search__MissAnwers");
const searchStart = document.querySelector(".search__box .start");
const searchInput = document.querySelector("#search");
const searchAudio = document.querySelector("#audio");
const musicPlayVar = document.querySelector(".search__audio .play");
const musicStop = document.querySelector(".search__audio .stop");
const searchScoreNum = document.querySelector(".search__info .num");
const searchScoreNow = document.querySelector(".search__info .now");
const searchResult = document.querySelector(".search__result .result");
const searchResultWrap = document.querySelector(".search__result");
const searchRestart = document.querySelector(".search__result .restart");

let timeReamining = 60,  // 남은 시간
score = 0;      // 점수
answers = {},   // 새로운 정답
timeInterval = ""; //시간간격

searchScoreNum.innerHTML = cssProperty.length;


function updateList(){
cssProperty.forEach(data => {
    searchList.innerHTML += `<span>${data.name}</span>`;
})
}
updateList();

// 게임 시작하기
function startQuiz(){

// 시작 버튼 숨기기
searchStart.style.display = "none";
searchList.style.display = "none";

//다시 시작할때 데이터 초기화
searchAnswers.innerHTML = "";
searchMissAnswers.innerHTML = "";

// 시간 설정(1초에 한번씩 줄어듦)
timeInterval = setInterval(reduceTime, 1000);

// 버튼 모습
musicStop.style.display = "none";
musicPlayVar.style.display = "block";
// 음악 추가
music();

// 점수 계산
let score = 0;

// 정답 체크
checkAnswers();
}
// 음악 재생
function music(){
musicStop.addEventListener("click", () => {
    musicStop.style.display = "none";
    musicPlayVar.style.display = "block";
    searchAudio.pause();
})
musicPlayVar.addEventListener("click", () => {
    musicPlayVar.style.display = "none";
    musicStop.style.display = "block";
    searchAudio.play();
})
searchAudio.play();
}

// 인풋 체크하기
function checkInput(){
let input = event.currentTarget.value.trim().toLowerCase();  // 사용자가 입력한 값 가져오기
if(answers.hasOwnProperty(input) && !answers[input]){
    answers[input] = true;
    // 정답 표시
    searchAnswers.style.display = "block";
    searchAnswers.innerHTML += `<span>${input}</span>`;
    // 점수 반영
    score++;
    searchScoreNow.innerText = score;
    // 정답 초기화
    searchInput.value = "";
}
}

// 정답 체크하기 : 정답을 객체 파일로 만들기
function checkAnswers() {
cssProperty.forEach(item => {
    let answer = item.name.trim().toLocaleLowerCase();
    answers[answer] = false;
});
}

// 오답 보여주기
function missAnswers(){
searchMissAnswers.style.display = "block";
searchAnswers.style.display = "none";
cssProperty.forEach(item => {
    let answer = item.name.trim().toLocaleLowerCase();
    if(answers[answer] == false){
        searchMissAnswers.innerHTML += `<span>${item.name}</span>`
    }
})
}

// 시간 설정하기 0:00
function reduceTime(){
timeReamining--;
if(timeReamining == 0) endQuiz();
searchTime.innerText = displayTime();
}

// 시간 표시하기
function displayTime(){
if(timeReamining <= 0){
    return "0:00";
} else {
    let minutes = Math.floor(timeReamining / 60);
    let seconds = timeReamining % 60;
    // 초 단위가 한자리수일 때 0 추가
    if(seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}
}

// 게임이 끝났을 때
function endQuiz(){
// 시작 버튼 만들기
searchStart.style.display = "block";
searchStart.style.pointerEvents = "none";
// 오답 보여주기
missAnswers();
//시간정지
clearInterval(timeInterval);
// 음악 끄기
musicStop.style.display = "block";
musicPlayVar.style.display = "none";
searchAudio.pause();
// 메시지 출력
searchResultWrap.classList.add("show");
let point = Math.round(score / cssProperty.length * 100);
searchResult.innerHTML = `게임이 종료되었습니다.${cssProperty.length}개 중 ${score}개를 맞혔습니다. 점수는 ${point}점입니다.`;
}
// 다시 시작하기
function restart(){
    searchResultWrap.classList.remove("show");
    timeReamining = 120;  // 시간
    score = 0;

    searchStart.style.display = "none";  // 버튼 숨김
    searchStart.style.pointerEvents = "all";
    searchList.style.display = "none";

    //맞힌 갯수 없애기
    searchScoreNow.textContent = "0";

    //노래
    musicStop.style.display = "none";
    musicPlay.style.display = "block";
    searchAudio.play();

    startQuiz()
}

// 버튼 이벤트
searchStart.addEventListener("click", startQuiz); // 게임 시작
searchInput.addEventListener("input", checkInput);
searchRestart.addEventListener("click", restart);
$(searchResultWrap).draggable();


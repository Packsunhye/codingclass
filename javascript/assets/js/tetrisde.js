// 선택자
const tetrisWrap = document.querySelector(".tetris__wrap");
const playGround = tetrisWrap.querySelector(".playground > ul");

//
const gameEnd = document.querySelector(".tetris___restart");

// 변수 설정
let rows = 20;
let cols = 12;
let tscore = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

// 블록 정보 설정
const movingItem = {
  type: "Tmino",
  direction: 0, //블록 모양 설정
  top: 0,
  left: 4,
};

// 블럭 좌표 값 설정
const blocks = {
  Tmino: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ], // Tmino 기본모양 : 객체안에 배열배열배열...
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ], // Tmino 기본모양2
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ], // Tmino 기본모양3
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ], // Tmino 기본모양4
  ],
  Imino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  ],
  Omino: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  Zmino: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
  ],
  Smino: [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  Jmino: [
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  ],
  Lmino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 0],
      [2, 1],
    ],
  ],
};

// 시작하기
function init() {
  // 무빙아이템 정보 넣기
  tempMovingItem = { ...movingItem };

  for (let i = 0; i < rows; i++) {
    prependNewLine(); //블록 라인 만들기
  }

  // console.log(tempMovingItem)

  generateNewBlock(); //블록 만들기
}

// 블록 만들기
function prependNewLine() {
  // createElement : HTML 태그를 만듦
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < cols; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  // prepend : 가장 마지막에 넣음
  li.prepend(ul);
  playGround.prepend(li);
}

// 블록 출력하기
function renderBlocks(moveType = "") {
  // const ty = tempMovingItem.type;
  // const di = tempMovingItem.directioin;
  // const to = tempMovingItem.top;
  // const le = tempMovingItem.left;

  const { type, direction, top, left } = tempMovingItem;

  const movingBlocks = document.querySelectorAll(".moving");

  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });
  // 1. 블록 모양잡기
  // forEach는 중간에 멈출 수 없음 some은 내가 원할때에 멈출 수 있음
  // 4개를 가져와야해서 forEach로 x,y 값을 가져옴
  blocks[type][direction].some((block) => {
    const x = block[0] + left; // 2 0 1 1
    const y = block[1] + top; // 1 1 0 1
    // 4. 블록이 영역을 벗어나는 것 감지
    const target = playGround.childNodes[y]
      ? playGround.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);

    // isAvailable에 값이 있을 경우 moving을 추가합니다.
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      // 값이 없을 경우 전으로 초기화시키기 : 영역밖으로 넘어가지 않도록 setTimeout을 통해 제어
      tempMovingItem = { ...movingItem };

      // 재도전
      if (moveType === "retry") {
        clearInterval(downInterval);
        showGameOverText();
      }

      setTimeout(() => {
        renderBlocks("retry");
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      // setTimeout(() => {
      //   renderBlocks();
      //   if (moveType === "top") {
      //     seizeBlock();
      //   }
      // }, 0);
      return true;
    }
    // console.log({ playground }); //배열에 있는 childNodes,children 등을 이용
  });

  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
  // 2. 블록의 이름(모양)에 맞추어 클래스 추가 -> 해당하는 부분에 색칠됨
  // target.classList.add(type, "moving");
  // 를 했었지만 4번으로 이동
}

// 블럭 영역 감지하기
function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");

  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  //   generateNewBlock();
  checkMatch();
}

// 한줄 제거하기
function checkMatch() {
  const childNodes = playGround.childNodes;
  childNodes.forEach((child) => {
    let matcted = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        matcted = false;
      }
    });

    if (matcted) {
      child.remove();
      prependNewLine();
      tscore++;
    }
  });

  generateNewBlock();
}

// 새로운 블럭 만들기
function generateNewBlock() {
  clearInterval(downInterval);
  // 점점 빨라지는 것 방지하기 위해 downInterval 만들어줌
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArray = Object.entries(blocks);
  const randomIndex = Math.floor(Math.random() * blockArray.length);

  movingItem.type = blockArray[randomIndex][0];

  movingItem.top = 0;
  movingItem.left = 6;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };

  renderBlocks();
}

// 빈칸 값 확인하기
function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    // 빈칸이 없으면 종료
    return false;
  }
  return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

// 블록 모양 바꾸기
function changeDiretion() {
  const direction = tempMovingItem.direction;

  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
}

// 블록 빨리 내리기
function dropBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}

// 게임 종료
function showGameOverText() {
  // gameEnd.style.display = "block";
}

// 이벤트
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
      break;
    case 40:
      moveBlock("top", 1);
      break;
    case 38:
      changeDiretion("top", 1);
      break;
    case 32:
      dropBlock("top", 1);
      break;

    default:
      break;
  }
});

init();

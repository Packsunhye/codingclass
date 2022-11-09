const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");
// variables
let rows = 15;
let cols = 12;
let tetrisScore = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
// 블록 정보
const movingItem = {
  type: "Imino", // 블록 이름
  direction: 0, //블록 모양
  top: 0,
  left: 6,
};
// 블록 좌표값
const blocks = {
  Tmino: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
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
  // 블록 정보를 tempMovingItem에 입력
  tempMovingItem = { ...movingItem };

  for (let i = 0; i < rows; i++) {
    prependNewLine(); //블록 라인 만들기
  }

  // renderBlocks(); //블록 출력하기
  // moveBlock();
  generateNewBlock(); //블록 만들기
}
// 블록 만들기 : cols * rows
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
  playground.prepend(li);
}
// 블록 출력하기
function renderBlocks(moveType = "") {
  // moveType 매개변수를 추후에 추가했음. 만약 전달할 값이 없으면 위처럼 적으면 됨

  // const ty = tempMovingItem.type;
  // const di = tempMovingItem.direction;
  // const to = tempMovingItem.top;
  // const le = tempMovingItem.left;
  // 아래와 같이 간단하게 작업할 수 있음... 간단한가...
  // 1. 블록 모양잡기
  const { type, direction, top, left } = tempMovingItem;

  // 3. 블록 움직이게 하기(moving 클래스가 없으면 복제됨)
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });

  // 1. 블록 모양잡기
  // forEach, some의 차이 : some은 중간에 멈출 수 있음, forEach는 계속 반복
  blocks[type][direction].some((block) => {
    const x = block[0] + left; //2 0 1 1
    const y = block[1] + top; //1 1 0 1
    // 4. 블록이 영역을 벗어나는 것 감지
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };

      setTimeout(() => {
        renderBlocks();
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }
    // console.log({ playground });
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;

  // 2. 블록의 이름(모양)에 맞추어 클래스 추가 -> 해당하는 부분에 색칠됨
  // target.classList.add(type, "moving");
  // 를 했었지만 4번으로 이동
}

//블록 감지하기
function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  checkMatch();
}

// 한줄 제거하기
function checkMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      prependNewLine();
      tetrisScore++;
    }
  });
  generateNewBlock();
}

//새로운 블록 만들기
function generateNewBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    // 점점 빨라지는 것 방지하기 위해 downInterval 만들어줌
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

// 빈칸 감지
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

//모양 바꾸기
function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);

  renderBlocks();
}

//빨리 내리기
function dropBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}

// 이벤트
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    // 오른쪽 방향키를 눌렀을 때, left 1 움직여라
    case 39:
      moveBlock("left", 1);
      break;
    // 왼쪽
    case 37:
      moveBlock("left", -1);
      break;
    // 아래쪽
    case 40:
      moveBlock("top", 1);
      break;
    // 위쪽
    case 38:
      changeDirection();
      break;
    // 내려찍기
    case 32:
      dropBlock();
      break;

    default:
      break;
  }
});
init();

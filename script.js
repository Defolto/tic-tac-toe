const pole = document.querySelector(".pole");
const ip = "192.168.0.106";
export const wsConnection = new WebSocket(`ws://${ip}:8999`);
let step = true;

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

function resetLevel() {
  const sqs = document.querySelectorAll(".sq");
  sqs.forEach((item) => {
    item.textContent = "";
  });
}

pole.addEventListener("click", (e) => {
  wsConnection.send(JSON.stringify({ number: e.target.dataset.number }));
});

wsConnection.onopen = function () {
  console.log("Соединение установлено.");
};

wsConnection.onmessage = function (event) {
  const data = JSON.parse(event.data);
  document.querySelector(`.pole .sq:nth-child(${data.number})`).textContent = step ? "X" : "O";
  step = !step;

  const sqs = document.querySelectorAll(".sq");
  wins.forEach((win) => {
    if (sqs[win[0]].textContent === sqs[win[1]].textContent && sqs[win[1]].textContent === sqs[win[2]].textContent) {
      if (sqs[win[0]].textContent === "X") {
        alert("Выйграли X");
        setTimeout(() => {
            resetLevel()
        }, 4000);
      } else if (sqs[win[0]].textContent === "O") {
        alert("Выйграли O");
        setTimeout(() => {
            resetLevel()
        }, 4000);
      }
    }
  });
};

document.querySelector("button").addEventListener("click", () => {
  resetLevel();
});

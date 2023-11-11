let dice = 0;
let i = 0;
let activePlayer = 1;
let previousDice = 0;
let setTimeoutId = null;
let clearIntervalV = null;

document.getElementById("number_click").innerHTML = 0;

const handleSwitchPlayer = () => {
  activePlayer++;
  activePlayer = activePlayer % 5;
  if (activePlayer == 0) {
    activePlayer++;
  }
};

const handleInterval = () => {
  let i = 0;
  return setInterval(() => {
    i++;
    document.getElementsByClassName("timerrr")[0].innerHTML = i;
  }, 2000);
};

const clearIntervalFunction = (id) => {
  clearInterval(id);
  document.getElementsByClassName("timerrr")[0].innerHTML = 0;
};

const handleActivePlayer = (activePlayer, resetToZero) => {
  if (resetToZero) {
    document.getElementById("number_click").innerHTML = 0;
    document.getElementsByClassName("genrateNo")[0].disabled = false;
  }
  switch (activePlayer) {
    case 1:
      document.getElementById("red").style.boxShadow =
        "rgba(0, 0, 0, 2.2) 4px 6px 18px";
      document.getElementById("blue").style.boxShadow = "none";
      document.getElementById("yellow").style.boxShadow = "none";
      document.getElementById("green").style.boxShadow = "none";
      return "red";
    case 2:
      document.getElementById("blue").style.boxShadow =
        "rgba(0, 0, 0, 2.2) 4px 6px 18px";
      document.getElementById("red").style.boxShadow = "none";
      document.getElementById("yellow").style.boxShadow = "none";
      document.getElementById("green").style.boxShadow = "none";
      return "blue";
    case 3:
      document.getElementById("yellow").style.boxShadow =
        "rgba(0, 0, 0, 2.2) 4px 6px 18px";
      document.getElementById("blue").style.boxShadow = "none";
      document.getElementById("red").style.boxShadow = "none";
      document.getElementById("green").style.boxShadow = "none";

      return "yellow";
    case 4:
      document.getElementById("green").style.boxShadow =
        "rgba(0, 0, 0, 2.2) 4px 6px 18px";
      document.getElementById("yellow").style.boxShadow = "none";
      document.getElementById("blue").style.boxShadow = "none";
      document.getElementById("red").style.boxShadow = "none";

      return "green";
    default:
      break;
  }
};

const btn_values = {
  red: {
    startValue: 41,
    red_one: { max: 51, current: -1, boxN0: "" },
    red_two: { max: 51, current: -1, boxN0: "" },
    red_three: { max: 51, current: -1, boxN0: "" },
    red_four: { max: 51, current: -1, boxN0: "" },
  },
  yellow: {
    startValue: 15,
    yellow_one: { max: 51, current: -1, boxN0: "" },
    yellow_two: { max: 51, current: -1, boxN0: "" },
    yellow_three: { max: 51, current: -1, boxN0: "" },
    yellow_four: { max: 51, current: -1, boxN0: "" },
  },
  green: {
    startValue: 2,
    green_one: { max: 51, current: -1, boxN0: "" },
    green_two: { max: 51, current: -1, boxN0: "" },
    green_three: { max: 51, current: -1, boxN0: "" },
    green_four: { max: 51, current: -1, boxN0: "" },
  },
  blue: {
    startValue: 28,
    blue_one: { max: 51, current: -1, boxN0: "" },
    blue_two: { max: 51, current: -1, boxN0: "" },
    blue_three: { max: 51, current: -1, boxN0: "" },
    blue_four: { max: 51, current: -1, boxN0: "" },
  },
};

const handleClick = () => {
  const random = (Math.random() * (7 - 1) + 1).toString().split(".")[0];

  document.getElementById("number_click").innerHTML = random;
  const activePlayerColor = handleActivePlayer(activePlayer);
  dice = Number(random);
  let returnFalse = true;
  for (let x in btn_values[activePlayerColor]) {
    const cv = btn_values[activePlayerColor][x]?.current;
    if (
      x != "startValue" &&
      cv.toString() != "-1" &&
      dice != 6 &&
      previousDice != 6
    ) {
      clearIntervalV = handleInterval();
      setTimeoutId = setTimeout(() => {
        handleSwitchPlayer();
        document.getElementsByClassName("genrateNo")[0].disabled = false;
        handleActivePlayer(activePlayer, true);
        clearIntervalFunction(clearIntervalV);
      }, 5000);
      returnFalse = false;
    }
  }

  if (dice <= 5 && previousDice != 6 && returnFalse) {
    handleSwitchPlayer();

    const id = setTimeout(() => {
      handleActivePlayer(activePlayer, true);
      clearTimeout(id);
    }, 1000);
  }
  document.getElementsByClassName("genrateNo")[0].disabled = true;

  previousDice = dice;
};

const removeSameCellElement = (currentParentName) => {
  for (let currenValue in btn_values[currentParentName]) {
    const parentBoxNo = btn_values[currentParentName][currenValue]?.boxN0;
    for (let x in btn_values) {
      if (x != currentParentName) {
        for (y in btn_values[x]) {
          const childBoxNo = btn_values[x][y]?.boxN0;
          const safeMember =
            document
              .querySelector(`[data-divValue='${childBoxNo}']`)
              ?.getAttribute("safe") === "true";
          if (
            parentBoxNo == childBoxNo &&
            typeof parentBoxNo != "string" &&
            typeof parentBoxNo != "undefined" &&
            !safeMember
          ) {
            const node = document.querySelector(
              `[data-divValue='${parentBoxNo}']`
            );
            const totalButton = node.getElementsByTagName("button");
            for (let i = 0; i < totalButton.length; i++) {
              const allButtonText = totalButton[i]
                .getAttribute("value")
                .split("_")[0];
              if (allButtonText != currentParentName) {
                document
                  .getElementById(`${allButtonText}_container`)
                  .appendChild(totalButton[i]);
                btn_values[x][y].current = -1;
              }
            }
          }
        }
      }
    }
  }
};

const onplayerClick = (e) => {
  const value = e.target.value;
  const extractParentName = value.split("_")[0];
  const currentValue = btn_values[extractParentName][value];
  const startValue = Number(btn_values[extractParentName].startValue);
  if (dice == 0) {
    return false;
  }

  if (
    handleActivePlayer(activePlayer) != extractParentName ||
    (dice <= 5 && currentValue.current == -1)
  ) {
    return false;
  }

  if (currentValue.current == -1) {
    currentValue.current = 0;
    document
      .querySelector(`[data-divValue='${startValue}']`)
      .appendChild(e.target);
    currentValue.boxN0 = startValue;
  } else {
    currentValue.current += dice;
    let combineValue = Number(startValue) + Number(currentValue.current);

    if (currentValue.current > 50) {
      const houseClass = `H_${extractParentName}_${currentValue.current + 2}`;
      if (currentValue.current + 2 > 57) {
        document.getElementById("winner").innerHTML = "winner";
        e.target.classList.add("display_none");
        return false;
      }
      combineValue = houseClass;
    }
    if (combineValue > 52) {
      const subValue = combineValue - 52;

      combineValue = subValue;
    }

    document
      .querySelector(`[data-divValue='${combineValue}']`)
      .appendChild(e.target);
    currentValue.boxN0 = combineValue;
    removeSameCellElement(extractParentName);
    if (dice != 6 && previousDice != 6) {
      handleSwitchPlayer();
      clearTimeout(setTimeoutId);
      clearIntervalFunction(clearIntervalV);
      document.getElementsByClassName("genrateNo")[0].disabled = false;
      handleActivePlayer(activePlayer, true);
    }
  }
  document.getElementsByClassName("genrateNo")[0].disabled = false;

  dice = 0;
};

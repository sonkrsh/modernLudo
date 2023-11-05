let dice = 0;
let i = 0;

const btn_values = {
  red: {
    startValue: 41,
    red_one: { max: 51, current: -1 },
    red_two: { max: 51, current: -1 },
    red_three: { max: 51, current: -1 },
    red_four: { max: 51, current: -1 },
  },
  yellow: {
    startValue: 15,
    yellow_one: { max: 51, current: -1 },
    yellow_two: { max: 51, current: -1 },
    yellow_three: { max: 51, current: -1 },
    yellow_four: { max: 51, current: -1 },
  },
  green: {
    startValue: 2,
    green_one: { max: 51, current: -1 },
    green_two: { max: 51, current: -1 },
    green_three: { max: 51, current: -1 },
    green_four: { max: 51, current: -1 },
  },
  blue: {
    startValue: 28,
    blue_one: { max: 51, current: -1 },
    blue_two: { max: 51, current: -1 },
    blue_three: { max: 51, current: -1 },
    blue_four: { max: 51, current: -1 },
  },
};

const handleClick = () => {
  // const random = (Math.random() * (7 - 1) + 1).toString().split(".")[0];

  const random = (Math.random() * (7 - 1) + 1).toString().split(".")[0];
  document.getElementById("number_click").innerHTML = random;

  if (i == 0) {
    const list = document.getElementsByClassName("red_btn");
    dice = 6;
    // for (let i = 0; i < list.length; i++) {
    //   list[i].disabled = false;
    // }
    i++;
  } else {
    dice = Number(random);
  }
};

const onplayerClick = (e) => {
  const value = e.target.value;
  const extractParentName = value.split("_")[0];
  const currentValue = btn_values[extractParentName][value];
  const startValue = Number(btn_values[extractParentName].startValue);

  if (currentValue.current == -1) {
    currentValue.current = 0;
    document
      .querySelector(`[data-divValue='${startValue}']`)
      .appendChild(e.target);
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
  }
};

// const check = document.querySelector('[data-divValue="26"]');
// check.style.backgroundColor = "green";

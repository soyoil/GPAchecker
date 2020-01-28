interface grades {
  "A+": number;
  A: number;
  B: number;
  C: number;
  D: number;
}

const gradePointPairs: grades = { "A+": 4.3, A: 4, B: 3, C: 2, D: 0 };

const wait = (s: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, s);
  });
};

function calc() {
  const hoge = document.getElementById("main-frame-if") as HTMLIFrameElement;
  if (hoge === null || hoge.contentWindow === null) return;
  const classList = Array.from(
    hoge.contentWindow.document.getElementsByClassName("normal")[1].children[0]
      .children
  ).slice(1);
  let totalGrade = 0,
    totalPoint = 0,
    grade: string,
    point = 0;
  const earnedGrades: grades = { "A+": 0, A: 0, B: 0, C: 0, D: 0 };
  classList.forEach(tableRow => {
    if (~tableRow.children[3].innerHTML.indexOf("GPA計算対象外科目")) return;
    point = Number(tableRow.children[7].innerHTML);
    grade = tableRow.children[10].innerHTML.replace(/\s/g, "");
    if (!(grade in gradePointPairs) || point === NaN) return;
    earnedGrades[grade as keyof grades] += point;
  });
  let result = "",
    earn: keyof grades;
  for (earn in earnedGrades) {
    result += earn + ": " + earnedGrades[earn] + "単位\n";
    totalGrade += earnedGrades[earn];
    totalPoint += earnedGrades[earn] * gradePointPairs[earn];
  }
  result += "合計" + totalGrade + "単位，GPA" + totalPoint / totalGrade;
  alert(result);
}

window.onload = async () => {
  const frame = document.getElementById("main-frame-if") as HTMLIFrameElement;
  console.log(frame.contentWindow?.document.getElementsByClassName("normal"));
  await wait(1000);
  const rishuu = document.getElementById("main-frame");
  if (rishuu === null) return;
  const button: HTMLButtonElement = document.createElement("button");
  button.textContent = "暫定GPAを表示";
  button.type = "button";
  button.onclick = calc;
  rishuu.appendChild(button);
  const p: HTMLParagraphElement = document.createElement("p");
  p.innerHTML =
    "GPAを計算する前に「検索結果表示件数」の値を大きくして，履修した科目全てを表示させてください．この操作を行わないと，GPAが正しく計算されません．";
  rishuu.appendChild(p);
};

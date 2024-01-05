import './App.css';
import React, { useState } from 'react';


function App() {
  const [inputValue, setInputValue] = useState("0");
  // left, center, right
  // const [inputValueL, setInputValueL] = useState("0");
  // const [inputValueC, setInputValueC] = useState("");
  // const [inputValueR, setInputValueR] = useState("0");
  const [resultValue, setResultValue] = useState("0");
  // 입력 값의 변화를 감지 == 入力値の変化を感知
  const [changeInputValue, setChangeInputValue] = useState(false);
  // 一度でも計算できたか？ << 必要なものか？
  // 한 번이라도 계산이 되었는가? << 必要なものか？
  const [isChanged, setIsChanged] = useState(false);
  // console.log("app isChanged ", isChanged)

  let isFirstNum = inputValue.length === 1 && inputValue.charAt(inputValue.length - 1) === "0";
  
  const ivca = inputValue.charAt(inputValue.length - 1);
  // 二つ目の特集文字が入れば計算を実施する。
  const canInputChange = (e) => {

    // 특수문자인가?
    if (e === "*" || e === "+" || e === "-" || e === "/") {
      // console.log("tokusumoji IC 1 ", isChanged)
      setIsChanged(false)
      // console.log("tokusumoji IC 2 ", isChanged)
      // 직전에 입력된 값이 특수문자인가?
      if (ivca === "*" || ivca === "+" || ivca === "-" || ivca === "/") {
        // javascript slice 써서 제일 뒤 문자 지우고, 새로 들어온 특수문자로 바꿔적기.
        setInputValue(inputValue.slice(0, -1))
        setInputValue(inputValue => inputValue + e);
      }
      // 직전에 입력된 값이 특수문자가 아니라면 ?
      else {
        // 이전에 들어온 특수문자가 있는가?
        if (inputValue.indexOf("*") !== -1 || inputValue.indexOf("+") !== -1 || inputValue.indexOf("-") !== -1 || inputValue.indexOf("/") !== -1) {
          // 먼저 합치고
          calculation();
          // 합친 녀석 후에 특수문자를 등록해줌.
          setInputValue(inputValue => inputValue + e);
          setIsChanged(false)
          if (!changeInputValue) {
            setChangeInputValue(true)
          }
        } else { // 특수문자 등록
          setInputValue(inputValue => inputValue + e);
          if (!changeInputValue) {
            setChangeInputValue(true)
          }
        }
      }
    } else { // 일반숫자라면 ?
      // 한 번이라도 계산 된 적이 있는가?
      if (isChanged) {
        // console.log("moji IC 1 ", isChanged)
        if (ivca === "*" || ivca === "+" || ivca === "-" || ivca === "/") {
          setIsChanged(false)
        }
        // console.log("moji IC 2 ", isChanged)
        setInputValue("0")
        setResultValue("0")
        isFirstNum = true
        setIsChanged(false)
      }
      // 최초의 숫자인가?
      if (isFirstNum) {
        setInputValue(e)
        if (!changeInputValue) {
          setChangeInputValue(true)
        }
        isFirstNum = false
        return
      } else {
        setInputValue(inputValue => inputValue + e);
        if (!changeInputValue) {
          setChangeInputValue(true)
        }
      }
    } // console.log(e, ivca);
  };

  // 完了 // 未完了
  const calculation = () => {
    if (changeInputValue) {
      // console.log(eval(inputValue))
      setResultValue(eval(inputValue))
      setInputValue(String(eval(inputValue)))
      setChangeInputValue(false)
      // console.log("概算前 ", isChanged)
      if (ivca === "*" || ivca === "+" || ivca === "-" || ivca === "/") {
        setIsChanged(false)
      } else {
        setIsChanged(true)
      }
      // console.log("概算後 ", isChanged)
      return
    } else {
      // setResultValue("0");
      setResultValue(inputValue);
    }
  };

  // 完了 ?
  const deleteInputValue = () => {
    if (inputValue.length > 1) {
      setInputValue(inputValue.slice(0, -1))
      // 마지막 값이 음수여서 지울 때 마지막이 - 만 남거나하는 경우라면?
      if (inputValue.charAt(inputValue.length - 1) === "-") {
        setInputValue("0")
        setResultValue("0")
      }
    } else {
      if (inputValue.charAt(inputValue.length - 1) !== "0") setInputValue("0");
    }
  };

  return (
    <div className="App">
      <h3>電卓</h3>
      <hr />
      <hr />
      <section id="button">
        <article id="tokusu-moji">
          <p onClick={() => canInputChange("*")}>*</p>
          <p onClick={() => canInputChange("+")}>+</p>
          <p onClick={() => canInputChange("-")}>-</p>
          <p onClick={() => canInputChange("/")}>/</p>
        </article>
        <article id="button-789">
          <p onClick={() => canInputChange("7")}>7</p>
          <p onClick={() => canInputChange("8")}>8</p>
          <p onClick={() => canInputChange("9")}>9</p>
        </article>
        <article id="button-456">
          <p onClick={() => canInputChange("4")}>4</p>
          <p onClick={() => canInputChange("5")}>5</p>
          <p onClick={() => canInputChange("6")}>6</p>
        </article>
        <article id="button=123">
          <p onClick={() => canInputChange("1")}>1</p>
          <p onClick={() => canInputChange("2")}>2</p>
          <p onClick={() => canInputChange("3")}>3</p>
        </article>
        <article id="button-zero-enter">
          <p onClick={() => canInputChange("0")}>0</p>
          {/* 아무런 입력값이 없을 때 Enter를 두 번 입력했을 경우. */}
          <p onClick={() => calculation()}>Enter</p>
          <p onClick={() => deleteInputValue()}>delete</p>
        </article>
      </section>
        <hr />
        <div>入力値 : {inputValue}</div>
        <hr />
        <div>結果値 : {resultValue}</div>
    </div>
  );
}

export default App;

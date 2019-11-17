class CALCULATOR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayString: "",
      input: "0",
      answer: "",
      lastkey: "" };

    this.onMousePressed = this.onMousePressed.bind(this);
  }
  onMousePressed(event) {
    let key = event.target.innerText;
    this.mem(key);
  }
  mem(key) {
    this.saveKey(key);
    let displayString = this.state.displayString;
    let input = this.state.input;
    let lastNumber = displayString.length - 1;
    if (key == "AC") {
      this.refresh("", "0");
    } else if (key == "=" && !displayString.includes("=")) {
      let answer = this.calculate(displayString);
      this.refresh(displayString + key + answer, answer);
    } else if (key == ".") {
      if (displayString.length == 0) {
        this.refresh("0" + key, "0" + key);
      } else if (input.includes(".")) {
      } else {
        this.refresh(displayString + key, input + key);
      }
    } else if (this.state.lastkey == "=" && isNaN(key) && key != "=") {
      this.refresh(this.state.answer + key, key);
    } else if (isNaN(key)) {
      if (!isNaN(displayString[lastNumber])) {
        this.refresh(displayString + key, key);
      } else if (key == "-" && displayString[lastNumber] != "-") {
        this.refresh(displayString + key, key);
      } else if (isNaN(displayString[lastNumber]) && isNaN(displayString[lastNumber - 1])) {
        this.refresh(displayString.slice(0, lastNumber - 1) + key, key);
      } else if (isNaN(displayString[lastNumber])) {
        this.refresh(displayString.slice(0, lastNumber) + key, key);
      }
    } else if (key == "+" || key == "*" || key == "/" || key == "-") {
      this.refresh(displayString + key, key);
    } else if (input == "0" && input[0] == "0") {
      if (!input.includes(".")) {
        this.refresh(key, key);
      } else {
        this.refresh(displayString + key, input + key);
      }
    } else if (!isNaN(key)) {
      if (!isNaN(input)) {
        this.refresh(displayString + key, input + key);
      } else {
        this.refresh(displayString + key, key);
      }
    } else if (displayString.length > 30) {
      this.refresh("too many digits", "");
    } else if (displayString == "too many digits") {
      this.refresh(key, key);
    }
  }
  calculate(displayString) {
    let calcString = displayString;
    let number = "([-]?\\d+[.]?\\d*)";
    while (calcString.search(/[*]/) != -1) {
      calcString = calcString.replace(
      new RegExp(number + "[*]" + number),
      this.multiply);

    }
    while (calcString.search(/[/]/) != -1) {
      calcString = calcString.replace(
      new RegExp(number + "[/]" + number),
      this.divide);

    }
    while (calcString.search(/[+]/) != -1) {
      calcString = calcString.replace(
      new RegExp(number + "[+]" + number),
      this.add);

    }
    while (calcString.lastIndexOf("-") > 0) {
      calcString = calcString.replace(
      new RegExp(number + "[-]" + number),
      this.subtract);

    }
    this.saveAnswer(calcString);
    return calcString;
  }

  multiply(match, p1, p2) {
    return p1 * p2;
  }
  divide(match, p1, p2) {
    return p1 / p2;
  }
  add(match, p1, p2) {
    return parseFloat(p1) + parseFloat(p2);
  }
  subtract(match, p1, p2) {
    return p1 - p2;
  }

  refresh(displayString, key) {
    this.setState({
      displayString: displayString,
      input: key });

  }
  saveKey(key) {
    this.setState({
      lastkey: key });

  }
  saveAnswer(answer) {
    this.setState({
      answer: answer });

  }

  componentDidMount() {
    //calculator.addEventListener("mousedown", this.onMousePressed);
  }
  render() {
    return (
      React.createElement("div", { id: "wrapper" },
      React.createElement("div", { id: "calculator" },
      React.createElement("div", { id: "show" },
      React.createElement("div", { id: "alldisplay" }, this.state.displayString),
      React.createElement("div", { id: "display" }, this.state.input)),

      React.createElement("div", { id: "buttons" },
      React.createElement("button", { id: "one", onClick: this.onMousePressed }, "1"),


      React.createElement("button", { id: "two", onClick: this.onMousePressed }, "2"),


      React.createElement("button", { id: "three", onClick: this.onMousePressed }, "3"),


      React.createElement("button", { id: "four", onClick: this.onMousePressed }, "4"),


      React.createElement("button", { id: "five", onClick: this.onMousePressed }, "5"),


      React.createElement("button", { id: "six", onClick: this.onMousePressed }, "6"),


      React.createElement("button", { id: "seven", onClick: this.onMousePressed }, "7"),


      React.createElement("button", { id: "eight", onClick: this.onMousePressed }, "8"),


      React.createElement("button", { id: "nine", onClick: this.onMousePressed }, "9"),


      React.createElement("button", { id: "zero", onClick: this.onMousePressed }, "0"),


      React.createElement("button", { id: "add", onClick: this.onMousePressed }, "+"),


      React.createElement("button", { id: "subtract", onClick: this.onMousePressed }, "-"),


      React.createElement("button", { id: "multiply", onClick: this.onMousePressed }, "*"),


      React.createElement("button", { id: "divide", onClick: this.onMousePressed }, "/"),


      React.createElement("button", { id: "decimal", onClick: this.onMousePressed }, "."),


      React.createElement("button", { id: "clear", onClick: this.onMousePressed }, "AC"),


      React.createElement("button", { id: "equals", onClick: this.onMousePressed }, "="))),




      React.createElement("p", null, "made by Robert M\xFCller")));


  }}

ReactDOM.render(React.createElement(CALCULATOR, null), document.getElementById("App"));
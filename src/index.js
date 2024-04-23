import React from "react";
import ReactDOM from "react-dom";

class Comp extends React.Component {

    render() {
        return <h2>Hi, I have changed!</h2>;
    }
}

ReactDOM.render(<Comp />, document.getElementById('index'));

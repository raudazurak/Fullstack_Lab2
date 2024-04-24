import React from "react";
import ReactDOM from "react-dom";
import Table from "./table";

class Comp extends React.Component {

    render() {
        return <Table/>
    }
}

ReactDOM.render(<Comp />, document.getElementById('index'));

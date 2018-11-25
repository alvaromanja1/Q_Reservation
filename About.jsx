import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';

//Comando a ejecutar: npm run build:dev
export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numUsers: ""
        };
    }
    componentDidMount() {
        axios.get('http://localhost:2000/numUsers')
          .then(res => {
            const persons = res.data;
            this.setState({numUsers: persons});
          })
    }
    
    render() {
        return (
            <div className="About">
                <h1>Prerequisites: Google Chrome or Mozilla Firefox</h1> 
                <div id="numUsers">We are {this.state.numUsers}</div>
            </div>
        );
    }
}
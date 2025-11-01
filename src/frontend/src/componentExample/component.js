import { Component } from 'react';
import './component.css';

class ComponentExample extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // cannot add more states after, this is only time
            inputText: "" //Cool input text
        }
    }

    textChange = (e) => { //the => saves a lot of time and work
        this.setState({
            inputText: e.target.value
        });
        console.log(e.target.value);
    }

    alertMe = () => {
        alert(this.state.inputText);
    }
    
    render() {
        return (
            <div>
                <input placeholder={this.props.placeholder} onChange={this.textChange}></input>
                <button onClick={this.alertMe}>Click Me!</button>
            </div>
        )
    }
}

export default ComponentExample;
import React, { Component } from 'react';

class Art extends Component {
    state = {
        index: 0
    }

    reload = () => {
        this.setState({
            index: this.state.index + 1
        });
        console.log(this.state.index)
    }
    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.reload}>New Image</button>
                <iframe
                    src="https://editor.p5js.org/onlygenerated/embed/s-RYEv5kw"
                    style={{ width: '200%', height: '800px' }}
                    key={this.state.index}
                    title="generative art"
                >
                </iframe>
            </div>
        )
    }

}
export default Art;
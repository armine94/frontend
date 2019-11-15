import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../css/player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            play: true,
        }
        this.onClose.bind(this);
    }
    onClose = (e) => {
        this.setState({ play: false })
        this.props.onClose && this.props.onClose(e);
    }
    render() {
        if (this.props.show) {
            return null;
        }
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={this.props.videoUrl}
                    width='80%'
                    height='80%'
                    playing={this.state.play}
                />
                <button onClick={this.onClose}>stop</button>
            </div>
        )
    }
}

export { Player };
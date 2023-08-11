import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import first from '../assets/first.json';
import second from '../assets/second.json';
import third from '../assets/third.json';

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef(); // initialize your ref
    this.value = Math.floor(Math.random() * 3) + 1;
  }

  render() {
    return (
      <Player
        className='pt-6'
        ref={this.player} // set the ref to your class instance
        autoplay={true}
        loop={true}
        controls={true}
        speed={0.5}
        src={this.value === 2 ? first : this.value === 1 ? second : third}
        style={{ height: '50%', width: '50%' }}
      ></Player>
    );
  }
}

export default Spinner;

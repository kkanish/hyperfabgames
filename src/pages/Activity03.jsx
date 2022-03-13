import ReactDOM from 'react-dom';
import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import img1 from '../assets/images/box-item/card-item-10.jpg'
import img2 from '../assets/images/box-item/image-box-10.jpg'
import img3 from '../assets/images/box-item/image-box-11.jpg'
import img4 from '../assets/images/box-item/image-box-21.jpg'
import img5 from '../assets/images/box-item/image-box-6.jpg'
import Spinner from '../components/games/spinner';

const Activity03 = () => {
    
const rootElement = document.getElementById('root')
  
function RepeatButton(props) {
  return (
    <button 
      aria-label='Play again.' 
      id='repeatButton' 
      onClick={props.onClick}>
    </button>
  );
}

function WinningSound() {
  return (
  <audio autoplay="autoplay" className="player" preload="false">
    <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
  </audio>  
  );
}

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }  

  handleClick() { 
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
  }

  static loser = [
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
  ];

  static matches = [];

  finishHandler(value) {
    Apps.matches.push(value);  

    if (Apps.matches.length === 3) {
      const { winner } = this.state;
      const first = Apps.matches[0];
      let results = Apps.matches.every(match => match === first)
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    Apps.matches = [];
  }

  render() {
    const { winner } = this.state;
    const getLoser = () => {       
      return Apps.loser[Math.floor(Math.random()*Apps.loser.length)]
    }
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />
    }
    
    if (winner) {
      winningSound = <WinningSound />
    }

    return (
      <div>
        {winningSound}
        <h1 style={{ color: 'white'}}>
          <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
        </h1>

        <div className={`spinner-container`}>
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" />
          <div className="gradient-fade"></div>
        </div>
        {repeatButton}          
      </div>
    );
  }
}  
  


function runApps() {
//   ReactDOM.render(
//     <Apps />,
//     rootElement
//   )
}
  
runApps();
    const [dataBox] = useState(
        [
            {
                img: img1,
                title: 'Monica Lucas',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-1'
            },
            {
                img: img2,
                title: 'Wow! That Brain Is Floating',
                status: '10 editions listed by',
                author: 'Meowbids',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-2'
            },
            {
                img: img3,
                title: 'Erotic 35mm And Polaroid Photography',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-3'
            },
            {
                img: img4,
                title: 'Our Journey Start',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-4'
            },
            {
                img: img5,
                title: 'Skrrt Cobain Official',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-5'
            },
            {
                img: img1,
                title: 'Monica Lucas',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-1'
            },
            {
                img: img2,
                title: 'Wow! That Brain Is Floating',
                status: '10 editions listed by',
                author: 'Meowbids',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-2'
            },
            {
                img: img3,
                title: 'Erotic 35mm And Polaroid Photography',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-3'
            },
            {
                img: img4,
                title: 'Our Journey Start',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-4'
            },
            {
                img: img5,
                title: 'Skrrt Cobain Official',
                status: 'started following',
                author: 'Gayle Hicks',
                time: 'At 2:30 PM on 19th June, 2021',
                icon: 'icon-5'
            },
        ]);
    const [dataFilter] = useState(
        [
            {
                icon: 'icon-fl-sort-filled',
                name: 'Listings'
            },
            {
                icon: 'icon-fl-heart-filled',
                name: 'Like'
            },
            {
                icon: 'icon-fl-buy',
                name: 'Purchases'
            },
            {
                icon: 'icon-fl-discount',
                name: 'Sales'
            },
            {
                icon: 'icon-fl-logout',
                name: 'Transfer'
            },
            {
                icon: 'icon-fl-star',
                name: 'Burns'
            },
            {
                icon: 'icon-fl-credit-card',
                name: 'Bids'
            },
            {
                icon: 'icon-fl-users-filled',
                name: 'Followings'
            },
        ]
    )

    const [visible , setVisible] = useState(5);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 5);
    }
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Activity 3</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Activity</Link></li>
                                    <li>Activity 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <div id="gameSpinner" name="gameSpinner"></div>
            
            <section className="tf-activity s1 tf-section">
                <div className="themesflat-container">
                <Apps />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Activity03;

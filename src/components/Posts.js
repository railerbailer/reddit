import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import Swipeable from 'react-swipeable'
import { Icon } from 'antd';
import 'antd/dist/antd.css';
import ArrowKeysReact from 'arrow-keys-react';
import ReactPlayer from 'react-player'



//Problemet med video är att gifv inte fungerar och man måste göra den till mp4/webm i slutet av urlen från reddit
// 
const history=[]


 // <video controls ref={(v)=>{this.vidRef=v}} preload="metadata" loop style={{display: this.checkVideo(post)===true?'none': 'flex', margin: 'auto', backgroundColor: 'blue'  }} >
 //                                            <source src={post} type="video/mp4"/>
 //                                            <source src={post} type="video/webm"/>

 //                                      <button onClick={()=>this.playVideo.bind(this)} style={{zIndex: 9999, position: 'absolute', height: '100px', width: '100px', backgroundColor: 'red' }}>PLAY</button>
 //                                          </video>  
                                          

// function SampleNextArrow(props) {
//   const {className, style, onClick} = props
//   return (
//     <div
//       className={className}
//       style={{...style, display: 'block', background: 'red'}}
//       onClick={onClick}
//     ></div>
//   );
// }

// function SamplePrevArrow(props) {
//   const {className, style, onClick} = props
//   return (
//     <div
//       className={className}
//       style={{...style, display: 'block', background: 'green'}}
//       onClick={onClick}
//     ></div>
//   );
// }


export default class Posts extends Component {
  constructor(props){
    super(props);
    this.state={
      playing: false,
      jsonman: this.props.posts
    }
  }

componentDidMount(){
  
 
}

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("...", e, deltaX, deltaY, absX, absY, velocity)
  }
  
  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
  }
  
  swiped(e, deltaX, deltaY, isFlick, velocity) {

    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }
  
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
  }

checkURL(url) {

    return(url.match(/\.(jpeg|jpg|gif|png|gifv|webm|mp4)$/) != null);
}



checkVideo(url){
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);

}

checkRemoved(url){
    return(url.match(/removed\.(jpeg|jpg|gif|png)$/) != null);
}


shuffleArray(array) {
 let random = Math.floor(Math.random() * array.length);

 history.push(array[random])
 console.log('historyinfunction',history)
  return array[random]  
  }
  
  playPause = () => {
    this.setState({ playing: !this.state.playing })
    console.log(this.state.playing)
  }
onBuffer(){
  return (<Icon type="loading" />)
}
  render() {
    console.log('prevprops',this.props.prevProps)

    
    
const {swipeChange, isFetching, posts} = this.props

      ArrowKeysReact.config({
     
     
      right: () => {

        
        console.log('right key detected.');
      },
      up: () => {

        swipeChange(this.shuffleArray(this.props.postOptions))
        console.log('up key detected.');
      },
      down: () => {
        
        
        if (history.length>1){
        swipeChange(history[history.length-2])
        console.log('down key detected.', history[history.length-2]);
        
        }
        else {
          console.log('else')
        }
      }
    });
    var settings = {
    
    lazyLoad: true,
    arrows:false,
    infinite: true,
    speed: 200,
    beforeChange: function (currentSlide, nextSlide) {
        console.log('before change', currentSlide, nextSlide);
      },
      afterChange: function (currentSlide) {
        console.log('after change', currentSlide);
      },
   
   
    
    
      



    };




let array=[]
     

     posts.map(
  (post, i) => {if(this.checkURL(post.url)===true){
      
      let editedUrl=post.url.replace(".gifv",  ".mp4")
     // console.log('edited', editedUrl)
     array.push(editedUrl)
     }
    return (array)}
) 



console.log(this.props.posts)
console.log(this.state.jsonman)


                                  
                     
  const ThePosts= array.map((post, i) =>
                                
                                 
                                <div key={i} style={{height: '100vh'}}>
                                    
                                  <img className="ImageContainer"src={post} style={{display: this.checkVideo(post)===false?'none': 'flex', margin: 'auto'}} alt="Removed" />  
                                                                     
                                        <button className="PlayButton" onClick={this.playPause} style={{display: this.checkVideo(post)===true?'none': 'flex', margin: 'auto'}}>
{                                          <ReactPlayer loop className="react-player" playing={this.state.playing} url={post}/>
                                        }                                        </button>
                                </div>
                                  
 
                              
                              
                             
                            ) 

             return (
        <div style={{minHeight: '100vh'}}>
           <div>
            <Icon type="up" />
            </div>


            <Swipeable  {...ArrowKeysReact.events} 
            flickThreshold={0.1}
                    onSwiping={this.swiping}
                    onSwiped={this.swiped}
                    onSwipedUp={()=>swipeChange(this.shuffleArray(this.props.postOptions))} 
                    onSwipedDown={()=>swipeChange(this.shuffleArray(this.props.postOptions))} 
            >
                  
 
                    <Slider {...settings} >


                  {isFetching && posts.length === 0 && <Icon type="loading" />}
                  {!isFetching && posts.length === 0 && <Icon type="loading" style={{ fontSize: 36}} />}
                  {posts.length > 0 &&
                        ThePosts
                       }
              
                    </Slider>

            <div className="left">
              <Icon type="left" />
            </div>

            <div className="right">
              <Icon type="right" />
              
            </div>
      <div>
              <Icon type="down" />
              
            </div>
            </Swipeable>
            
       
     
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
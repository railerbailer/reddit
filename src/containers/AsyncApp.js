import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'
// import Picker from '../components/Picker'
import Posts from '../components/Posts'
import TestSlider from '../components/TestSlider'
import '../App.css';
import { Icon } from 'antd';
import 'antd/dist/antd.css';
import {postsArray} from '../constants'

class AsyncApp extends Component {
  constructor(props) {
    super(props)

    this.state={
      postsArray:[]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)


  }

  componentWillMount() {

    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))

  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div className='Wrapper'>
        
       
       
            <Posts 
            title={selectedSubreddit}
            swipeChange={this.handleChange} posts={posts}
            postOptions={postsArray}
        /> 
          
       
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)






        // {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        // {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        // {posts.length > 0 &&
        //   <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        //     <Posts 
        //     title={selectedSubreddit}
        //     swipeChange={this.handleChange} posts={posts}
        //     postOptions={this.state.postsArray}
        // /> 
        //   </div>}
        //   <div className='Footer'>
        //            <p>
        //           {lastUpdated &&
        //             <span>
        //               Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
        //               {' '}
        //             </span>}
        //           {!isFetching &&
        //             <a onClick={this.handleRefreshClick}>
        //               Refresh
        //             </a>}
        //         </p>
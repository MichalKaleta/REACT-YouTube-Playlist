import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchVideos} from '../actions/index';

 class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state ={ query: "supaplex"  }  
 }

  onFormSubmit(event){
    event.preventDefault();
    const query = event.currentTarget.firstChild.value;
    this.setState({query})
    this.props.fetchVideos(this.state.query)
  }

  render (){
    return(
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <input type="text"/>
        <button className='btn btn-primary' type='submit'>Search</button>
      </form> 
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchVideos},dispatch)
}

export default connect(null,mapDispatchToProps)(SearchBar)

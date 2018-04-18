import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchVideos} from '../actions/index';

var input;

 class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state ={ query: "supaplex"  }  
 }

componentDidMount(){
  input = document.getElementById('search-video');
  console.log(input)
}

  onFormSubmit(event){
    event.preventDefault();
    const query = input.value;
    this.setState({query},()=>{
      this.props.fetchVideos(this.state.query)
    })
  }

  render () {
    return (
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="input-group">
            <input type="text" id="search-video" className="form-control rounded-0" />
            <div className="input-group-append">
              <button className="btn btn-outline-danger rounded-0" type="submit">
                  SEARCH
              </button>
          </div>
        </div>
      </form> 
  
     )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchVideos},dispatch)
}

export default connect(null,mapDispatchToProps)(SearchBar)

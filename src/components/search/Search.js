import React, { Component } from "react";
import Axios from "axios";
import ImageResults from "../imageResults/imageResults";
import InfiniteScroll from "react-infinite-scroll-component";

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            searchText: "",
            images: [],
            apiKey: "2f5f7927b77994078ec5dbf7ff61e48b",
            sig: "9e6f84f8c7177719",
            prevSearchTerm: [],
            page: 1,
            
          };
    
        this.clearItem = this.clearItem.bind(this);
    }
  

  apiCall = (apiUrl) => {
    Axios.get(apiUrl)
    .then((res) => this.setState({ images: [...this.state.images, ...res.data.photos.photo] }))
    .catch((err) => console.log(err));
  }

  onTextChange = (e) => {
      this.setState({
          searchText: e.target.value,
          page: 1
      })
      
  };

  //for showing default images on app

  componentDidMount(){
      let allImageApiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&page=${this.state.page}&format=json&nojsoncallback=1&text=cats&extras=url_o`
    this.apiCall(allImageApiUrl)
  }

//show images after submit only


  handleSubmit = (e) => {
    e.preventDefault();
    let searchApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&text=${this.state.searchText}&page=${this.state.page}&format=json&nojsoncallback=1`;
    
    this.setState({
      prevSearchTerm: [...this.state.prevSearchTerm, this.state.searchText],
      searchText: "",
      images: []
    });
    this.apiCall(searchApiUrl);
  };

  clearItem(){
      this.setState({
          prevSearchTerm: []
      })
  }

//function for pagging i.e showing infinite image on a page

  fetchMoreData = () => {
      let pageCount = this.state.page + 1;
        let allImageApiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&page=${pageCount}&format=json&nojsoncallback=1&text=cats&extras=url_o`
        if(this.state.searchText){
            allImageApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&text=${this.state.searchText}&page=${pageCount}&format=json&nojsoncallback=1`
        }
       
        this.apiCall(allImageApiUrl)
        this.setState({
            page: pageCount,
            
        })
  };
  render() {
    return (
      <div>
          <div className="flex">
          <form onSubmit={this.handleSubmit}>
        <input className="searchbox"
          type="text"
          style={{
            backgroundColor: "black",
            color: "white",
            // marginLeft: 570,
            // marginTop: 100,
            paddingTop: 20,
            paddingLeft: 70,
            fontSize: 30,
            borderTopStyle: "hidden",
            borderRightStyle: "hidden",
            borderLeftStyle: "hidden",
            outline: "none",
            borderBottomStyle: "groove",
          }}
          placeholder="Search for images"
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
        />
        </form>
          </div>

  
        <div className="prevSearch">
          {
              this.state.prevSearchTerm.map((item, index)=>(
                  <li className="Suggest" key={index}>{item}</li>
              ))
          }
          <button className="button" onClick={this.clearItem}>Clear</button>
        </div>
        <br />
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
        </InfiniteScroll>
        
      </div>
    );
  }
}

export default Search;

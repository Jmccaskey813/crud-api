import React, { Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    userInput: "",
    posts: [],
  };

  clickMe = () => {
    fetch("http://localhost:4000")
      .then((response) => response.json())
      .then((results) => console.log(results));
  };

  updateState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  serverRequest = (event) => {
    let currentPost = this.state.userInput;
    let completePosts = this.state.posts;
    completePosts.push(currentPost);

    this.setState({
      userInput: "",
      posts: completePosts,
    });

    console.log(this.state.posts);
    event.preventDefault();
  };

  renderPosts = () => {
    this.state.posts.map((post) => (
      <React.Fragment>
        <p className="container-sm">{post}</p>
        <button className="btn">delete</button>
        <button className="btn">edit</button>
        <span>{`created at ${Date()}`}</span>
      </React.Fragment>
    ));
  };
  render() {
    return (
      <div className="App">
        <h1 className="border">Blog </h1>
        <form
          className="container"
          onSubmit={(event) => this.serverRequest(event)}
        >
          <textarea
            placeholder="write something..."
            name="userInput"
            onChange={(e) => this.updateState(e)}
            value={this.state.userInput}
          ></textarea>
          <br></br>
          <button className="btn btn-primary">publish</button>
        </form>
        <div className="container">
          {this.state.posts.map((post) => (
            <div className="border border-bold" key={this.state.posts[post]}>
              <br />
              <hr />
              <p className="container-sm">{post}</p>
              <button className="btn btn-danger">delete</button>
              <button className="btn btn-primary">edit</button>
              <br />
              <span>{`Created On ${Date()}`}</span>
              <hr />
            </div>
          ))}
        </div>
        <button onClick={() => this.clickMe()} className="btn btn-danger">
          click me and check the console
        </button>
      </div>
    );
  }
}

export default App;

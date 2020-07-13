import React, { Component } from "react";
import SearchBar from "./SearchBar";
import unslash from "../api/unslash";
import ImageList from "./ImageList";
import Loader from "./Loader";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      term: "",
      page: 1,
      total: 0,
      loader: false,
    };
  }

  getPhotos = async () => {
    this.setState({ loader: true });
    const { images, term, page } = this.state;

    const response = await unslash.get("/search/photos", {
      params: { query: term, per_page: 20, page: page },
    });

    if (!response.data) {
      return false;
    }

    this.setState({
      images: images.concat(response.data.results),
      page: page + 1,
      total: response.data.total,
      loader: false,
    });
  };

  handleSubmit = async (term) => {
    await this.setState({
      term: term,
      page: 1,
    });

    this.getPhotos();
  };

  componentDidMount() {
    window.addEventListener("scroll", async () => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight,
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        this.getPhotos();
      }
    });
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar onSubmit={this.handleSubmit} />

        <div style={{ marginBottom: "1rem" }} className="ui large label">
          Found: {this.state.total} images
        </div>

        <ImageList images={this.state.images} />

        {this.state.loader ? <Loader /> : ""}
      </div>
    );
  }
}

export default App;

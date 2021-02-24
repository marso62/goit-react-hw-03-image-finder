import React, { Component } from "react";

import Searchbar from "./component/Searchbar";
import Loader from "./component/Loader";
import ImageGallery from "./component/ImageGallery";
import Button from "./component/Button";
import Modal from "./component/Modal";

import imagesAPI from "./component/services";

import style from "./styles.css";

export default class App extends Component {
  state = {
    arrayImages: [],
    searchQuery: "",
    BigImage: "",
    page: 1,

    error: null,
    loading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    imagesAPI
      .fetchImagesWithQuery(searchQuery, page)
      .then((arrayImages) =>
        this.setState((prevState) => ({
          arrayImages: [...prevState.arrayImages, ...arrayImages],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, arrayImages: [] });
  };

  onClickModal = ({ target }) => {
    this.setState({ showModal: true, BigImage: target.srcset });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { arrayImages, loading, showModal, BigImage } = this.state;

    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        <ImageGallery
          arrayImages={arrayImages}
          imageClick={this.onClickModal}
        />
        {loading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={BigImage} alt={arrayImages.tags} />
          </Modal>
        )}

        {arrayImages.length > 0 && !loading && (
          <Button onClick={this.fetchImages} />
        )}
      </div>
    );
  }
}

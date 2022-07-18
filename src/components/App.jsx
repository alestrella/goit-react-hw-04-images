import { Component } from 'react';
import api from 'services/api';
import { mapper } from 'helpers/mapper';
import Button from './Button';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Box from './Box';
import Modal from './Modal';

export class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    status: 'idle',
    bigImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, items } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }

    if (prevState.items !== items && page !== 1) {
      window.scrollBy({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  getImages = async (query, page) => {
    this.setState({ status: 'pending' });

    try {
      const hits = await api.fetchImagesWithQuery(query, page);

      if (!hits.length) {
        throw new Error();
      }

      this.setState({
        items: [...this.state.items, ...mapper(hits)],
        status: 'resolved',
      });
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, items: [] });
  };

  handleOpenModal = image => this.setState({ bigImage: image });

  handleCloseModal = () => this.setState({ bigImage: null });

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { items, status, bigImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <Box
          display="grid"
          gridTemplateColumns="1fr"
          gridGap={16}
          py={32}
          as="main"
        >
          {status === 'idle' && (
            <Box
              m={0}
              pt={50}
              fontSize="24px"
              letterSpacing="0.08em"
              fontWeight="bold"
              textAlign="center"
              as="p"
            >
              Let's find the perfect image for you
            </Box>
          )}

          {status === 'rejected' && (
            <Box
              m={0}
              pt={50}
              fontSize="24px"
              letterSpacing="0.08em"
              fontWeight="500"
              textAlign="center"
              color="red"
              as="p"
            >
              Whoops, something went wrong. Please try again.
            </Box>
          )}
          {items.length !== 0 && (
            <ImageGallery images={items} onClick={this.handleOpenModal} />
          )}

          {status === 'pending' && <Loader />}

          {status === 'resolved' && (
            <Button caption="Load more" handleClick={this.handleLoadMore} />
          )}
          {bigImage && (
            <Modal onClose={this.handleCloseModal} imageURL={bigImage} />
          )}
        </Box>
      </>
    );
  }
}

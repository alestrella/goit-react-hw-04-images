import { useState, useEffect } from 'react';
import api from 'services/api';
import { mapper } from 'helpers/mapper';
import Button from './Button';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Box from './Box';
import Modal from './Modal';
import { usePreviousValue } from 'hooks/usePreviousValue';

const App = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [bigImage, setBigImage] = useState(null);

  const prePage = usePreviousValue(page);
  const preItems = usePreviousValue(items);

  const getImages = async (query, page) => {
    setStatus('pending');

    try {
      const hits = await api.fetchImagesWithQuery(query, page);

      if (!hits.length) {
        throw new Error();
      }
      setItems(items => [...items, ...mapper(hits)]);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (prePage !== page && page !== 1) {
      getImages(query, page);
    }

    if (preItems !== items && prePage !== 1) {
      window.scrollBy({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [items, page, preItems, prePage, query]);

  const handleSearchSubmit = async query => {
    if (query === '') {
      return;
    }

    setQuery(query);
    setPage(1);
    setItems([]);

    getImages(query, 1);
  };

  const handleOpenModal = image => setBigImage(image);

  const handleCloseModal = () => setBigImage(null);

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
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
          <ImageGallery images={items} onClick={handleOpenModal} />
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
          <Button caption="Load more" handleClick={handleLoadMore} />
        )}
        {bigImage && <Modal onClose={handleCloseModal} imageURL={bigImage} />}
      </Box>
    </>
  );
};

export default App;

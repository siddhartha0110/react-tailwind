import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import Skeleton from 'react-loading-skeleton';
import ImageSearch from './components/ImageSearch';
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAYAPI_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(response => response.json())
      .then(data => {
        setImages(data.hits);
        setisLoading(false);
      })
      .catch(error => console.log(error))
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch textSearch={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-center text-6xl mx-auto mt-32">No Images Found</h1>}
      {isLoading ? <Skeleton color="#202020" highlightColor="#444" count={5} />
        : <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>}
    </div>
  );
}

export default App;

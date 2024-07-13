import React from 'react';
import '../styles/gallery.css';

const images = [
    '/img-1.jpg',
    '/img-2.jpg',
    '/img-3.jpg',
    '/img-4.jpg',
    '/img-5.jpg',
    '/img-6.jpg',
];

const Gallery = () => {
    return (
        <div className="gallery">
            {images.map((src, index) => (
                <div key={index} className="image-box">
                    <img src={src} alt={`Gallery Image ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default Gallery;

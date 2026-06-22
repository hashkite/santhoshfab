import React from 'react';
import './style.scss';

export function MediaRenderer({ media, className = '' }) {
  if (!media) return null;

  const { type, src, alt, name, width, height } = media;

  if (type === 'image') {
    return (
      <img
        src={src}
        alt={alt || name || 'Media'}
        width={width}
        height={height}
        className={`media-renderer__image ${className}`}
      />
    );
  }

  if (type === 'video') {
    return (
      <video
        src={src}
        controls
        width={width}
        height={height}
        className={`media-renderer__video ${className}`}
        aria-label={alt || name || 'Media video'}
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  return null;
}

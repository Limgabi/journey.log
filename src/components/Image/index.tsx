import { useState } from 'react';

import NextImage, { ImageProps } from 'next/image';

export default function Image({ ...props }: ImageProps) {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return (
    <NextImage
      {...props}
      src={
        isError
          ? `https://via.placeholder.com/${props.width}x${props.height}.png?text=Image+Not+Found`
          : props.src
      }
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      loading="lazy"
      onError={handleError}
    />
  );
}

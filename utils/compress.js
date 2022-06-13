import compressImage from 'browser-image-compression';

export const compressFile = async (file, maxSizeMB) => {
  // not necessary to compress file if it's less than max size
  if (file.size / 1024 / 1024 < maxSizeMB) {
    return file;
  }

  try {
    return compressImage(file, { maxSizeMB, useWebWorker: false });
  } catch (err) {
    console.error(err);

    return file;
  }
};

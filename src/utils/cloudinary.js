import axios from "axios";
import imageCompression from "browser-image-compression";

export const getCloudImgURI = async (
  file,
  maxWidthOrHeight = 720,
  folder = "/temp/e-kart"
) => {
  const uploadPreset = process.env.REACT_APP_URI_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.REACT_APP_URI_CLOUDINARY_CLOUD_NAME;

  // console.log("originalFile instanceof Blob", file instanceof Blob); // true
  // console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: maxWidthOrHeight,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    // console.log(
    //   "compressedFile instanceof Blob",
    //   compressedFile instanceof Blob
    // ); // true
    // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", uploadPreset);
    if (folder.length > 1) {
      // console.log('satisfied');
      formData.append("folder", folder);
    }

    const data = axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const urlToObject = async (imageURL) => {
  const response = await fetch(imageURL);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });

  return file;
};

// export const temp = async (imageURL) => {
//   const imgFile = await urlToObject(imageURL);

//   const d = await getCloudImgURI(imgFile);

//   console.log("here: ", d);
// };

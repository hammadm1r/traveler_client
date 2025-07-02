import { axiosClient } from "./axiosClient"; // adjust path if needed
import axios from "axios";

import imageCompression from "browser-image-compression";

export const uploadImagesToCloudinary = async (files) => {
  // 1️⃣ Get signature and Cloudinary upload config from backend
  const {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder,
  } = (await axiosClient.get("/post/signature")).data.result.data;

  const uploadedMedia = [];

  for (const file of files) {
    // Compress the file first
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // max 1 MB
      maxWidthOrHeight: undefined, // keep original dimensions
      useWebWorker: true,
      initialQuality: 0.85, // 85% quality
    });

    const formData = new FormData();
    formData.append("file", compressedFile); // use compressed file here
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    // 2️⃣ Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    // 3️⃣ Push uploaded result
    uploadedMedia.push({
      url: data.secure_url,
      publicId: data.public_id,
    });
  }

  return uploadedMedia;
};

export const uploadProfilePictureToCloudinary = async (file) => {
  // Compress the profile picture before upload
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,            // max size 1MB (adjust as needed)
    maxWidthOrHeight: 800,   // resize to max 800px width or height
    useWebWorker: true,
    initialQuality: 0.85,    // quality 85%
  });

  // 1. Get signature & params from backend
  const sigRes = await axiosClient.get("/auth/signature");
  const { signature, timestamp, cloudName, apiKey } = sigRes.data;

  // 2. Prepare form data for Cloudinary
  const formData = new FormData();
  formData.append("file", compressedFile);  // use compressed file here
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", "Profile_Pictures");

  // 3. Upload directly to Cloudinary
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const uploadRes = await axios.post(cloudinaryUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return uploadRes.data; // contains `public_id` and `secure_url`
};

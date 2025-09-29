const UploadCoudiary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog_cousse");
  const uploadResponse = await fetch(
    "https://api.cloudinary.com/v1_1/drz5kdrm5/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const uploadData = await uploadResponse.json();
  return uploadData.secure_url;
};

export default UploadCoudiary;

import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";
import axios from "axios";

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map(file => {
      return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "iftryqam");

        axios
          .post(
            "https://api.cloudinary.com/v1_1/dzdrl3sx7/image/upload",
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
          .then(res => resolve(res))
          .catch(error => reject(error));
      });
    })
  );

  callback(
    res.map(item => ({
      url: item.data.secure_url
    }))
  );
};

const onUpload = file => {
  return new Promise(resolve => {
    onUploadImg([file], uploadedFiles => {
      const url = uploadedFiles[0]?.url;
      if (url) {
        let image = new Image();
        image.src = url;
        image.onload = () => {
          resolve(url);
        };
      } else {
        toast.error("Error uploading image. Please try again.");
        resolve(file);
      }
    }).catch(error => {
      toast.error(error.message || "Error uploading image. Please try again.");
      resolve(file);
    });
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: file => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  }
});

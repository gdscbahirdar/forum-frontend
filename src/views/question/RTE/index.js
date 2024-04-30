import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import axios from "axios";

const RichTextEditor = props => {
  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map(file => {
        return new Promise((rev, rej) => {
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
            .then(res => rev(res))
            .catch(error => rej(error));
        });
      })
    );

    callback(
      res.map(item => {
        return {
          url: item.data.secure_url
        };
      })
    );
  };
  return (
    <div className="border border-slate-300 rounded-md w-">
      <MdEditor
        language="en-US"
        toolbarsExclude={["github", "catalog", "htmlPreview"]}
        onUploadImg={onUploadImg}
        {...props}
      />
    </div>
  );
};

export default RichTextEditor;

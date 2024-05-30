import React from "react";
import { fileIcons, defaultIcon, shortenedFileIcons } from "./fileIcons";

const BYTE = 1000;
const getKB = bytes => Math.round(bytes / BYTE);

const FileItem = props => {
  const { file, children, type } = props;

  const { file_type, file_name, file_size, is_new, file: fileUrl } = file;

  const renderThumbnail = () => {
    const isImageFile =
      file_type.split("/")[0] === "image" ||
      ["PNG", "JPEG", "GIF"].includes(file_type);

    if (isImageFile) {
      return (
        <img
          className="upload-file-image"
          src={is_new ? URL.createObjectURL(file.file) : fileUrl}
          alt={`file preview ${file_name}`}
        />
      );
    }

    return fileIcons[file_type] || shortenedFileIcons[file_type] || defaultIcon;
  };

  const downloadFile = () => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.target = "blank";
    a.download = file_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="upload-file">
      <div className="flex">
        <div className="upload-file-thumbnail">{renderThumbnail()}</div>
        <div className="upload-file-info">
          <h6 className="upload-file-name">{file_name}</h6>
          <span className="upload-file-size">{getKB(file_size)} kb</span>
        </div>
      </div>
      <div className="upload-file-remove">
        {!is_new && type !== "edit" && (
          <button onClick={downloadFile} className="btn btn-download">
            Download
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default FileItem;

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
          alt=""
        />
      );
    }

    return fileIcons[file_type] || shortenedFileIcons[file_type] || defaultIcon;
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
          <a href={fileUrl} download target="_blank" rel="noreferrer">
            <button className="btn btn-download">View</button>
          </a>
        )}
      </div>
      {children}
    </div>
  );
};

export default FileItem;

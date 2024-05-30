import React from "react";
import { VscFilePdf, VscFileZip, VscFile, VscFileCode } from "react-icons/vsc";
import {
  BsFileImage,
  BsFileEarmarkText,
  BsFileEarmarkMusic,
  BsFileEarmarkPlay,
  BsFileEarmarkPdf,
  BsFileExcel,
  BsFileEarmarkWord
} from "react-icons/bs";

const FileIcon = ({ children }) => {
  return <span className="text-4xl">{children}</span>;
};

export const fileIcons = {
  "application/pdf": (
    <FileIcon>
      <VscFilePdf />
    </FileIcon>
  ),
  "application/msword": (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  "application/vnd.ms-excel": (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  "application/vnd.ms-powerpoint": (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  "text/plain": (
    <FileIcon>
      <BsFileEarmarkText />
    </FileIcon>
  ),
  "text/csv": (
    <FileIcon>
      <BsFileEarmarkText />
    </FileIcon>
  ),
  "image/jpeg": (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  "image/png": (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  "image/gif": (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  "image/bmp": (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  "image/tiff": (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  "application/zip": (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  "application/x-tar": (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  "application/x-rar-compressed": (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  "application/x-7z-compressed": (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  "video/mp4": (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  "video/x-msvideo": (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  "video/x-matroska": (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  "video/webm": (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  "audio/mpeg": (
    <FileIcon>
      <BsFileEarmarkMusic />
    </FileIcon>
  ),
  "audio/ogg": (
    <FileIcon>
      <BsFileEarmarkMusic />
    </FileIcon>
  ),
  "audio/wav": (
    <FileIcon>
      <BsFileEarmarkMusic />
    </FileIcon>
  )
};

export const defaultIcon = (
  <FileIcon>
    <VscFile />
  </FileIcon>
);

export const shortenedFileIcons = {
  PDF: (
    <FileIcon>
      <BsFileEarmarkPdf className="text-red-500" />
    </FileIcon>
  ),
  DOC: (
    <FileIcon>
      <BsFileEarmarkWord className="text-blue-500" />
    </FileIcon>
  ),
  DOCX: (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  XLS: (
    <FileIcon>
      <BsFileExcel className="text-emerald-500" />
    </FileIcon>
  ),
  XLSX: (
    <FileIcon>
      <BsFileExcel className="text-emerald-500" />
    </FileIcon>
  ),
  PPT: (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  PPTX: (
    <FileIcon>
      <VscFileCode />
    </FileIcon>
  ),
  TXT: (
    <FileIcon>
      <BsFileEarmarkText />
    </FileIcon>
  ),
  CSV: (
    <FileIcon>
      <BsFileEarmarkText />
    </FileIcon>
  ),
  JPEG: (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  PNG: (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  GIF: (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  BMP: (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  TIFF: (
    <FileIcon>
      <BsFileImage />
    </FileIcon>
  ),
  ZIP: (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  TAR: (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  RAR: (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  "7Z": (
    <FileIcon>
      <VscFileZip />
    </FileIcon>
  ),
  MP4: (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  AVI: (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  MKV: (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  WEBM: (
    <FileIcon>
      <BsFileEarmarkPlay />
    </FileIcon>
  ),
  MP3: (
    <FileIcon>
      <BsFileEarmarkMusic />
    </FileIcon>
  ),
  OGG: (
    <FileIcon>
      <BsFileEarmarkMusic />
    </FileIcon>
  ),
  WAV: (
    <FileIcon>
      <BsFileEarmarkMusic />
    </FileIcon>
  )
};

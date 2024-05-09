"use client";

import axios from "axios";
import { MouseEvent, useRef, useState } from "react";

type Props = {};

const FileUpload = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setuploading] = useState<boolean>(false);

  const buttonHandler = async (e: MouseEvent) => {
    const fileInput = inputRef.current;
    if (fileInput?.files?.length == 0) return alert("Önce dosya seçin!");

    if (!fileInput?.files?.item(0)?.name.endsWith(".pdf")) {
      if (fileInput) {
        fileInput.value = "";
        fileInput.files = null;
      }
      return alert("Sadece pdf dosyası yükleyebilirsiniz!");
    }
    setuploading(() => true);
    const file = fileInput?.files?.item(0);
    const formData: any = new FormData();
    formData.append("fileData", file);

    const res = await axios.put("/api/uploadPaper", formData, {
      headers: {
        "Content-Type": file?.type,
      },
    });
    alert(res.data);

    //clear the file input
    if (fileInput) {
      fileInput.value = "";
      fileInput.files = null;
    }
    setuploading(() => false);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center font-mono bg-gradient-to-br from-slate-700 to-slate-950">
      <div className="form-control border-dashed">
        <label htmlFor="myFile" className="label">
          Upload the papers please.
        </label>
        <input
          ref={inputRef}
          type="file"
          className="file-input"
          accept=".pdf"
        ></input>
        <button
          className="btn btn-primary mt-3"
          onClick={buttonHandler}
          disabled={uploading}
        >
          {uploading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;

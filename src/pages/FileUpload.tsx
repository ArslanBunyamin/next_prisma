"use client";

import axios from "axios";
import { MouseEvent, useRef } from "react";

type Props = {};

const FileUpload = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const buttonHandler = async (e: MouseEvent) => {
    const fileInput = inputRef.current;
    const file = fileInput?.files?.item(0);
    const formData: any = new FormData();
    formData.append("fileData", file);

    const res = await axios.put("/api/handler", formData, {
      headers: {
        "Content-Type": file?.type,
      },
      onUploadProgress: function (progressEvent) {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        if (progressRef.current)
          progressRef.current.innerText = "" + percentCompleted;
      },
    });
    if (progressRef.current) progressRef.current.innerText = "";
    alert(res.data);

    //clear the file input
    if (fileInput) {
      fileInput.value = "";
      fileInput.files = null;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center font-mono">
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
        <button className="btn btn-primary mt-3" onClick={buttonHandler}>
          Upload
        </button>
      </div>
      <div
        id="progress"
        ref={progressRef}
        className="text-lg p-2 mt-5 text-red-700"
      >
        {" "}
      </div>
    </div>
  );
};

export default FileUpload;

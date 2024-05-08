"use client";

import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { FaFileArrowDown } from "react-icons/fa6";
import { saveAs } from "file-saver";

type Props = {};

const ReviewPapers = (props: Props) => {
  const [papers, setpapers] =
    useState<[{ fileName: string; uploadDate: string }]>();

  const reviewerId = "clvteym9e000012kpznc0m07l";

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/getPapers", {
        params: { reviewerId: reviewerId },
      });

      setpapers(res.data);
    })();
  }, []);

  const download = async (fileName: string) => {
    const file = await axios.get("/api/downloadPaper", {
      params: { fileName: fileName },
    });
    const buffer = file.data.data;
    const blob = new Blob([new Uint8Array(buffer)]);
    console.log(blob);
    saveAs(blob, fileName);
  };
  return (
    <div className="min-h-screen flex items-center justify-center font-mono">
      {papers ? (
        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
          {papers.map((paper, index) => {
            let date = new Date(paper.uploadDate);
            return (
              <div
                key={index}
                className="card bg-slate-800 hover:bg-opacity-70 cursor-default space-x-14"
              >
                <div className="card-body">
                  <div className="card-title">{paper.fileName}</div>
                  <div className="stat-desc text-base">
                    {date.toString().split(" ").slice(0, 5).join(" ")}
                  </div>

                  <div className="card-actions space-x-3 mt-5">
                    <button className="btn btn-success">Accept </button>
                    <button className="btn btn-error">Decline</button>
                    <div
                      onClick={() => {
                        download(paper.fileName);
                      }}
                    >
                      <FaFileArrowDown className="size-12 text-slate-500 cursor-pointer" />
                    </div>
                  </div>
                  <form className="card-actions space-x-3 mt-8">
                    <input type="text" className="input input-bordered" />
                    <input
                      type="reset"
                      className="btn btn-warning"
                      value={"Revision"}
                    />
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <span className="h-screen loading loading-ball loading-lg size-32 bg-accent"></span>
      )}
    </div>
  );
};

export default ReviewPapers;

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaFileArrowDown } from "react-icons/fa6";

type Props = {};

const ReviewPapers = (props: Props) => {
  const [papers, setpapers] =
    useState<[{ fileName: string; uploadDate: string; url: string }]>();

  const reviewerId = "clw10mqye0001135mkkdvtccx";

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/getPapers", {
        params: { reviewerId: reviewerId },
      });

      setpapers(res.data);
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center font-mono bg-slate-900">
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
                  <div className="card-title line-clamp-1">
                    {paper.fileName}
                  </div>
                  <div className="stat-desc text-base">
                    {date.toString().split(" ").slice(0, 5).join(" ")}
                  </div>

                  <div className="card-actions space-x-3 mt-5">
                    <button className="btn btn-success">Accept</button>
                    <button className="btn btn-error">Decline </button>
                    <a href={paper.url} target="_blank">
                      <FaEye className="size-12 text-slate-500 cursor-pointer hover:text-slate-400" />
                    </a>
                  </div>

                  <form className="card-actions gap-3 mt-8">
                    <input
                      type="text"
                      className="input input-bordered flex-grow placeholder-gray-500 placeholder-opacity-50"
                      placeholder="Write your revision"
                    />
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

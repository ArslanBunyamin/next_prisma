import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-3 font-mono p-5 bg-slate-800">
      <Link
        href="/FileUpload"
        className="text-2xl bg-primary p-4 rounded-md hover:bg-opacity-80"
      >
        Upload Papers
      </Link>
      <Link
        href="/ReviewPapers"
        className="text-2xl bg-accent p-4 rounded-md hover:bg-opacity-80"
      >
        Review Papers
      </Link>
    </div>
  );
}

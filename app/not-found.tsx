import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-4xl">That page doesn&apos;t exist</h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-muted">The link may be broken or the page may have moved. Try one of our tools instead.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/tools" className="btn-secondary">Browse tools</Link>
      </div>
    </div>
  );
}

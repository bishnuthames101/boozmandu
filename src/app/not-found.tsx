import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8">
        <h1 className="text-6xl font-display font-bold mb-4">
          <span className="text-amber-500">404</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex items-center"
        >
          <Home className="w-5 h-5 mr-2" /> Go Home
        </Link>
      </div>
    </div>
  );
}

import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Thank You for Your Order!</title>
      </Head>

      <main className="p-6 bg-white rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">Thank You for Your Order!</h1>
        <p className="text-gray-600 mt-4">Your order has been placed successfully. We will send you a confirmation email with the details shortly.</p>
       <Link href="/">
        <button 
          
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
        </Link>
      </main>
    </div>
  );
}

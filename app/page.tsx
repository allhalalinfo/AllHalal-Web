export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-6">
            AllHalal
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Discover Authentic Halal Restaurants
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted platform for finding halal-certified restaurants around the world.
          </p>
          
          <div className="mt-12 flex justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200">
              Get Started
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-lg transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


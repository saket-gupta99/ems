import { Link } from "react-router-dom";

function Home() {
  const services = [
    {
      title: "Prefabricated Structure Fabrication Service",
      price: "₹110/sq ft",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/WW/TB/TA/5613333/screenshot-20220121-020802-gallery-250x250.jpg",
      features: [
        "Cost-effective solutions for quick construction",
        "Serving local areas with precision and quality",
      ],
    },
    {
      title: "Brick Masonry Service",
      price: "₹340/sq ft",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/IB/JM/JQ/5613333/brick-masonry-service-250x250.jpg",
      features: [
        "Expert masonry for durable structures",
        "Local area expertise for timely delivery",
      ],
    },
    {
      title: "Residential Wall Painting Service",
      price: "₹35/sq ft",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/CY/OY/FO/5613333/screenshot-20220121-020811-gallery-250x250.jpg",
      features: [
        "Affordable and high-quality painting services",
        "Local service providers for quick turnaround",
      ],
    },
    {
      title: "Commercial Building Construction Service",
      price: "₹380/sq ft",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/BQ/GM/CN/5613333/img-20220120-wa0092-250x250.jpg",
      features: [
        "End-to-end construction solutions for commercial spaces",
        "Local expertise for seamless project execution",
      ],
    },
    {
      title: "Tiles Flooring Service",
      price: "₹340/sq ft",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/AJ/OX/DG/5613333/white-marble-flooring-service-250x250.jpg",
      features: [
        "Premium flooring solutions for homes and offices",
        "Local service providers for hassle-free installation",
      ],
    },
    {
      title: "Commercial Building Maintenance Service",
      price: "₹400/sq ft",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/CB/KO/GU/5613333/img-20220120-wa0039-250x250.jpg",
      features: [
        "Comprehensive maintenance for commercial properties",
        "Local experts for timely and efficient service",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/21/22/16/construction-7805264_1280.jpg"
          alt="Construction Site"
          className="w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center z-10">
          <div className="container mx-auto px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              CONSTRUCTION SERVICES
              <span className="block text-yellow-400 text-2xl md:text-4xl mt-2">
                CREATIVE AND PROFESSIONAL
              </span>
            </h1>
            <p className="text-white text-sm md:text-base mb-8 max-w-2xl">
              We provide top-notch construction services tailored to your needs,
              ensuring quality, durability, and timely delivery.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-yellow-400 px-6 py-3 text-gray-900 font-bold w-full sm:w-auto text-center">
                <a href="#services">OUR SERVICES</a>
              </button>
              <Link
                className="bg-yellow-400 px-6 py-3 text-gray-900 font-bold w-full sm:w-auto text-center"
                to="/login"
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Welcome Section */}
      <div className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                WELCOME TO OUR COMPANY
              </h2>
              <p className="text-gray-600 mb-6">
                Established in 2017 in Mumbai, Maharashtra, we{" "}
                <span className="font-bold">S I Infratech LLP</span> are a
                trusted name in the construction industry. We specialize in
                waterproofing, construction, and maintenance services,
                delivering excellence with every project.
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <img
                src="https://cdn.pixabay.com/photo/2023/04/11/16/09/ai-generated-7917672_1280.jpg"
                alt="Construction Worker"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-32 md:h-64 bg-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Our Services</h1>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-16" id="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 rounded-full text-gray-900 font-semibold">
                    {service.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="bg-yellow-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Need a Special Service?
          </h2>
          <p className="mb-8 text-gray-800">
            Contact us for custom construction solutions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
            />
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
              Contact Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

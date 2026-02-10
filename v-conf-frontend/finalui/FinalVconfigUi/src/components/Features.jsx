import { Zap, Settings, DollarSign } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Configure your vehicle in minutes with our intuitive interface'
    },
    {
      icon: Settings,
      title: 'Fully Customizable',
      description: 'Choose from thousands of options to build your perfect vehicle'
    },
    {
      icon: DollarSign,
      title: 'Real-Time Pricing',
      description: 'See accurate pricing as you customize every detail'
    }
  ];

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools to configure your dream vehicle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

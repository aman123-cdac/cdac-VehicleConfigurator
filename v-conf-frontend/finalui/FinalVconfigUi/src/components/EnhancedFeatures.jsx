import { Zap, Settings, DollarSign, Shield, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function EnhancedFeatures() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Configure your vehicle in minutes with our intuitive interface",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Settings,
      title: "Fully Customizable",
      description: "Choose from thousands of options to build your perfect vehicle",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: DollarSign,
      title: "Real-Time Pricing",
      description: "See accurate pricing as you customize every detail",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Get help anytime with our dedicated support team",
      color: "from-red-400 to-rose-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team on configurations",
      color: "from-indigo-400 to-blue-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools and features to configure your dream vehicle with ease
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-none">
                <CardContent className="p-8">
                  <div className="relative z-10">
                    <div
                      className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

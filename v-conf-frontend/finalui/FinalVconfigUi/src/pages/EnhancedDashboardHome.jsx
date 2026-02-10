import { useNavigate } from "react-router-dom";
import { Car, FileText, Clock, Plus, Layers, Upload, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import EnhancedStatCard from "../components/EnhancedStatCard";
import EnhancedQuickActionCard from "../components/EnhancedQuickActionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnhancedDashboardHome() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Configurations",
      value: "24",
      subtitle: "Last 30 days",
      icon: <Car size={20} />,
      trend: "up",
      trendValue: "+12%",
    },
    {
      title: "Pending Invoices",
      value: "8",
      subtitle: "Awaiting approval",
      icon: <FileText size={20} />,
      trend: "up",
      trendValue: "+3",
    },
    {
      title: "Recent Activity",
      value: "156",
      subtitle: "Actions this week",
      icon: <Clock size={20} />,
      trend: "up",
      trendValue: "+8%",
    },
    {
      title: "Revenue",
      value: "₹4.2Cr",
      subtitle: "Total revenue",
      icon: <TrendingUp size={20} />,
      trend: "up",
      trendValue: "+18%",
    },
  ];

  const quickActions = [
    {
      title: "New Configuration",
      subtitle: "Start configuring a new vehicle",
      icon: <Plus size={24} />,
      onClick: () => navigate("/welcome"),
    },
    {
      title: "Browse Templates",
      subtitle: "Use pre-configured templates",
      icon: <Layers size={24} />,
      onClick: () => navigate("/default_config/1"),
    },
    {
      title: "Upload Excel",
      subtitle: "Bulk import configurations",
      icon: <Upload size={24} />,
      onClick: () => navigate("/upload"),
    },
  ];

  const recentConfigurations = [
    {
      id: 1,
      name: "Tesla Model S",
      type: "Sedan",
      price: "₹86,990",
      date: "2 days ago",
      status: "Completed",
    },
    {
      id: 2,
      name: "Porsche 911",
      type: "Coupe",
      price: "₹1,15,100",
      date: "5 days ago",
      status: "Draft",
    },
    {
      id: 3,
      name: "BMW M3",
      type: "Sedan",
      price: "₹92,500",
      date: "1 week ago",
      status: "Completed",
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
    },
  };

  return (
    <div className="w-full space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's an overview of your vehicle configurations
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <EnhancedStatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <EnhancedQuickActionCard key={index} {...action} />
          ))}
        </div>
      </motion.div>

      {/* Recent Configurations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Configurations
          </h2>
          <Button variant="ghost" onClick={() => navigate("/configurations")}>
            View All
          </Button>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-0">
            {recentConfigurations.length > 0 ? (
              <div className="divide-y">
                {recentConfigurations.map((config, index) => (
                  <motion.div
                    key={config.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/configurator/${config.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Car className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {config.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span>{config.type}</span>
                            <span>•</span>
                            <span>{config.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{config.price}</p>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              config.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {config.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No configurations yet</p>
                <Button onClick={() => navigate("/welcome")}>
                  Create Your First Configuration
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";
// import StatCard from "../components/Statcard";
// import ActionCard from "../components/QuickActionCard";
// import Footer from "../components/Footer";
// import { Car, FileText, Clock, Plus, Layers, Upload } from "lucide-react";

// export default function DashboardHome() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
//         {/* Welcome */}
//         <div className="mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold">
//             Welcome back 👋
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Here's an overview of your vehicle configurations
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <StatCard
//             title="Total Configurations"
//             value="0"
//             subtitle="Saved configurations"
//             icon={<Car />}
//           />
//           <StatCard
//             title="Invoices"
//             value="0"
//             subtitle="Generated invoices"
//             icon={<FileText />}
//           />
//           <StatCard
//             title="Recent Activity"
//             value="0"
//             subtitle="Last 7 days"
//             icon={<Clock />}
//           />
//         </div>

//         {/* Quick Actions */}
//         <h2 className="text-lg sm:text-xl font-semibold mt-10 mb-4">
//           Quick Actions
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <ActionCard
//             title="New Configuration"
//             subtitle="Start configuring a new vehicle"
//             icon={<Plus />}
//             onClick={() => navigate("/configurator")}
//           />
//           <ActionCard
//             title="Browse Templates"
//             subtitle="Use pre-configured templates"
//             icon={<Layers />}
//           />
//           <ActionCard
//             title="Upload Excel"
//             subtitle="Bulk import configurations"
//             icon={<Upload />}
//           />
//         </div>

//         {/* Recent Configurations */}
//         <h2 className="text-lg sm:text-xl font-semibold mt-10 mb-4">
//           Recent Configurations
//         </h2>

//         <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10 flex flex-col items-center text-center">
//           <Car className="w-14 h-14 sm:w-16 sm:h-16 text-gray-300 mb-4" />
//           <p className="text-gray-500">
//             No configurations yet
//           </p>

//           <button
//             className="mt-4 bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg transition"
//             onClick={() => navigate("/configurator")}
//           >
//             Create Your First Configuration
//           </button>
//         </div>
//       </main>

//       <div className="px-6">
//         <Footer />
//       </div>
//     </>
//   );
// }


import { MainLayout } from "../components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, FileText, Package, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Total Configurations", value: "24", icon: Car, change: "+12%" },
  { title: "Pending Invoices", value: "8", icon: FileText, change: "+3" },
  { title: "Components", value: "156", icon: Package, change: "Active" },
  { title: "Revenue", value: "₹4.2Cr", icon: TrendingUp, change: "+18%" },
];

const DashboardHome = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="card-shadow hover:card-shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild>
              <Link to="/configure/1">
                <Car className="w-4 h-4 mr-2" />
                New Configuration
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/invoices">
                <FileText className="w-4 h-4 mr-2" />
                View Invoices
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="summary-gradient text-sidebar-foreground card-shadow">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Welcome to VehicleConfig Enterprise</h3>
            <p className="text-sidebar-muted mb-4">
              Configure vehicles with optional components, manage invoices, and streamline your workflow.
            </p>
            <Button variant="secondary" asChild>
              <Link to="/configure/1">Start Configuring</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardHome;

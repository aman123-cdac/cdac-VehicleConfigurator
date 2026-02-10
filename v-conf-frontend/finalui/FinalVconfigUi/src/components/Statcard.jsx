export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <p className="text-gray-700 font-medium">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
      <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
    </div>
  );
}

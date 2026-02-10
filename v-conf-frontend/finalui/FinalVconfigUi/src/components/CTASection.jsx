import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  const handleCreate = () => {
    const target = "/welcome";
    if (!localStorage.getItem("token")) {
      navigate("/signin", { state: { redirectTo: target } });
    } else {
      navigate(target);
    }
  };

  return (
    <section className="py-20 bg-[#F5EDED]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-2 border-[#D72323] rounded-xl p-10 text-center shadow-sm bg-white">
          
          <h2 className="text-3xl font-bold text-[#000000] mb-3">
            Ready to Get Started?
          </h2>

          <p className="text-[#3E3636] mb-8">
            Join thousands of users who are configuring their dream vehicles
          </p>

          <button onClick={handleCreate} className="bg-[#D72323] text-[#F5EDED] px-6 py-3 rounded-lg font-semibold 
                             hover:bg-[#000000] transition">
            Create Your Configuration Now
          </button>

        </div>
      </div>
    </section>
  );
} 

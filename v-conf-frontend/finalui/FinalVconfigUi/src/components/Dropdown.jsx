const Dropdown = ({ label, value, onChange, options = [] }) => {
    return (
        <div className="flex flex-col gap-2">
            {/* Label */}
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            {/* Select */}
            <select
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                className="
                    border border-gray-300
                    rounded-lg
                    px-4 py-2.5
                    text-sm
                    bg-white
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                "
            >
                <option key="__default" value="">
                    Select
                </option>

                {options.map((o, index) => (
                    <option
                        key={`${o.value}-${index}`} 
                        value={o.value ?? ""}
                    >
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

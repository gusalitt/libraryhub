import { ChevronDown } from "lucide-react";

export default function SelectFilter({ value, onChange, options = [], placeholder = "" }) {
	return (
		<div className="relative w-max">
			<select 
                value={value} 
                onChange={onChange} 
                className="appearance-none bg-card border-2 border-border rounded-xl px-4 py-3 pr-10 font-medium text-sm focus:ring-2 focus:ring-black focus:border-black">
                {placeholder && <option value="all">{placeholder}</option>}
				{options.map((option)=> (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
		</div>
	);
}

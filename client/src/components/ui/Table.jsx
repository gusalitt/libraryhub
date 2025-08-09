import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function Table({ columns, children }) {
	return (
		<Card>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr>
                            {columns.map((column, index) => (
                                <th key={index} className="px-6 py-4 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">{column}</th>
                            ))}
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
                        {children}
					</tbody>
				</table>
			</div>
		</Card>
	);
}

export  function TableCell({ variant = "default", children, className, ...props }) {
    const variants = {
        "default": "px-5 py-2 whitespace-nowrap",
        "secondary": "px-6 py-4 whitespace-nowrap text-sm text-muted-foreground",
        "actions": "px-6 py-4 whitespace-nowrap text-sm font-medium",
    } 

    return (
        <td {...props} className={cn(variants[variant], className)}>{children}</td>
    );
}
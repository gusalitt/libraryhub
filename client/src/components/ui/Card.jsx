import { cn } from "@/lib/utils"

export default function Card({ children, className }) {
    return (
        <div className={cn("bg-card border-2 border-border rounded-xl p-6", className)}>{ children }</div>
    );
}
import React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border-2 border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 text-primary hover:underline"
}

const buttonSizes = {
    default: "h-9 px-4 py-2",
	sm: "h-8 rounded-lg px-3",
	lg: "h-10 rounded-lg px-6",
	icon: "size-9",
}

const initClass = "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

function Button({ 
    className, 
    variant = "default", 
    size = "default", 
    asChild = false, 
    children, 
    ...props }) {

    if (asChild) {
        return React.cloneElement(children, {
            className: cn(
                initClass,
                buttonVariants[variant],
                buttonSizes[size],
                className
            ),
            ...props
        });
    }

    return (
        <button
            className={cn(
                initClass,
                buttonVariants[variant],
                buttonSizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
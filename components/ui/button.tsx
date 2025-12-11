import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-framer-blue text-white shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:bg-framer-blue-hover hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] active:scale-95",
        destructive:
          "bg-red-600 text-white shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:bg-red-700 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] active:scale-95",
        outline:
          "border border-border bg-transparent text-text-primary shadow-sm hover:bg-bg-secondary hover:border-border-hover",
        secondary:
          "bg-bg-secondary text-text-primary shadow-sm hover:bg-bg-tertiary",
        ghost: "hover:bg-bg-secondary hover:text-framer-blue",
        link: "text-framer-blue underline-offset-4 hover:underline hover:text-framer-blue-hover",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

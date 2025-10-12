import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
        default:"bg-accent text-primary hover:bg-accent-hover active:bg-accent",
        primary: "big-primary text-white active:bg-accent",
        outline : "border border-accent bg-transparent text-accent hover:bg-accent hover:text-white active:bg-accent",
        
      },
      size: {
        default: "h-[30px] px-6",
        md: "h-[48px] px-6",
        lg: "h-[50px] px-6 text-sm uppercase tracking-[2px]",
        // xl: "h-[30px] px-8 text-sm uppercase tracking-[2px]",
        
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }

"use client"

import { cn } from "@/lib/utils"
import { Children, cloneElement, ReactElement, isValidElement } from "react"
import { ButtonProps, Button } from "./button"

interface ButtonGroupProps {
  className?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  children: ReactElement<ButtonProps> | ReactElement<ButtonProps>[]
}

export function ButtonGroup({
  className,
  variant,
  size,
  children,
}: ButtonGroupProps) {
  const buttonChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((child) => child.type === Button) as ReactElement<ButtonProps>[]

  const totalButtons = buttonChildren.length

  if (totalButtons === 0) {
    return null
  }

  return (
    <div className={cn("flex w-full", className)}>
      {buttonChildren.map((child, index) => {
        const isFirstItem = index === 0
        const isLastItem = index === totalButtons - 1
        const isMiddleItem = !isFirstItem && !isLastItem

        return cloneElement(child, {
          key: child.key || index,
          variant: child.props.variant ?? variant,
          size: child.props.size ?? size,
          className: cn(
            // Base styles
            "relative",
            // Border radius styles
            {
              "rounded-r-none": !isLastItem,
              "rounded-l-none": !isFirstItem,
            },
            // Border styles
            {
              "border-r-0": !isLastItem,
              "[&:not(:focus-visible)]:border-r-0": isMiddleItem,
              "focus-visible:z-10": true,
            },
            // Hover state handling
            {
              "hover:z-20": true,
              "[&:not(:hover)]:border-r-0": isMiddleItem,
            },
            child.props.className
          ),
        })
      })}
    </div>
  )
}
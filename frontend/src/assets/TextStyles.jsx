import { defineTextStyles } from "@chakra-ui/react"

export const headingText = defineTextStyles({
  body: {
    description: "The heading text style - used in headers",
    value: {
      fontFamily: "Roboto",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
})
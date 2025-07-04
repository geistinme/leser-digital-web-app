import { useColorScheme } from "../colorScheme"

const blackLogos = ["zeit", "manager", "tagesschau", "spiegel"]

export const useInvertedLogo = (key?: string) => {
  const { colorScheme } = useColorScheme()

  return key && blackLogos.includes(key) && colorScheme === "dark"
}

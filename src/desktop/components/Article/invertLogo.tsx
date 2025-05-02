import { useColorScheme } from "../../../shared/hooks/colorScheme";

const blackLogos = ["zeit", "manager", "tagesschau", "spiegel"];

export const useInvertedLogo = (key: string) => {
  const { colorScheme } = useColorScheme();
  
  return blackLogos.includes(key) && colorScheme === "dark";
};

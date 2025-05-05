import { useMemo } from "react";

import { useLoggedInQuery } from "../../../generated/graphql";

// Array mit zufälligen Sprüchen für "Gute Nacht"
const nightQuotes = [
  "Morgen gibt es wieder was zu sehen.",
  "Schlaf gut und träum was Schönes.",
  "Ruhe dich gut aus für einen neuen Tag.",
  "Möge der Schlaf dir neue Energie bringen.",
];

// Array mit zufälligen Sprüchen für "Guten Morgen"
const morningQuotes = [
  "Der frühe Vogel fängt den Wurm.",
  "Jeder Tag ist eine neue Chance.",
  "Ein neuer Tag, ein neues Abenteuer.",
  "Möge dein Tag voller positiver Überraschungen sein.",
];

// Array mit zufälligen Sprüchen für "Guten Tag"
const dayQuotes = [
  "Genieße den Tag in vollen Zügen.",
  "Jeder Tag ist ein Geschenk.",
  "Mach das Beste aus deinem Tag.",
];

// Array mit zufälligen Sprüchen für "Guten Abend"
const eveningQuotes = [
  "Zeit um zu schauen was heute alles passiert ist.",
  "Ein schöner Tag geht zu Ende.",
  "Möge der Abend dir Ruhe bringen.",
];

function greetUser(name: string) {
  const hour = new Date().getHours();
  let greeting;

  let randomQuote = "";
  if (hour >= 0 && hour < 6) {
    // Zufälligen Spruch auswählen
    randomQuote = nightQuotes[Math.floor(Math.random() * nightQuotes.length)];
    greeting = `Gute Nacht, ${name}.`;
  } else if (hour < 12) {
    randomQuote =
      morningQuotes[Math.floor(Math.random() * morningQuotes.length)];
    greeting = `Guten Morgen, ${name}.`;
  } else if (hour < 18) {
    randomQuote = dayQuotes[Math.floor(Math.random() * dayQuotes.length)];
    greeting = `Guten Tag, ${name}.`;
  } else {
    randomQuote =
      eveningQuotes[Math.floor(Math.random() * eveningQuotes.length)];
    greeting = `Guten Abend, ${name}.`;
  }

  return [greeting, randomQuote];
}

export const useGreeting = () => {
  const { data } = useLoggedInQuery();

  return useMemo(() => {
    if (data?.loggedIn.name) {
      return greetUser(data.loggedIn.name);
    } else {
      return [null, null];
    }
  }, [data?.loggedIn.name]);
};

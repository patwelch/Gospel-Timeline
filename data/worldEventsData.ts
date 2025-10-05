import { WorldEventData } from '../types';

export const worldEventsData: WorldEventData[] = [
  {
    id: 1,
    year: "c. 4 BC",
    title: "Death of Herod the Great",
    description: "The king of Judea, known for his colossal building projects, dies. His kingdom is divided among his sons.",
    day: -10, // Approx. time of Jesus's birth
  },
  {
    id: 2,
    year: "AD 14",
    title: "Augustus Dies, Tiberius becomes Emperor",
    description: "The first Roman emperor, Augustus, dies. His stepson Tiberius succeeds him.",
    day: 6570, // (14 + 4) * 365
  },
  {
    id: 3,
    year: "AD 26",
    title: "Pontius Pilate appointed Governor of Judea",
    description: "Pilate begins his rule as the Roman prefect of Judea, a tenure that will last for a decade.",
    day: 10950, // (26 + 4) * 365
  },
  {
    id: 4,
    year: "AD 37",
    title: "Tiberius Dies, Caligula becomes Emperor",
    description: "Emperor Tiberius dies, and his grand-nephew and adopted grandson, Caligula, ascends to power.",
    day: 14965, // (37 + 4) * 365
  },
  {
    id: 5,
    year: "AD 41",
    title: "Assassination of Caligula",
    description: "After a short and controversial reign, Caligula is assassinated by officers of the Praetorian Guard.",
    day: 16425, // (41 + 4) * 365
  },
];

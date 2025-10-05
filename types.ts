export enum Gospel {
  Matthew = 'Matthew',
  Mark = 'Mark',
  Luke = 'Luke',
  John = 'John',
}

export interface TimelineEventData {
  id: number;
  title: string;
  description: string;
  gospels: Gospel[];
  reference: {
    text: string;
    url:string;
  };
  day: number; // Represents days from the start of the timeline.
  imageUrl?: string;
}

export interface WorldEventData {
  id: number;
  year: string;
  title: string;
  description: string;
  day: number; // Represents days from the start of the timeline.
}

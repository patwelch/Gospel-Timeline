import { TimelineEventData, Gospel } from '../types';

// The timeline is measured in days from the approximate birth of Christ (c. 4 BC)
export const timelineData: TimelineEventData[] = [
  {
    id: 1,
    title: "Jesus's Birth",
    description: "The birth of Jesus in Bethlehem, a central event in the Christian narrative, prophesied in the Old Testament.",
    gospels: [Gospel.Matthew, Gospel.Luke],
    reference: { text: "Matthew 2, Luke 2", url: "https://www.biblegateway.com/passage/?search=Matthew+2%3B+Luke+2&version=NIV" },
    day: 0, // The starting point of our timeline
    imageUrl: "https://picsum.photos/seed/birth/400/200",
  },
  {
    id: 2,
    title: "John the Baptist",
    description: "John the Baptist prepares the way for Jesus, preaching repentance and baptizing in the Jordan River.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John],
    reference: { text: "Matthew 3, Mark 1, Luke 3", url: "https://www.biblegateway.com/passage/?search=Matthew+3%3B+Mark+1%3B+Luke+3&version=NIV" },
    day: 10950, // Approx. 30 years * 365 days
    imageUrl: "https://picsum.photos/seed/john_the_baptist/400/200",
  },
  {
    id: 3,
    title: "Baptism of Jesus",
    description: "Jesus is baptized by John in the Jordan River, where the heavens open and the Spirit of God descends like a dove.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke],
    reference: { text: "Matthew 3, Mark 1, Luke 3", url: "https://www.biblegateway.com/passage/?search=Matthew+3%3B+Mark+1%3B+Luke+3&version=NIV" },
    day: 10955,
    imageUrl: "https://picsum.photos/seed/baptism/400/200",
  },
  {
    id: 4,
    title: "Temptation in the Wilderness",
    description: "After His baptism, Jesus fasts for 40 days and nights in the desert and is tempted by Satan.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke],
    reference: { text: "Matthew 4, Mark 1, Luke 4", url: "https://www.biblegateway.com/passage/?search=Matthew+4%3B+Mark+1%3B+Luke+4&version=NIV" },
    day: 10995, // After 40 days
    imageUrl: "https://picsum.photos/seed/temptation/400/200",
  },
  {
    id: 5,
    title: "Calling of the First Disciples",
    description: "Jesus calls his first disciples, Simon (Peter), Andrew, James, and John, who were fishermen by trade.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John],
    reference: { text: "Matthew 4, Mark 1, Luke 5", url: "https://www.biblegateway.com/passage/?search=Matthew+4%3B+Mark+1%3B+Luke+5&version=NIV" },
    day: 11000,
    imageUrl: "https://picsum.photos/seed/disciples/400/200",
  },
  {
    id: 6,
    title: "The Wedding at Cana",
    description: "Jesus performs his first recorded miracle, turning water into wine at a wedding in Cana of Galilee.",
    gospels: [Gospel.John],
    reference: { text: "John 2", url: "https://www.biblegateway.com/passage/?search=John+2&version=NIV" },
    day: 11010,
    imageUrl: "https://picsum.photos/seed/cana/400/200",
  },
  {
    id: 7,
    title: "Sermon on the Mount",
    description: "Jesus delivers a profound discourse on ethics and morality, including the Beatitudes and the Lord's Prayer.",
    gospels: [Gospel.Matthew, Gospel.Luke],
    reference: { text: "Matthew 5-7", url: "https://www.biblegateway.com/passage/?search=Matthew+5-7&version=NIV" },
    day: 11300, // Approx 1 year into ministry
    imageUrl: "https://picsum.photos/seed/sermon/400/200",
  },
    {
    id: 8,
    title: "Calming the Storm",
    description: "Jesus demonstrates his power over nature by calming a furious storm on the Sea of Galilee.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke],
    reference: { text: "Matthew 8, Mark 4, Luke 8", url: "https://www.biblegateway.com/passage/?search=Matthew+8%3B+Mark+4%3B+Luke+8&version=NIV" },
    day: 11500,
    imageUrl: "https://picsum.photos/seed/storm/400/200",
  },
  {
    id: 9,
    title: "Feeding the 5000",
    description: "Jesus miraculously feeds a crowd of five thousand people with only five loaves of bread and two fish.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John],
    reference: { text: "Matthew 14, Mark 6, Luke 9, John 6", url: "https://www.biblegateway.com/passage/?search=Matthew+14%3B+Mark+6%3B+Luke+9%3B+John+6&version=NIV" },
    day: 11800,
    imageUrl: "https://picsum.photos/seed/feeding/400/200",
  },
  {
    id: 10,
    title: "The Transfiguration",
    description: "Jesus is transfigured on a mountain, appearing in glory with Moses and Elijah before Peter, James, and John.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke],
    reference: { text: "Matthew 17, Mark 9, Luke 9", url: "https://www.biblegateway.com/passage/?search=Matthew+17%3B+Mark+9%3B+Luke+9&version=NIV" },
    day: 12000,
    imageUrl: "https://picsum.photos/seed/transfiguration/400/200",
  },
  {
    id: 11,
    title: "Raising of Lazarus",
    description: "Jesus raises Lazarus from the dead four days after his burial, one of his most powerful miracles.",
    gospels: [Gospel.John],
    reference: { text: "John 11", url: "https://www.biblegateway.com/passage/?search=John+11&version=NIV" },
    day: 12200,
    imageUrl: "https://picsum.photos/seed/lazarus/400/200",
  },
  {
    id: 12,
    title: "The Triumphal Entry",
    description: "Jesus enters Jerusalem riding on a donkey, fulfilling prophecy, as crowds welcome him with palm branches.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John],
    reference: { text: "Matthew 21, Mark 11, Luke 19, John 12", url: "https://www.biblegateway.com/passage/?search=Matthew+21%3B+Mark+11%3B+Luke+19%3B+John+12&version=NIV" },
    day: 12220, // Start of Passion Week
    imageUrl: "https://picsum.photos/seed/entry/400/200",
  },
  {
    id: 13,
    title: "The Last Supper",
    description: "Jesus shares a final meal with his disciples before his crucifixion, instituting the Eucharist.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke],
    reference: { text: "Matthew 26, Mark 14, Luke 22", url: "https://www.biblegateway.com/passage/?search=Matthew+26%3B+Mark+14%3B+Luke+22&version=NIV" },
    day: 12224, // Thursday of Passion Week
    imageUrl: "https://picsum.photos/seed/supper/400/200",
  },
  {
    id: 14,
    title: "Crucifixion and Death",
    description: "Jesus is arrested, tried, and crucified at Golgotha, dying on the cross for the sins of humanity.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John],
    reference: { text: "Matthew 27, Mark 15, Luke 23, John 19", url: "https://www.biblegateway.com/passage/?search=Matthew+27%3B+Mark+15%3B+Luke+23%3B+John+19&version=NIV" },
    day: 12225, // Friday
    imageUrl: "https://picsum.photos/seed/crucifixion/400/200",
  },
  {
    id: 15,
    title: "The Resurrection",
    description: "On the third day after his crucifixion, Jesus rises from the dead, appearing to his followers.",
    gospels: [Gospel.Matthew, Gospel.Mark, Gospel.Luke, Gospel.John],
    reference: { text: "Matthew 28, Mark 16, Luke 24, John 20", url: "https://www.biblegateway.com/passage/?search=Matthew+28%3B+Mark+16%3B+Luke+24%3B+John+20&version=NIV" },
    day: 12227, // Sunday
    imageUrl: "https://picsum.photos/seed/resurrection/400/200",
  },
  {
    id: 16,
    title: "The Great Commission",
    description: "Before ascending to heaven, Jesus commissions his disciples to spread his teachings to all nations.",
    gospels: [Gospel.Matthew, Gospel.Mark],
    reference: { text: "Matthew 28, Mark 16", url: "https://www.biblegateway.com/passage/?search=Matthew+28%3B+Mark+16&version=NIV" },
    day: 12267, // 40 days after resurrection
    imageUrl: "https://picsum.photos/seed/commission/400/200",
  }
];

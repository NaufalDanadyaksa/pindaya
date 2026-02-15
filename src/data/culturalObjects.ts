export interface CulturalObject {
  id: string;
  name: { en: string; id: string };
  category: string;
  image: string;
  description: { en: string; id: string };
  history: { en: string; id: string };
  philosophy: { en: string; id: string };
  culturalMeaning: { en: string; id: string };
  origin: { en: string; id: string };
  modelUrl?: string;
  modelType:
    | "torus"
    | "dodecahedron"
    | "octahedron"
    | "icosahedron"
    | "cone"
    | "cylinder";
  modelColor: string;
}

export const culturalObjects: CulturalObject[] = [
  {
    id: "batik-parang",
    name: { en: "Batik Parang", id: "Batik Parang" },
    category: "batik",
    image: "/images/batik-parang.png",
    description: {
      en: "Batik Parang is one of the oldest and most iconic batik motifs from Yogyakarta. The pattern features diagonal rows of interlocking S-shaped curves, symbolizing ocean waves crashing against rocks.",
      id: "Batik Parang adalah salah satu motif batik tertua dan paling ikonik dari Yogyakarta. Polanya menampilkan deretan diagonal kurva berbentuk S yang saling terhubung, melambangkan ombak laut yang menerjang batu karang.",
    },
    history: {
      en: "Batik Parang originated in the Mataram Sultanate era (16th-17th century). It was exclusively worn by the royal family and high-ranking court officials. The word 'Parang' comes from 'pereng' meaning slope or cliff, reflecting the diagonal pattern of the motif.",
      id: "Batik Parang berasal dari era Kesultanan Mataram (abad ke-16-17). Motif ini secara eksklusif dikenakan oleh keluarga kerajaan dan pejabat istana tingkat tinggi. Kata 'Parang' berasal dari 'pereng' yang berarti lereng atau tebing, mencerminkan pola diagonal motif tersebut.",
    },
    philosophy: {
      en: "The continuous S-shaped pattern symbolizes perseverance, strength, and the never-ending struggle of life. Just as ocean waves never stop crashing, humans must never stop fighting and improving themselves.",
      id: "Pola berbentuk S yang berkelanjutan melambangkan ketekunan, kekuatan, dan perjuangan hidup yang tiada henti. Seperti ombak laut yang tak pernah berhenti menerjang, manusia tidak boleh berhenti berjuang dan memperbaiki diri.",
    },
    culturalMeaning: {
      en: "In Javanese culture, wearing Batik Parang signifies nobility, leadership, and spiritual strength. It is often worn during important ceremonies and royal events in the Yogyakarta Sultanate.",
      id: "Dalam budaya Jawa, mengenakan Batik Parang menandakan kebangsawanan, kepemimpinan, dan kekuatan spiritual. Motif ini sering dikenakan saat upacara penting dan acara kerajaan di Kesultanan Yogyakarta.",
    },
    origin: { en: "Yogyakarta Sultanate", id: "Kesultanan Yogyakarta" },
    modelUrl: "/models/batik_parang.glb",
    modelType: "torus",
    modelColor: "#8D6E63",
  },
  {
    id: "keris-pusaka",
    name: { en: "Keris Pusaka", id: "Keris Pusaka" },
    category: "weapon",
    image: "/images/keris.png",
    description: {
      en: "The Keris is an asymmetrical dagger with a distinctive wavy blade. It is considered a sacred heirloom weapon in Javanese culture, believed to possess mystical powers and spiritual significance.",
      id: "Keris adalah belati asimetris dengan bilah bergelombang yang khas. Senjata ini dianggap sebagai pusaka sakral dalam budaya Jawa, dipercaya memiliki kekuatan mistis dan makna spiritual.",
    },
    history: {
      en: "The Keris dates back to the 9th century, with the oldest known keris found in Java. Throughout the Majapahit and Mataram kingdoms, the keris evolved into both a weapon and a spiritual artifact, with master blacksmiths (empu) creating each blade through elaborate rituals.",
      id: "Keris berasal dari abad ke-9, dengan keris tertua ditemukan di Jawa. Sepanjang era kerajaan Majapahit dan Mataram, keris berkembang menjadi senjata sekaligus artefak spiritual, dengan pandai besi ahli (empu) menciptakan setiap bilah melalui ritual yang rumit.",
    },
    philosophy: {
      en: "Each wave (luk) in the blade carries specific meaning. An odd number of waves is considered auspicious. The keris represents the balance between physical power and spiritual wisdom, embodying the Javanese concept of inner strength.",
      id: "Setiap gelombang (luk) pada bilah membawa makna tertentu. Jumlah gelombang ganjil dianggap membawa keberuntungan. Keris melambangkan keseimbangan antara kekuatan fisik dan kebijaksanaan spiritual, mewujudkan konsep Jawa tentang kekuatan batin.",
    },
    culturalMeaning: {
      en: "The keris is UNESCO-recognized as a Masterpiece of Intangible Cultural Heritage. In Yogyakarta, it is an essential part of traditional ceremonies, weddings, and court rituals. Each keris is believed to have its own spirit.",
      id: "Keris diakui UNESCO sebagai Mahakarya Warisan Budaya Tak Benda. Di Yogyakarta, keris merupakan bagian penting dari upacara tradisional, pernikahan, dan ritual istana. Setiap keris dipercaya memiliki rohnya sendiri.",
    },
    origin: { en: "Java, Indonesia", id: "Jawa, Indonesia" },
    modelUrl: "/models/keris.glb",
    modelType: "octahedron",
    modelColor: "#8D7B68",
  },
  {
    id: "blangkon",
    name: { en: "Blangkon", id: "Blangkon" },
    category: "clothing",
    image: "/images/blangkon.png",
    description: {
      en: "Blangkon is a traditional Javanese headgear made from batik cloth, shaped to fit the head. It is an essential part of Javanese formal attire, particularly in Yogyakarta and Surakarta styles.",
      id: "Blangkon adalah penutup kepala tradisional Jawa yang terbuat dari kain batik, dibentuk agar pas di kepala. Ini merupakan bagian penting dari pakaian resmi Jawa, terutama dalam gaya Yogyakarta dan Surakarta.",
    },
    history: {
      en: "The blangkon has been worn since the time of the ancient Javanese kingdoms. The Yogyakarta style features a distinctive knot at the back, while the Surakarta style has a padded fold. It became standardized during the reign of Sultan Hamengkubuwono I.",
      id: "Blangkon telah dikenakan sejak zaman kerajaan Jawa kuno. Gaya Yogyakarta memiliki ikatan khas di bagian belakang, sedangkan gaya Surakarta memiliki lipatan berisi. Bentuknya menjadi standar pada masa pemerintahan Sultan Hamengkubuwono I.",
    },
    philosophy: {
      en: "The blangkon symbolizes self-control and wisdom. The way the head is covered represents the containment of thoughts and emotions, reflecting the Javanese value of maintaining composure and inner peace.",
      id: "Blangkon melambangkan pengendalian diri dan kebijaksanaan. Cara kepala ditutupi melambangkan pengendalian pikiran dan emosi, mencerminkan nilai Jawa dalam menjaga ketenangan dan kedamaian batin.",
    },
    culturalMeaning: {
      en: "Wearing a blangkon is a sign of respect for Javanese tradition. In Yogyakarta, it is mandatory attire for male court officials and is worn during traditional ceremonies, weddings, and cultural events.",
      id: "Mengenakan blangkon adalah tanda penghormatan terhadap tradisi Jawa. Di Yogyakarta, ini adalah pakaian wajib bagi pejabat istana pria dan dikenakan selama upacara tradisional, pernikahan, dan acara budaya.",
    },
    origin: { en: "Yogyakarta & Surakarta", id: "Yogyakarta & Surakarta" },
    modelUrl: "/models/blangkon.glb",
    modelType: "dodecahedron",
    modelColor: "#D4AF37",
  },
  {
    id: "gamelan",
    name: { en: "Gamelan", id: "Gamelan" },
    category: "instrument",
    image: "/images/gamelan.png",
    description: {
      en: "Gamelan is a traditional ensemble of percussion instruments from Java and Bali, consisting of metallophones, xylophones, drums, and gongs. It produces a unique, ethereal sound that has captivated listeners for centuries.",
      id: "Gamelan adalah ansambel alat musik perkusi tradisional dari Jawa dan Bali, terdiri dari metalofon, xilofon, drum, dan gong. Menghasilkan suara yang unik dan memikat pendengar selama berabad-abad.",
    },
    history: {
      en: "Gamelan dates back to the 8th century, as depicted in temple reliefs at Borobudur. The Yogyakarta court gamelan, known as 'Gamelan Keraton', has been preserved for centuries and is played during special royal ceremonies.",
      id: "Gamelan berasal dari abad ke-8, seperti yang digambarkan dalam relief candi Borobudur. Gamelan keraton Yogyakarta telah dilestarikan selama berabad-abad dan dimainkan selama upacara kerajaan khusus.",
    },
    philosophy: {
      en: "Gamelan embodies the principle of communal harmony — no single instrument dominates. Each player must listen to others and blend in, reflecting the Javanese philosophy of 'gotong royong' (mutual cooperation).",
      id: "Gamelan mewujudkan prinsip harmoni komunal — tidak ada satu instrumen yang mendominasi. Setiap pemain harus mendengarkan yang lain dan menyatu, mencerminkan filosofi Jawa 'gotong royong' (kerja sama mutual).",
    },
    culturalMeaning: {
      en: "Gamelan is inseparable from Javanese spiritual life. It accompanies wayang (shadow puppet) performances, court dances, and sacred rituals. UNESCO recognizes it as Intangible Cultural Heritage of Humanity.",
      id: "Gamelan tak terpisahkan dari kehidupan spiritual Jawa. Mengiringi pertunjukan wayang, tari istana, dan ritual sakral. UNESCO mengakuinya sebagai Warisan Budaya Tak Benda Kemanusiaan.",
    },
    origin: { en: "Yogyakarta Sultanate", id: "Kesultanan Yogyakarta" },
    modelType: "cylinder",
    modelColor: "#B8860B",
  },
  {
    id: "wayang-kulit",
    name: { en: "Wayang Kulit", id: "Wayang Kulit" },
    category: "artifact",
    image: "/images/wayang.png",
    description: {
      en: "Wayang Kulit is a traditional shadow puppet made from intricately carved buffalo hide. The puppets depict characters from the Ramayana and Mahabharata epics, brought to life by a master puppeteer (dalang).",
      id: "Wayang Kulit adalah boneka bayangan tradisional yang dibuat dari kulit kerbau yang diukir dengan rumit. Boneka menggambarkan karakter dari epos Ramayana dan Mahabharata, dihidupkan oleh dalang.",
    },
    history: {
      en: "Wayang has been performed in Java for over a thousand years, with the earliest records dating to the 11th century. The Yogyakarta palace has maintained its own wayang tradition, with distinct characters and storylines.",
      id: "Wayang telah dipentaskan di Jawa selama lebih dari seribu tahun, dengan catatan paling awal berasal dari abad ke-11. Keraton Yogyakarta mempertahankan tradisi wayang tersendiri, dengan karakter dan alur cerita yang khas.",
    },
    philosophy: {
      en: "Wayang teaches that life is a play of shadows — what we see is not always reality. The dalang represents the creator, while the screen represents the world. Characters embody virtues and vices, teaching moral lessons.",
      id: "Wayang mengajarkan bahwa hidup adalah permainan bayangan — apa yang kita lihat tidak selalu kenyataan. Dalang melambangkan sang pencipta, sedangkan layar melambangkan dunia. Karakter mewujudkan kebajikan dan keburukan, mengajarkan pelajaran moral.",
    },
    culturalMeaning: {
      en: "Wayang Kulit is a UNESCO Masterpiece of Intangible Cultural Heritage. It serves as entertainment, education, and spiritual meditation. All-night performances are held during important life events and ceremonies.",
      id: "Wayang Kulit adalah Mahakarya Warisan Budaya Tak Benda UNESCO. Berfungsi sebagai hiburan, pendidikan, dan meditasi spiritual. Pertunjukan semalam suntuk diadakan selama acara kehidupan penting dan upacara.",
    },
    origin: { en: "Java, Indonesia", id: "Jawa, Indonesia" },
    modelType: "icosahedron",
    modelColor: "#A0522D",
  },
  {
    id: "batik-kawung",
    name: { en: "Batik Kawung", id: "Batik Kawung" },
    category: "batik",
    image: "/images/batik-kawung.png",
    description: {
      en: "Batik Kawung features a geometric pattern of intersecting circles that form a four-petaled flower or cross shape. It is one of the oldest batik motifs, found in ancient Javanese temple carvings.",
      id: "Batik Kawung menampilkan pola geometris lingkaran berpotongan yang membentuk bunga empat kelopak atau bentuk silang. Ini adalah salah satu motif batik tertua, ditemukan dalam ukiran candi Jawa kuno.",
    },
    history: {
      en: "The Kawung pattern appears on the statue of King Airlangga (11th century) at Belahan temple, making it one of the oldest documented batik patterns. It was reserved for the royal family of Yogyakarta until the 20th century.",
      id: "Pola Kawung muncul pada patung Raja Airlangga (abad ke-11) di candi Belahan, menjadikannya salah satu pola batik tertua yang terdokumentasi. Motif ini khusus untuk keluarga kerajaan Yogyakarta hingga abad ke-20.",
    },
    philosophy: {
      en: "The four-circle pattern represents the four cardinal directions and the universal order. The center point symbolizes the source of energy and life. Kawung teaches about balance, purity, and the cyclical nature of existence.",
      id: "Pola empat lingkaran melambangkan empat arah mata angin dan tatanan universal. Titik pusat melambangkan sumber energi dan kehidupan. Kawung mengajarkan tentang keseimbangan, kemurnian, dan sifat siklus keberadaan.",
    },
    culturalMeaning: {
      en: "Kawung motif symbolizes purity and self-control. In the Yogyakarta court, it represents hope that the wearer will become a leader who is just, wise, and serves as a source of inspiration for others.",
      id: "Motif Kawung melambangkan kemurnian dan pengendalian diri. Di keraton Yogyakarta, melambangkan harapan agar pemakainya menjadi pemimpin yang adil, bijaksana, dan menjadi sumber inspirasi bagi orang lain.",
    },
    origin: { en: "Yogyakarta Palace", id: "Keraton Yogyakarta" },
    modelType: "torus",
    modelColor: "#4A3728",
  },
];

export function getCulturalObject(id: string): CulturalObject | undefined {
  return culturalObjects.find((obj) => obj.id === id);
}

export function getCulturalObjectsByCategory(
  category: string,
): CulturalObject[] {
  if (category === "all") return culturalObjects;
  return culturalObjects.filter((obj) => obj.category === category);
}

export const categories = [
  "all",
  "batik",
  "weapon",
  "clothing",
  "artifact",
  "instrument",
] as const;

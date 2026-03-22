export interface Sticker {
  id: string;
  name: string;
  image: string;
  tags?: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
  stickers: Sticker[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "gaming",
    name: "Gaming",
    icon: "🎮",
    description: "Epic stickers from your favorite games",
    subCategories: [
      {
        id: "minecraft",
        name: "Minecraft",
        icon: "⛏️",
        stickers: [
          { id: "mc-1", name: "Creeper", image: "/mc-creeper.png" },
          { id: "mc-2", name: "Steve", image: "/mc-steve.png" },
          { id: "mc-3", name: "Alex", image: "/mc-alex.png" },
          { id: "mc-4", name: "Enderman", image: "/mc-enderman.png" },
          { id: "mc-5", name: "Iron Golem", image: "/mc-iron-golem.png" },
        ],
      },
      {
        id: "fortnite",
        name: "Fortnite",
        icon: "🔫",
        stickers: [
          { id: "fn-1", name: "Default Skin", image: "https://placehold.co/200x200/7b2d8b/ffffff?text=Default" },
          { id: "fn-2", name: "Llama", image: "https://placehold.co/200x200/e8c547/ffffff?text=Llama" },
          { id: "fn-3", name: "Victory Royale", image: "https://placehold.co/200x200/ffd700/000000?text=Victory!" },
          { id: "fn-4", name: "Supply Drop", image: "https://placehold.co/200x200/4169e1/ffffff?text=Supply" },
          { id: "fn-5", name: "Storm Eye", image: "https://placehold.co/200x200/8b008b/ffffff?text=Storm" },
          { id: "fn-6", name: "Battle Bus", image: "https://placehold.co/200x200/ff8c00/ffffff?text=Battle+Bus" },
        ],
      },
      {
        id: "genshin",
        name: "Genshin Impact",
        icon: "🌟",
        stickers: [
          { id: "gi-1", name: "Lumine", image: "https://placehold.co/200x200/f5d776/000000?text=Lumine" },
          { id: "gi-2", name: "Paimon", image: "https://placehold.co/200x200/c9b8f5/000000?text=Paimon" },
          { id: "gi-3", name: "Venti", image: "https://placehold.co/200x200/6fa3ef/ffffff?text=Venti" },
          { id: "gi-4", name: "Hu Tao", image: "https://placehold.co/200x200/e05c34/ffffff?text=Hu+Tao" },
          { id: "gi-5", name: "Zhongli", image: "https://placehold.co/200x200/c9a84c/ffffff?text=Zhongli" },
          { id: "gi-6", name: "Raiden", image: "https://placehold.co/200x200/7b5ea7/ffffff?text=Raiden" },
        ],
      },
      {
        id: "valorant",
        name: "Valorant",
        icon: "🎯",
        stickers: [
          { id: "vl-1", name: "Jett", image: "/vl-jett.png" },
          { id: "vl-2", name: "Reyna", image: "/vl-reyna.png" },
          { id: "vl-3", name: "Sova", image: "/vl-sova.png" },
          { id: "vl-4", name: "Sova Funny", image: "/vl-sova-funny.png" },
          { id: "vl-5", name: "Phoenix", image: "/vl-phoenix.png" },
          { id: "vl-6", name: "Sage", image: "/vl-sage.png" },
          { id: "vl-7", name: "Killjoy", image: "/vl-killjoy.png" },
        ],
      },
      {
        id: "mortal-kombat",
        name: "Mortal Kombat",
        icon: "🥊",
        stickers: [
          { id: "mk-1", name: "Scorpion", image: "/mk-scorpion.png" },
          { id: "mk-2", name: "Shao Kahn", image: "/mk-shao-khan.png" },
          { id: "mk-3", name: "Liu Kang", image: "/mk-liu-kang.png" },
          { id: "mk-4", name: "Noob Saibot", image: "/mk-noob-saibot.png" },
          { id: "mk-5", name: "Erron Black", image: "/mk-erron-black.png" },
        ],
      },
    ],
  },
  {
    id: "anime",
    name: "Anime",
    icon: "🌸",
    description: "Stickers from the best anime series",
    subCategories: [
      {
        id: "naruto",
        name: "Naruto",
        icon: "🍃",
        stickers: [
          { id: "nr-1", name: "Naruto", image: "https://placehold.co/200x200/ff9900/ffffff?text=Naruto" },
          { id: "nr-2", name: "Sasuke", image: "https://placehold.co/200x200/1a1a2e/ffffff?text=Sasuke" },
          { id: "nr-3", name: "Sakura", image: "https://placehold.co/200x200/ff69b4/ffffff?text=Sakura" },
          { id: "nr-4", name: "Kakashi", image: "https://placehold.co/200x200/778899/ffffff?text=Kakashi" },
        ],
      },
      {
        id: "aot",
        name: "Attack on Titan",
        icon: "⚔️",
        stickers: [
          { id: "aot-1", name: "Eren", image: "https://placehold.co/200x200/556b2f/ffffff?text=Eren" },
          { id: "aot-2", name: "Levi", image: "https://placehold.co/200x200/708090/ffffff?text=Levi" },
          { id: "aot-3", name: "Mikasa", image: "https://placehold.co/200x200/8b0000/ffffff?text=Mikasa" },
          { id: "aot-4", name: "Armin", image: "https://placehold.co/200x200/f0e68c/000000?text=Armin" },
        ],
      },
    ],
  },
  {
    id: "memes",
    name: "Memes",
    icon: "😂",
    description: "The funniest meme stickers on the internet",
    subCategories: [
      {
        id: "classic-memes",
        name: "Classic Memes",
        icon: "😎",
        stickers: [
          { id: "mm-1", name: "Doge", image: "https://placehold.co/200x200/f5deb3/000000?text=Doge" },
          { id: "mm-2", name: "Pepe", image: "https://placehold.co/200x200/4caf50/ffffff?text=Pepe" },
          { id: "mm-3", name: "This is Fine", image: "https://placehold.co/200x200/ff6b35/ffffff?text=Fine" },
          { id: "mm-4", name: "Stonks", image: "https://placehold.co/200x200/1a73e8/ffffff?text=Stonks" },
        ],
      },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    icon: "⚽",
    description: "Show your team spirit with sports stickers",
    subCategories: [
      {
        id: "football",
        name: "Football",
        icon: "⚽",
        stickers: [
          { id: "sp-1", name: "Goal!", image: "https://placehold.co/200x200/228b22/ffffff?text=GOAL!" },
          { id: "sp-2", name: "Trophy", image: "https://placehold.co/200x200/ffd700/000000?text=Trophy" },
          { id: "sp-3", name: "Red Card", image: "https://placehold.co/200x200/dc143c/ffffff?text=Red+Card" },
          { id: "sp-4", name: "Fan", image: "https://placehold.co/200x200/4169e1/ffffff?text=Fan" },
        ],
      },
    ],
  },
];

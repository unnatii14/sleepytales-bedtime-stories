import { useState } from 'react';
import { Home as HomeIcon, BookOpen, Music as MusicIcon, Heart } from 'lucide-react';
import { Home } from './components/Home';
import { StoryLibrary } from './components/StoryLibrary';
import { StoryPlayer } from './components/StoryPlayer';
import { MusicPlayer } from './components/MusicPlayer';
import { Favorites } from './components/Favorites';

export type Screen = 'home' | 'stories' | 'story-player' | 'music' | 'favorites';

export interface Story {
  id: string;
  title: string;
  genre: string;
  duration: string;
  ageRange: string;
  coverImage: string;
  text: string;
  rating: number;
  isFavorite: boolean;
}

export interface Music {
  id: string;
  name: string;
  type: string;
  icon: string;
  isPlaying: boolean;
}

export interface Rhyme {
  id: string;
  title: string;
  emoji: string;
  audio: string; // MP3 filename in /music
  isPlaying: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: "The Little Squirrel's Wish",
      genre: 'Animals',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600',
      text: 'In the heart of a green forest lived a small squirrel named Nino. Every morning, he looked up at the tall oak tree and sighed. "If only I were big and tall like you," he said. The oak chuckled softly, its branches swaying in the wind. "Every creature has its part to play, little one."\n\nNino didn\'t believe it. He wanted to reach the stars, to see above the clouds. So one night, while the forest slept, he asked a friendly firefly, "Can you make me big and strong like the oak?"\n\nThe firefly blinked warmly. "Maybe what you really need is to see how special you already are."\n\nThe next morning, dark clouds rolled in, and soon the forest was soaked with rain. The birds\' nests shook, and the oak\'s high branches were too slippery to climb. But Nino, being small and quick, darted from root to root, collecting fallen acorns and tucking them into dry burrows to save for later.\n\nWhen the rain ended, the birds cheered for Nino. The oak said proudly, "See? You can do what even I cannot."\n\nThat evening, Nino watched the sunset through the leaves and smiled. Sometimes, the smallest hearts carry the greatest strength.\n\n✨ Moral: Everyone is special in their own way.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '2',
      title: "The Sleepy Moon's Lullaby",
      genre: 'Space',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=600',
      text: 'High above the quiet world floated the moon, glowing like a gentle lantern in the sky. Every night, she watched over the sleepy villages and sparkling rivers below. But one evening, the moon felt unusually tired. Her glow dimmed, and she whispered, "I wish someone could sing me a lullaby for once."\n\nA tiny star named Lumi heard her soft wish. Lumi wasn\'t very bright compared to the other stars, and she often felt overlooked. Still, she twinkled closer and asked, "Would you like me to sing for you?"\n\nThe moon smiled. "I would love that."\n\nLumi had never sung for anyone before. Her voice was small and a little shaky. But as she sang her gentle melody, the entire night sky seemed to lean in and listen. Shooting stars slowed their trails, the clouds drifted softly, and even the wind grew quiet.\n\nThe moon\'s glow brightened again, warming the sky with a silver hush.\n\n"You have the sweetest lullaby," she said. "I didn\'t know stars could sing so beautifully."\n\nLumi blushed and shimmered brighter than she ever had before.\n\nFrom that night on, whenever the moon felt tired, Lumi would drift close and sing her soft lullaby—reminding her that even the smallest star can bring the greatest comfort.\n\n✨ Moral: Your gentle light can brighten someone\'s whole world.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '3',
      title: 'The Cloud Who Wanted to Be Rain',
      genre: 'Nature stories',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600',
      text: 'In the wide, open sky floated a fluffy white cloud named Piko. While other clouds drifted lazily, Piko had a dream. "I wish I could become rain," he said. "Rain helps flowers grow and fills the rivers. I want to do something important too."\n\nBut each time Piko tried to gather water, the wind would giggle and push him aside. "You\'re too light and small," the wind teased playfully. "Maybe just float for now."\n\nPiko felt discouraged. He admired the big gray clouds who rumbled proudly and poured rain across the land. "One day," he whispered, "I\'ll help the Earth too."\n\nOne afternoon, the world below grew thirsty. The grass turned dull, the ponds shrank, and the flowers drooped. The large clouds were far away, drifting slowly. Piko felt a warm pull inside his fluffy heart.\n\n"I have to try," he said.\n\nHe gathered all the water he could hold. He squeezed himself, just a little—and suddenly, tiny, delicate raindrops drifted down.\n\nThe flowers lifted their heads. The grass brightened. Children looked up and giggled as the soft drizzle kissed their cheeks.\n\nWhen Piko finally floated lighter again, the wind whispered, "Looks like you were ready after all."\n\nPiko smiled, glowing with pride. He didn\'t need to be big—just brave enough to begin.\n\n✨ Moral: You become important by simply doing what you can.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '4',
      title: 'The Turtle Who Chased the Sunset',
      genre: 'Adventures',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600',
      text: 'On a quiet shore lived a small turtle named Mino. Every evening, he watched the sunset paint the sky in orange and gold. "One day," Mino said, "I\'ll catch the sunset and see where it sleeps."\n\nThe crabs laughed softly. "The sunset moves too fast," they said. "And you move too slow."\n\nBut Mino didn\'t mind. He waited for the warm glow to appear and began his slow journey across the sand. Step by tiny step, he followed the fading colors.\n\nNight crept in. The stars peeked out. And before long, the sunset was gone.\n\nMino sighed. "I tried my best… but I\'m still far behind."\n\nA gentle wave rolled in and touched his shell. "Look behind you," whispered the ocean.\n\nWhen Mino turned, he gasped. His path across the beach glowed with shimmering moonlight, reflecting the sunset\'s leftover colors. The shells sparkled, the sand glowed silver, and the whole shoreline looked magical—because of the trail he had made.\n\n"You didn\'t catch the sunset," the ocean murmured, "but you created your own beauty along the way."\n\nMino smiled, warmed from shell to heart. He didn\'t need to chase the sunset anymore. He simply needed to keep moving and let the world shine behind him.\n\n✨ Moral: Sometimes the journey is more beautiful than the destination.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '5',
      title: "The Sleepy Dragon Who Couldn't Roar",
      genre: 'Magical world',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1615963244664-5b845b2025ee?w=600',
      text: 'Deep inside a cozy mountain cave lived a tiny dragon named Pibo. Unlike other dragons, Pibo didn\'t have a fierce roar. Whenever he tried, all that came out was a soft, squeaky "peep."\n\nOther dragons would laugh gently. "You\'ll roar one day," they said, but Pibo wasn\'t so sure.\n\nOne chilly night, a snowstorm blew across the mountains. The baby animals in the forest shivered and huddled under trembling branches. Their homes were filled with snow, and the winds howled loudly.\n\nPibo heard their cries and rushed down the mountain. When he tried to roar the storm away, he squeaked again—"peeeep!"\n\nThe wind didn\'t stop.\n\nPibo didn\'t give up. He inhaled, closed his eyes, and pushed out all the warmth he had inside—not as a roar, but as a gentle, glowing breath.\n\nA warm golden mist floated from his mouth, drifting over the forest like a soft blanket. The snow melted into tiny sparkles. The trees warmed. The little animals cuddled into the glowing air, sighing with relief.\n\nWhen morning arrived, they circled around Pibo. "Your warm breath saved us," said a baby rabbit. "We don\'t need a roar. We like you just as you are."\n\nPibo\'s heart glowed brighter than any flame he could breathe.\n\n✨ Moral: Your gentle gifts matter—even if they\'re different.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '6',
      title: 'The Lantern of Little Lila',
      genre: 'Fairy tales',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600',
      text: 'In a quiet village lived a tiny girl named Lila who loved collecting small things—pebbles, feathers, and shiny leaves. One evening, she found a little lantern lying near a stream. It was warm to the touch, and a faint golden glow flickered inside.\n\nLila carried it home and whispered, "I wish I knew what you were." The lantern shimmered, and a tiny voice replied, "I\'m a wish lantern. I glow brightest when someone makes a kind wish."\n\nSurprised but delighted, Lila held the lantern close. She didn\'t wish for toys or sweets. Instead, she whispered, "I wish my grandma sleeps better tonight." The lantern glowed brighter.\n\nThe next day, she wished for her neighbor\'s sick puppy to feel stronger. The glow brightened again. Each kind wish made the lantern shine like a warm sunrise.\n\nOne night, a big storm hit the village. The lantern\'s soft light helped villagers find their way to shelter. When the storm passed, everyone thanked Lila for her gentle wishes.\n\nThe lantern sparkled proudly, whispering, "Kindness makes the world glow."\n\n✨ Moral: Kindness is the brightest light of all.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '7',
      title: 'The Swan Who Lost Her Reflection',
      genre: 'Moral stories',
      duration: '3 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=600',
      text: 'By a peaceful lake lived a graceful swan named Mira. Every morning, she admired her reflection in the still water. But one day, the wind blew strong, making ripples that erased her reflection completely.\n\n"Oh no… I\'ve disappeared!" she cried.\n\nA wise old turtle chuckled. "You\'re still here, my dear. The water is just restless today." But Mira didn\'t believe him. She wandered to find a new mirror—shiny stones, puddles, even a polished leaf—but none showed her reflection clearly.\n\nFeeling sad, she sat by the lake. Soon, little ducklings waddled over. "Mira, can you help us learn to swim?" they asked.\n\nShe forgot her worries and guided them gently across the lake, keeping them safe from deeper water. Their happy splashes slowly calmed the lake\'s surface.\n\nWhen Mira looked down again—there she was, her reflection soft and clear.\n\nThe turtle smiled. "See? You don\'t vanish when life gets messy. You shine brightest when you\'re helping others."\n\n✨ Moral: Your true self isn\'t found in mirrors, but in your actions.',
      rating: 4.7,
      isFavorite: false
    },
    {
      id: '8',
      title: 'The Brave Little Penguin',
      genre: 'Animals',
      duration: '3 min',
      ageRange: '3-5',
      coverImage: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=600',
      text: 'On a snowy cliff lived a small penguin named Piku. Unlike the others, he was afraid to slide on ice. "What if I go too fast?" he worried.\n\nOne morning, the penguins prepared for their daily ice-slide to the sea. Piku stayed behind, shivering with fear. A kind seal swam close and said, "Courage isn\'t about being fearless, little one. It\'s about trying anyway."\n\nPiku gulped but waddled to the edge. He took a deep breath—and slipped. For a moment, he slid too quickly, but then the cold wind felt fun, and he laughed as he reached the bottom safely.\n\nDown by the sea, he spotted a baby penguin stuck on a snow mound. Using his new confidence, Piku climbed up and helped the little one down.\n\nWhen they returned, everyone cheered for him. Piku beamed with pride. "I guess bravery grows once you give it a chance," he said.\n\n✨ Moral: Courage begins with one small step.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '9',
      title: 'The Moon That Wanted to Dream',
      genre: 'Space',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600',
      text: 'High above the clouds floated Luna, the glowing moon. Every night, she watched people sleep peacefully and wondered, "Do moons dream too?"\n\nBut moons never slept—they had to stay bright for travelers and dreamers. Still, Luna wished she could dream just once.\n\nOne evening, a passing comet noticed her sigh and asked, "Why so quiet, Luna?"\n\nShe shared her wish. The comet smiled. "Close your eyes for just one breath. I\'ll shine for you."\n\nLuna hesitated, then gently dimmed her glow. For a single magical moment, she drifted into a dream—floating through forests, touching ocean waves, dancing with fireflies. It was beautiful.\n\nWhen she opened her eyes, the comet winked. "Dreams aren\'t just for sleepers. They\'re for wishers too."\n\nThat night, Luna shone brighter than ever.\n\n✨ Moral: Everyone deserves a moment to dream.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '10',
      title: 'The Turtle Who Wanted to Fly',
      genre: 'Adventures',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600',
      text: 'Timo the turtle loved watching birds soar high above the ocean. "Oh, how I wish I could fly," he said every morning.\n\nThe seagulls chuckled kindly. "But you\'re a wonderful swimmer!"\n\nStill, Timo dreamed of flying. One day, he found a tall sand dune and climbed it slowly. At the top, he stretched his flippers and leapt—only to tumble safely into the soft sand.\n\nFeeling discouraged, he walked to the water. There, a baby dolphin splashed sadly. "I want to reach the deep water, but I\'m scared," said the dolphin.\n\nTimo felt a spark of courage. "I can help!" With gentle pushes and slow guidance, he helped the baby dolphin swim confidently into the deeper blue.\n\nThe dolphin giggled happily. "You made me feel like I was flying!"\n\nTimo realized he didn\'t need wings. When he swam through the sparkling waves with the dolphin beside him, he felt lighter than ever—almost like flying underwater.\n\n✨ Moral: You don\'t need wings to feel free—your strengths can lift you too.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '11',
      title: 'The Sleepy Bear and the Midnight Star',
      genre: 'Animals',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600',
      text: 'Deep in the mountains lived a young bear named Bruni, who had trouble falling asleep. Every night, he tossed and turned in his cozy den. "If only I could find something calm to watch," he sighed.\n\nOne night, while wandering outside, he noticed a tiny star twinkling brighter than the rest. It flickered gently, almost like it was calling him.\n\nBruni whispered, "Are you awake too?"\n\nThe star shimmered warmly. "I watch over the creatures who can\'t sleep. Would you like company?"\n\nBruni nodded and sat beside a tall pine tree. The star began telling soft stories—of clouds floating across the sky, of breezes carrying lullabies, of moonbeams dancing on lakes.\n\nAs Bruni listened, his heavy eyelids began to close. "Thank you…" he murmured sleepily.\n\nThe star shone gently until Bruni drifted into the deepest, coziest slumber.\n\nFrom that night forward, whenever he struggled to sleep, Bruni looked for the tiny midnight star—his glowing friend in the sky.\n\n✨ Moral: Even in restless moments, gentle company can bring peace.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '12',
      title: 'The Butterfly Who Followed the Wind',
      genre: 'Nature stories',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
      text: 'In a sunny meadow lived a bright blue butterfly named Bree. But Bree never liked staying in one place. When the wind blew east, she followed it. When it blew west, she floated right behind.\n\n"I want to discover every corner of the world!" she said proudly.\n\nOne day, the wind grew strong and carried Bree far from the meadow. She drifted over rivers, hills, and forests, seeing wonders she had never imagined. But soon, she felt tired and homesick.\n\nShe fluttered to a resting branch and sighed. "I\'ve seen so much… but where do I belong?"\n\nA gentle gust brushed her wings. "Home isn\'t the place you stay," whispered the wind. "It\'s the place your heart always returns to."\n\nWith renewed strength, Bree followed the soft breeze all the way back to the meadow. Her friends rushed to greet her joyfully.\n\nBree smiled. "I can explore the world and still have a place to come back to."\n\n✨ Moral: Adventure is wonderful, but there\'s comfort in returning home.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '13',
      title: "The Dolphin's Secret Song",
      genre: 'Animals',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=600',
      text: 'In the deep blue ocean lived a young dolphin named Dali who carried a secret—he had a beautiful singing voice, but he was too shy to use it. Whenever the others sang, Dali stayed quietly behind, humming softly to himself.\n\nOne evening, while exploring a coral cave, Dali heard someone crying. It was a little sea snail who had lost her pearl. "I can\'t find it anywhere," she sniffled.\n\nDali wanted to comfort her, but words felt too small. So he took a deep breath and began singing the softest, warmest melody.\n\nThe sea seemed to glow as the notes echoed through the water. The snail stopped crying, her tiny eyes widening with joy. "Your song… it\'s magical!"\n\nThe melody gently vibrated through the cave until—ping!—the missing pearl rolled out from a hidden nook.\n\nWhen they returned, the sea creatures gathered curiously. "Sing for us too!" they asked.\n\nDali blushed, but remembering how his song had helped, he sang again—this time louder, braver, brighter.\n\nThe ocean shimmered with pride.\n\n✨ Moral: Your gifts can bring comfort and joy—don\'t hide them.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '14',
      title: 'The Fox Who Collected Sunbeams',
      genre: 'Nature stories',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600',
      text: 'Firo the fox loved sunlight more than anything. Every evening, he sat on a hill and watched golden rays stretch across the trees. One day he wondered, "Can I collect sunbeams and keep them with me?"\n\nSo he gathered glass jars and ran through the forest at sunset, trying to trap the glowing beams inside. But no matter how quickly he closed the lid, the light slipped away.\n\nFeeling disappointed, Firo sat quietly until a gentle doe approached. "Why do you chase the sun?" she asked.\n\n"I want to keep its warmth forever," Firo sighed.\n\nThe doe smiled. "Sunlight can\'t be stored in jars. But it can be stored in memories."\n\nTogether, they watched the sky turn orange, pink, and gold. The colors filled Firo\'s heart with a gentle warmth he realized would stay even after the sun disappeared.\n\nThat night, as he curled into his den, he whispered, "Sunbeams belong in the sky, but their warmth belongs in us."\n\n✨ Moral: The most beautiful things are felt, not captured.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '15',
      title: 'The Dove Who Delivered Dreams',
      genre: 'Fairy tales',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=600',
      text: 'In a quiet village lived a graceful dove named Danya, known for her gentle wings and kind heart. Each night, she watched children fall asleep, wondering what dreams they\'d have.\n\nOne evening, she found a shimmering pouch beneath an old willow tree. Inside were tiny sparkles that glowed like morning dew. A whisper rose from the pouch: "Dream dust. Deliver it with love."\n\nDanya fluttered from house to house, sprinkling a little dream dust near every window. Children slept peacefully, smiling as they drifted into warm, happy dreams of adventures, laughter, and gentle skies.\n\nBut at one cottage, she found a child twisting restlessly. Danya landed softly and spread her wings in a warm embrace. The dream dust shimmered brighter, and the child finally relaxed.\n\nAs dawn approached, the pouch emptied and disappeared like mist. Danya looked around at the peaceful village and felt proud.\n\nShe didn\'t need magic to bring comfort—her kindness already carried dreams.\n\n✨ Moral: A gentle heart can bring peace to others.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '16',
      title: 'The Curious Owl and the Lost Star',
      genre: 'Space',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1563473213013-de2a0133c100?w=600',
      text: 'In a tall oak tree lived a curious owl named Ollie. Every night, he gazed at the stars and wondered about their secrets. One evening, he noticed something strange—a small star was wobbling in the sky, losing its sparkle.\n\n"Are you okay?" Ollie hooted gently.\n\nThe star trembled. "I\'ve lost my way home to the constellation. Without my star family, I can\'t shine properly."\n\nOllie\'s heart softened. "I\'ll help you find them!"\n\nTogether they soared through the night sky. Ollie asked the moon, the clouds, and even passing comets for directions. Finally, they found the constellation—a beautiful pattern of bright stars waiting.\n\nThe little star rushed to join them, and instantly, all the stars shone brighter, including the lost one.\n\n"Thank you, wise owl," the star twinkled. "Sometimes we just need a friend to help us find our way."\n\nOllie flew back to his tree, his heart glowing as bright as any star.\n\n✨ Moral: Helping others find their place makes the whole world shine brighter.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '17',
      title: 'The Sleepy Sunflower',
      genre: 'Nature stories',
      duration: '3 min',
      ageRange: '2-5',
      coverImage: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=600',
      text: 'In a sunny garden grew a cheerful sunflower named Sunny. All day, she followed the sun across the sky, soaking up its warm rays. But when evening came, Sunny never wanted to sleep.\n\n"I don\'t want to miss anything!" she said, keeping her petals wide open even in the dark.\n\nThe moon floated by and whispered softly, "Dear sunflower, even the sun needs to rest. That\'s how it shines so brightly tomorrow."\n\nBut Sunny was stubborn. Night after night, she refused to close her petals. Soon, her bright yellow color began to fade, and she felt tired and droopy.\n\nOne evening, a gentle butterfly landed on her stem. "Why so sad, Sunny?"\n\n"I wanted to stay awake forever, but now I\'m too tired to enjoy anything," she sighed.\n\nThe butterfly smiled. "Rest isn\'t giving up—it\'s how you prepare for tomorrow\'s sunshine."\n\nThat night, Sunny finally closed her petals and slept deeply. When morning came, she felt refreshed, golden, and more beautiful than ever.\n\n✨ Moral: Rest helps us shine our brightest.',
      rating: 4.7,
      isFavorite: false
    },
    {
      id: '18',
      title: 'The Rabbit and the Shooting Star',
      genre: 'Adventures',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600',
      text: 'Little Rosie the rabbit loved making wishes. Every night, she hopped to the top of a hill and waited for shooting stars. "If I could catch one," she thought, "I could make wishes come true for everyone!"\n\nOne magical evening, a shooting star streaked across the sky—and landed right beside her with a soft sparkle!\n\n"You caught me!" the star giggled, glowing brightly. "I\'ll grant you one wish."\n\nRosie thought hard. She could wish for carrots, a cozy burrow, or endless playtime. But then she looked at the peaceful valley below, where all her friends were sleeping.\n\n"I wish for everyone to have sweet dreams tonight," she whispered.\n\nThe star shimmered warmly. "That\'s the kindest wish I\'ve ever heard." It burst into thousands of tiny sparkles that drifted down like gentle snow, covering the valley in a soft, dreamy glow.\n\nThat night, every creature slept peacefully with the happiest dreams.\n\nRosie smiled, feeling her heart warm. Sometimes the best wishes aren\'t for ourselves.\n\n✨ Moral: Kindness to others fills your own heart with joy.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '19',
      title: 'The Whispering Willow Tree',
      genre: 'Nature stories',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600',
      text: 'In a peaceful meadow stood an ancient willow tree named Willa. Her long branches swayed gently in the breeze, and children loved to rest in her shade. But Willa had a secret—she could whisper soft words of comfort to anyone feeling sad.\n\nOne afternoon, a little girl sat beneath Willa\'s branches, crying. "I miss my grandmother," she sniffled.\n\nWilla\'s leaves rustled gently, and a soft whisper floated down: "Love never leaves. It stays in every warm memory, every smile, every gentle breeze that reminds you of her."\n\nThe girl looked up, feeling a peaceful warmth wrap around her like a hug. The wind carried the sweet scent of flowers her grandmother loved.\n\nFrom that day on, whenever someone felt lonely or sad, they would visit Willa. Her gentle whispers reminded them that comfort can be found in nature, in memories, and in the quiet moments that heal our hearts.\n\nThe meadow became a place of peace, all thanks to one caring tree.\n\n✨ Moral: Gentle words can heal heavy hearts.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '20',
      title: 'The Lost Baby Whale',
      genre: 'Animals',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      text: 'In the vast blue ocean swam a baby whale named Willow. She loved exploring coral reefs and playing with fish, but one day, she swam too far and couldn\'t find her pod.\n\n"Mama? Papa?" she called out, her voice echoing through the empty water.\n\nA friendly sea turtle named Shelly paddled over. "Don\'t worry, little one. Let\'s find your family together."\n\nThey swam through kelp forests and over sandy plains. Along the way, dolphins, jellyfish, and even a wise old octopus helped guide them. Everyone wanted to help Willow get home.\n\nFinally, they heard a familiar sound—whale songs in the distance! Willow\'s heart leaped with joy. She swam as fast as she could and found her family waiting with open flippers.\n\n"Thank you, friends!" Willow sang happily.\n\nShelly smiled. "That\'s what friends do—they help each other find the way home."\n\nFrom that day on, Willow never forgot the kindness of her ocean friends.\n\n✨ Moral: Friends help us find our way when we\'re lost.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '21',
      title: 'The Magical Music Box',
      genre: 'Magical world',
      duration: '5 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      text: 'In an old attic, a little boy named Leo found a dusty music box with golden stars painted on it. When he opened it, a gentle melody filled the room, and something magical happened—tiny glowing fireflies appeared, dancing to the music!\n\nEach night, Leo would wind up the music box, and the fireflies would come. They danced in patterns that looked like stories—a princess in a tower, a knight on a quest, a dragon learning to be kind.\n\nOne evening, Leo felt sad because he was moving to a new town. "I\'ll miss my friends," he told the music box.\n\nAs the melody played, the fireflies formed new shapes—children playing together, hands waving goodbye, and then holding hands again. The message was clear: true friends stay in your heart, no matter where you go.\n\nLeo smiled through his tears. He carefully packed the music box, knowing it would comfort him in his new home.\n\nAnd on his first night in the new house, when he opened the music box, the fireflies came again—reminding him that magic and friendship follow you wherever you go.\n\n✨ Moral: True connections live in our hearts forever.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '22',
      title: 'The Sleepy Sloth',
      genre: 'Animals',
      duration: '3 min',
      ageRange: '2-5',
      coverImage: 'https://images.unsplash.com/photo-1621522567494-f9e1dae456d3?w=600',
      text: 'High in the rainforest lived a sloth named Sammy. While other animals rushed around, Sammy moved slowly and loved taking long naps. The monkeys teased him gently. "You\'re missing all the fun, Sammy!"\n\nBut Sammy just smiled. "I\'m not missing anything. I\'m enjoying everything slowly."\n\nOne busy day, all the animals were rushing to find the ripest fruit before it was gone. They ran, jumped, and climbed frantically. But in their hurry, they didn\'t notice the beautiful flowers blooming, the butterflies dancing, or the gentle rain starting to fall.\n\nSammy, moving at his own slow pace, saw it all. He picked a perfect fruit that others had overlooked, rested under a flower-covered branch, and felt the cool rain on his fur.\n\nBy evening, the other animals were exhausted. They found Sammy resting peacefully, a content smile on his face.\n\n"How do you always look so happy?" asked the monkey.\n\nSammy yawned gently. "Because I take time to enjoy the journey."\n\nThat night, the animals slept more peacefully, remembering to slow down.\n\n✨ Moral: Sometimes, going slow helps you enjoy life more.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '23',
      title: 'The Comet and the Lonely Planet',
      genre: 'Space',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=600',
      text: 'Far out in space floated a small planet named Petra. She orbited her sun quietly, watching comets and asteroids zip past. But they never stayed—they were always in a hurry.\n\n"I wish I had a friend," Petra sighed, feeling lonely in the vast darkness.\n\nOne day, a bright comet named Cosmo streaked by. But instead of rushing past, he slowed down. "Why so sad, little planet?"\n\nPetra explained that everyone was always too busy to visit. "I know I\'m small and not very exciting…"\n\n"Not true!" Cosmo exclaimed. "You\'re steady and calm. You\'re a perfect resting spot!" He decided to orbit Petra for a while, creating beautiful light trails around her.\n\nOther space travelers noticed the beautiful display. Soon, passing meteors, curious asteroids, and even a few moons came to visit, drawn by the warmth and peace Petra offered.\n\nPetra realized she didn\'t need to be flashy or fast. Her steady, gentle presence was exactly what made others want to stay.\n\nCosmo smiled. "See? You were never boring—you were a home."\n\n✨ Moral: Your quiet strength attracts those who truly matter.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '24',
      title: 'The Firefly Who Lost Her Light',
      genre: 'Moral stories',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600',
      text: 'In a warm summer meadow lived a firefly named Flora who had the brightest light of all. She loved lighting up the night and guiding her friends. But one evening, her light flickered and went out.\n\n"Oh no!" Flora cried. "Without my light, I\'m useless!"\n\nShe hid in the tall grass, feeling embarrassed and sad. Her friends searched for her everywhere. "Flora, where are you?" they called.\n\nFinally, a wise old cricket found her. "What\'s wrong, little one?"\n\n"I lost my light," Flora whispered. "I can\'t help anyone anymore."\n\nThe cricket smiled gently. "Is your light the only way you help? What about your kindness? Your cheerful spirit? The way you make others smile?"\n\nFlora thought about it. Even without her glow, she could still listen to her friends, share stories, and offer comfort.\n\nThat night, she sat with a lonely moth, sharing gentle words under the moonlight. The moth smiled, "Thank you, Flora. You made me feel less alone."\n\nSlowly, Flora\'s light began to glow again—not because she tried, but because kindness had rekindled it from within.\n\n✨ Moral: Your value isn\'t in what you do, but in who you are.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '25',
      title: 'The Little Lighthouse',
      genre: 'Adventures',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
      text: 'On a rocky shore stood a small lighthouse named Lucy. Every night, she shone her light across the dark sea, guiding ships safely to harbor. But Lucy felt small compared to the big lighthouses down the coast.\n\n"Their lights are so much brighter," she sighed. "I don\'t think I make much difference."\n\nOne stormy night, thick fog rolled in, and the big lighthouses\' beams couldn\'t cut through it. But Lucy\'s smaller, focused light was just right—steady and clear, perfect for the fog.\n\nA small fishing boat was lost in the mist, and the fisherman was frightened. Then he saw it—Lucy\'s warm, gentle glow guiding him home.\n\n"Thank you, little lighthouse!" he called out gratefully. "Your light saved me tonight!"\n\nThe other lighthouses heard the story and realized that each light, big or small, has its own important role.\n\nLucy never felt small again. She knew that even the gentlest light can guide someone home.\n\n✨ Moral: No act of kindness is too small to make a difference.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '26',
      title: 'The Elephant Who Painted Dreams',
      genre: 'Magical world',
      duration: '5 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600',
      text: 'In a magical forest lived an elephant named Ella who had a special gift—when she painted with her trunk, the pictures came alive in children\'s dreams.\n\nEvery evening, Ella would paint beautiful scenes: peaceful gardens, playful dolphins, gentle rainfall, and starry skies. That night, children everywhere would dream of the peaceful worlds she created.\n\nBut one day, Ella felt tired and uninspired. "What if I run out of ideas?" she worried. "What if my paintings aren\'t special anymore?"\n\nA small mouse who lived nearby noticed her sadness. "Why don\'t you paint what you dream about, Ella?"\n\nThat night, Ella closed her eyes and remembered her own childhood dreams—playing in rivers, dancing with fireflies, watching sunsets with her mother.\n\nThe next evening, she painted from her heart. The pictures glowed brighter than ever, filled with love and memories.\n\nChildren around the world had the most beautiful dreams, and Ella realized that the best art comes from the heart.\n\n✨ Moral: Your most authentic gifts come from within.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '27',
      title: 'The Cricket and the Silent Night',
      genre: 'Nature stories',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
      text: 'In a quiet meadow lived a cricket named Charlie who loved to chirp. Every evening, his cheerful song filled the air. But one night, he lost his voice.\n\n"No chirp?" he whispered hoarsely. "How will I share my song?"\n\nThe night felt too quiet. The other animals missed Charlie\'s music. A kind grasshopper hopped over. "Maybe you can make music differently tonight?"\n\nCharlie thought carefully. He rubbed his wings together gently, creating a soft, soothing rhythm—quieter than his usual chirp, but just as beautiful.\n\nA baby rabbit nearby, who usually had trouble sleeping, heard the gentle rhythm and finally relaxed. "That sound is perfect for bedtime," she yawned.\n\nOther animals gathered, enjoying the softer melody. "It\'s peaceful," said a wise owl. "Sometimes quiet music is exactly what we need."\n\nWhen Charlie\'s voice returned the next day, he remembered the lesson. Now he mixed loud, happy chirps with soft, gentle rhythms—creating songs for every mood.\n\n✨ Moral: There\'s more than one way to share your gifts.',
      rating: 4.7,
      isFavorite: false
    },
    {
      id: '28',
      title: 'The Snowy Owl and the Northern Lights',
      genre: 'Nature stories',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600',
      text: 'In the far north lived a snowy owl named Aurora. She loved watching the northern lights dance across the sky in waves of green, purple, and blue.\n\nOne night, the lights seemed dimmer than usual. Aurora flew higher, worried. "What\'s wrong?" she called to the sky.\n\nThe northern lights whispered back, "We shine brightest when the world below is peaceful and happy. But tonight, many creatures feel worried and sad."\n\nAurora knew what to do. She flew across the snowy landscape, visiting every den and burrow. She told stories, shared warmth with her soft wings, and listened to everyone\'s worries.\n\nSlowly, the creatures began to feel better. They smiled, laughed, and drifted to sleep peacefully.\n\nAs the last animal closed their eyes, Aurora looked up. The northern lights exploded in the most magnificent display ever—brilliant colors swirling and dancing in celebration.\n\n"Thank you, Aurora," they shimmered. "You reminded everyone that even in cold, dark times, warmth and kindness can make the world bright again."\n\n✨ Moral: Spreading joy makes the whole world brighter.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '29',
      title: 'The Caterpillar Who Was Afraid to Change',
      genre: 'Moral stories',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
      text: 'In a sunny garden lived a little caterpillar named Cara. She loved munching on leaves and crawling along branches. But one day, she felt strange. Her body wanted to change.\n\n"I don\'t want to!" Cara cried. "I like being a caterpillar!"\n\nAn older butterfly landed nearby. "I felt the same way once. Change is scary, but it leads to something beautiful."\n\n"But what if I don\'t like who I become?" Cara worried.\n\nThe butterfly smiled. "You\'ll still be you—just a new version, with new adventures waiting."\n\nCara thought about it. She trusted her friend and decided to be brave. She spun a cozy cocoon and rested inside.\n\nWeeks passed. When Cara finally emerged, she had beautiful wings! She fluttered up to a flower and gasped. "I can fly! I can see the whole garden!"\n\nThe world looked bigger, brighter, and full of possibilities.\n\nCara realized that change didn\'t erase who she was—it helped her grow into who she was meant to be.\n\n✨ Moral: Change can be scary, but it helps us grow.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '30',
      title: 'The Starfish and the Gentle Tide',
      genre: 'Nature stories',
      duration: '3 min',
      ageRange: '2-5',
      coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      text: 'On a peaceful beach lived a small starfish named Stella. Every morning, the tide would gently carry her to shore, and every evening, it would take her back to the sea.\n\nOne day, Stella felt scared. "What if the tide forgets me? What if I get stuck on the sand?"\n\nAn old sea turtle overheard her worry. "The tide has never forgotten anyone, little one. It always comes back."\n\n"But how can I be sure?" Stella asked.\n\nThe turtle smiled. "Because the ocean is patient and kind. It knows when you need to rest and when you need to return home."\n\nThat afternoon, Stella relaxed on the warm sand, watching children build sandcastles and seagulls dance in the breeze. She stopped worrying and simply enjoyed the moment.\n\nAs the sun began to set, she felt the gentle tide return, just as it always did, carrying her back into the cool, safe water.\n\nStella learned that some things in life are trustworthy—like the tide, like kindness, and like the rhythm of nature that always takes care of us.\n\n✨ Moral: Trust in the gentle rhythms of life.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '31',
      title: 'The Sleepy Train to Dreamland',
      genre: 'Adventures',
      duration: '5 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600',
      text: 'Every night at exactly nine o\'clock, a magical train appeared at the end of Maple Street. It was the Dreamland Express, and only children who were ready for bed could see it.\n\nOne evening, a curious boy named Timmy climbed aboard. The conductor, a friendly bear in a blue cap, smiled warmly. "Welcome! We\'re heading to Dreamland—please find a cozy seat."\n\nThe train chugged gently through clouds of cotton candy, past mountains made of pillows, and over bridges that sparkled like starlight. Each car was filled with soft blankets and twinkling lights.\n\nAlong the way, the train stopped to pick up other sleepy children. They shared stories, giggled softly, and watched the magical scenery float by.\n\nFinally, the train arrived at a peaceful station surrounded by gentle waterfalls and glowing flowers. "Dreamland Station," announced the conductor. "Sweet dreams await!"\n\nTimmy stepped off and found himself in the most wonderful dream—flying with friendly dragons, exploring candy forests, and playing with talking animals.\n\nWhen he woke up the next morning, he smiled. The Dreamland Express would return tonight, ready for another magical journey.\n\n✨ Moral: Bedtime is the beginning of wonderful adventures.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '32',
      title: 'The Hummingbird Who Shared Joy',
      genre: 'Animals',
      duration: '3 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600',
      text: 'In a colorful garden lived a tiny hummingbird named Hope. She was the smallest bird, but she had the biggest heart. Every day, she visited flowers and sang cheerful songs.\n\nOne morning, she noticed a wilted rose in the corner. "Why so sad?" Hope asked.\n\n"I\'m old and fading," the rose sighed. "Nobody visits me anymore."\n\nHope\'s heart filled with determination. She flew to the rose every single day, singing her sweetest songs and sharing stories of the garden.\n\nSlowly, the rose began to perk up. Her petals brightened, and she even bloomed a few new flowers.\n\nOther flowers noticed. "How did you do that?" they asked the rose.\n\n"Hope reminded me that I\'m still loved," the rose said softly.\n\nFrom that day on, all the garden creatures made sure to visit and appreciate each flower, no matter how old or small.\n\nHope taught them that a little attention and kindness can make anyone feel beautiful again.\n\n✨ Moral: Small acts of kindness create big changes.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '33',
      title: 'The Rainbow After the Storm',
      genre: 'Nature stories',
      duration: '4 min',
      ageRange: '3-6',
      coverImage: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=600',
      text: 'One afternoon, dark clouds rolled over a peaceful village. Thunder rumbled, lightning flashed, and rain poured down. A little girl named Maya watched from her window, feeling scared.\n\n"I don\'t like storms," she whispered to her grandmother.\n\nGrandma hugged her gently. "Storms can be loud and scary, but they always pass. And you know what comes after?"\n\nMaya shook her head.\n\n"Something beautiful," Grandma smiled.\n\nAs the storm finally moved away, sunlight broke through the clouds. And there, stretching across the sky, was the most magnificent rainbow Maya had ever seen—red, orange, yellow, green, blue, and purple, glowing brilliantly.\n\n"Wow!" Maya gasped. "It\'s so pretty!"\n\n"See?" said Grandma. "Sometimes we need the rain and clouds to create something wonderful. Hard times don\'t last forever, and beauty often follows."\n\nFrom that day on, whenever Maya felt scared or sad, she remembered the rainbow and knew that brighter days were always ahead.\n\n✨ Moral: Beautiful things often come after difficult times.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '34',
      title: 'The Bedtime Knight',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=600',
      text: 'Every night before bed, a little boy named Oliver put on his pajamas and transformed into the Bedtime Knight—protector of peaceful dreams!\n\nHis stuffed bear became his loyal squire, and his blanket turned into a royal cape. Together, they guarded the kingdom of sleep against worry monsters and bad-dream dragons.\n\nOne night, Oliver heard his little sister crying. "I had a scary dream," she sniffled.\n\nThe Bedtime Knight sprang into action! He tucked her in with his magic blanket-cape and placed his bravest teddy bear beside her pillow.\n\n"This bear is enchanted," he whispered. "It keeps all bad dreams away and brings only happy ones."\n\nHis sister hugged the bear tightly and smiled. "Thank you, Bedtime Knight."\n\nOliver returned to his room, proud of his mission. Before climbing into bed, he whispered his knightly oath: "I promise to be brave, to be kind, and to protect all dreams—especially the good ones."\n\nWith that, he drifted into his own peaceful adventure, knowing he\'d made someone feel safe.\n\n✨ Moral: Bravery is helping others feel safe and loved.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '35',
      title: 'The Wise Owl and the Worried Rabbit',
      genre: 'Moral stories',
      duration: '4 min',
      ageRange: '4-7',
      coverImage: 'https://images.unsplash.com/photo-1563473213013-de2a0133c100?w=600',
      text: 'In a quiet forest lived a rabbit named Riley who worried about everything. "What if it rains? What if I can\'t find food? What if I get lost?"\n\nOne evening, feeling overwhelmed, Riley visited the wise old owl named Oliver.\n\n"I can\'t stop worrying," Riley admitted sadly.\n\nOliver hooted softly. "Tell me, little friend, are you in danger right now?"\n\nRiley looked around. "No…"\n\n"Do you have a safe burrow?"\n\n"Yes…"\n\n"Do you have food for today?"\n\n"Yes," Riley said again.\n\nOliver smiled gently. "Then right now, in this moment, you are safe. Tomorrow\'s worries belong to tomorrow. Today\'s job is simply to enjoy today."\n\nRiley took a deep breath and felt lighter. That evening, instead of worrying, he watched the fireflies dance, listened to the crickets sing, and enjoyed the cool breeze.\n\nWhen bedtime came, Riley realized he\'d had a wonderful day—all because he chose to focus on the present moment.\n\n✨ Moral: Don\'t let tomorrow\'s worries steal today\'s peace.',
      rating: 4.9,
      isFavorite: false
    },
    // Classic Fairy Tales & Famous Stories
    {
      id: '36',
      title: 'Cinderella',
      genre: 'Fairy tales',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600',
      text: 'Once upon a time, in a land far away, lived a kind and beautiful girl named Cinderella. After her father passed away, she lived with her stepmother and two stepsisters who treated her unkindly, making her do all the housework.\n\nOne day, an invitation arrived from the palace—the Prince was hosting a grand ball to find a bride! Cinderella\'s stepsisters were excited, but they laughed at her. "You? At the ball? In those rags?"\n\nCinderella cried alone in the garden. Suddenly, a gentle glow appeared, and her Fairy Godmother stood before her. "Don\'t cry, dear child. You shall go to the ball!"\n\nWith a wave of her wand, a pumpkin became a golden carriage, mice turned into horses, and Cinderella\'s worn dress transformed into the most beautiful gown with sparkling glass slippers.\n\n"Remember," warned the Fairy Godmother, "the magic ends at midnight!"\n\nAt the ball, Cinderella danced with the Prince, who fell instantly in love. But as the clock struck twelve, she fled, leaving behind only one glass slipper.\n\nThe Prince searched the entire kingdom until he found Cinderella. The slipper fit perfectly! They married and lived happily ever after.\n\n✨ Moral: Kindness and goodness are always rewarded.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '37',
      title: 'Aladdin and the Magic Lamp',
      genre: 'Magical world',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
      text: 'In the bustling city of Agrabah lived a clever young man named Aladdin. Though poor, he had a heart of gold and dreamed of a better life.\n\nOne day, a mysterious sorcerer asked Aladdin to fetch an old lamp from a magical cave. "Touch nothing but the lamp," he warned.\n\nInside the cave, Aladdin found mountains of treasure! He grabbed the dusty lamp, but when he tried to leave, the cave began to collapse. Trapped inside, Aladdin rubbed the lamp to clean it—and WHOOSH! A magical Genie appeared!\n\n"I am the Genie of the lamp! You have three wishes, Master!"\n\nAladdin wished to become a prince so he could meet the beautiful Princess Jasmine. The Genie transformed him magnificently! Aladdin flew to the palace on a magic carpet and won Jasmine\'s heart with his kindness and humor.\n\nWhen the evil sorcerer tried to steal the lamp, Aladdin outsmarted him with bravery and cleverness. In the end, Aladdin used his final wish to free the Genie.\n\n"You\'re my friend," Aladdin said. "You deserve to be free."\n\nAladdin married Jasmine, and they ruled the kingdom with kindness and wisdom.\n\n✨ Moral: True wealth is found in friendship and a good heart.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '38',
      title: 'Snow White and the Seven Dwarfs',
      genre: 'Fairy tales',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600',
      text: 'Once upon a time, a beautiful princess named Snow White lived with her jealous stepmother, the Queen. Every day, the Queen asked her magic mirror, "Mirror, mirror on the wall, who is the fairest of them all?"\n\nWhen the mirror answered "Snow White," the Queen was furious! Snow White fled into the forest, where she discovered a tiny cottage belonging to seven friendly dwarfs: Doc, Grumpy, Happy, Sleepy, Bashful, Sneezy, and Dopey.\n\nThe dwarfs welcomed her warmly. Snow White cooked and cleaned while they worked in the diamond mines. But the Queen discovered Snow White was alive and disguised herself as an old woman selling apples.\n\n"Try this beautiful apple, dear," she offered. Snow White took one bite of the poisoned fruit and fell into a deep sleep.\n\nThe heartbroken dwarfs placed her in a glass coffin. One day, a kind Prince who had heard of her beauty came to pay his respects. Moved by her peaceful face, he kissed her gently—and the spell broke!\n\nSnow White awoke, and they all celebrated joyfully. She married the Prince and lived happily ever after with her dwarf friends always welcome at the palace.\n\n✨ Moral: Kindness creates lasting friendships that protect us.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '39',
      title: 'The Little Mermaid',
      genre: 'Fairy tales',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600',
      text: 'Deep beneath the ocean waves lived a young mermaid princess named Ariel. She had a beautiful voice and a curious heart that longed to explore the world above the sea.\n\nOne stormy night, Ariel saved a handsome prince from drowning and fell deeply in love. She dreamed of walking on land and meeting him again.\n\nAriel visited the Sea Witch, who offered a deal: "I\'ll give you human legs, but you must give me your beautiful voice. You have three days to make the prince fall in love, or you\'ll belong to me forever."\n\nAriel agreed and became human. Though she couldn\'t speak, her kindness, grace, and sparkling eyes captured the prince\'s attention. They spent wonderful days together—exploring the kingdom, dancing, and sharing quiet moments.\n\nOn the third day, as the sun was setting, the prince realized the truth. "It was you who saved me! I heard your voice in my dreams!"\n\nAriel\'s father, King Triton, seeing his daughter\'s true love, used his powerful trident to break the witch\'s spell. Ariel\'s voice returned, and she was given the choice to stay human.\n\nAriel and the prince married, uniting the land and sea in harmony.\n\n✨ Moral: Follow your heart, but never lose who you truly are.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '40',
      title: 'Beauty and the Beast',
      genre: 'Fairy tales',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600',
      text: 'Once upon a time, a merchant got lost in a storm and found shelter in an enchanted castle. When he picked a rose for his daughter Belle, a terrifying Beast appeared!\n\n"You stole from me! Now you must stay forever!" roared the Beast.\n\nBrave Belle offered to take her father\'s place. At first, she was frightened, but she discovered the Beast wasn\'t cruel—just lonely. He gave her a beautiful library, and they spent hours reading together.\n\nSlowly, Belle saw past the Beast\'s scary appearance. She noticed his gentle eyes, his kind gestures, and his caring heart. They danced in the ballroom, walked in the garden, and became true friends.\n\nOne day, Belle saw her sick father in a magic mirror. "Please, let me go to him," she begged.\n\nThe Beast, though heartbroken, let her leave. "I love you, Belle. Be happy."\n\nBelle realized she loved him too! She rushed back just as the last petal fell from an enchanted rose. "I love you!" she cried.\n\nMagic swirled around them, and the Beast transformed into a handsome prince! The curse was broken by true love. They lived happily ever after.\n\n✨ Moral: True beauty is found within the heart.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '41',
      title: 'Sleeping Beauty',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=600',
      text: 'Long ago, a king and queen celebrated the birth of their daughter, Princess Aurora. They invited everyone to the celebration—except one: the evil fairy Maleficent.\n\nFurious at being excluded, Maleficent appeared and cast a terrible curse: "Before the sun sets on her sixteenth birthday, she will prick her finger on a spinning wheel and die!"\n\nA good fairy softened the curse: Aurora would not die, but fall into a deep sleep, awakened only by true love\'s kiss.\n\nThe worried king burned every spinning wheel in the kingdom, and three good fairies raised Aurora in a hidden cottage, calling her Briar Rose. She grew up kind, gentle, and with a voice so sweet that birds sang with her.\n\nOn her sixteenth birthday, Maleficent\'s magic found Aurora. A spinning wheel appeared, and Aurora pricked her finger, falling into a deep sleep. The entire kingdom slumbered with her.\n\nYears later, a brave prince learned of the sleeping princess. He fought through thorns and finally reached Aurora. With a gentle kiss filled with true love, she awoke!\n\nThe kingdom rejoiced, and Aurora and the prince lived happily ever after.\n\n✨ Moral: Good will always triumph over evil, and love conquers all.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '42',
      title: 'Rapunzel',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
      text: 'In a tall tower hidden in the forest lived a girl named Rapunzel with the longest, most magical golden hair you could imagine. A witch named Mother Gothel kept her locked away, using her hair\'s healing powers to stay young forever.\n\n"Rapunzel, Rapunzel, let down your hair!" Gothel would call, climbing up the golden locks.\n\nRapunzel spent her days reading, painting, and dreaming of the floating lights that appeared every year on her birthday. "Someday, I\'ll see them up close," she wished.\n\nOne day, a young adventurer named Flynn Rider climbed into her tower while escaping guards. At first scared, Rapunzel made a deal: "Take me to see the floating lights, and I\'ll return what you seek."\n\nThey journeyed together, and Rapunzel experienced the world—flowers, sunshine, friendly people, and laughter. On her birthday night, they floated in a boat surrounded by thousands of glowing lanterns—released by the king and queen for their lost daughter.\n\nRapunzel discovered she WAS the lost princess! Her real parents had released those lights every year, hoping she\'d return.\n\nWith courage and friends, Rapunzel defeated Gothel and reunited with her family. She and Flynn lived happily ever after.\n\n✨ Moral: Never stop dreaming—the world is waiting for you.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '43',
      title: 'The Lion King',
      genre: 'Animals',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600',
      text: 'On Pride Rock in the African savanna, a lion cub named Simba was born to King Mufasa and Queen Sarabi. All the animals gathered to celebrate the future king.\n\nMufasa taught Simba about the Circle of Life: "Everything is connected. One day, you will be king and protect this balance."\n\nBut Simba\'s jealous uncle, Scar, wanted the throne. He tricked Simba into a dangerous gorge where a wildebeest stampede thundered through. Mufasa saved Simba but fell. Scar blamed young Simba and told him to run away.\n\nHeartbroken and ashamed, Simba fled to the jungle, where he met Timon and Pumbaa. They taught him "Hakuna Matata"—no worries! Simba grew up carefree, trying to forget his past.\n\nYears later, his childhood friend Nala found him. "Simba, you must return! Scar has destroyed the Pride Lands!"\n\nSimba was afraid, but wise Rafiki showed him that Mufasa lived on in him. Looking at his reflection, Simba heard his father\'s voice: "Remember who you are."\n\nSimba returned, defeated Scar, and took his rightful place as king. The Pride Lands flourished once more, and the Circle of Life continued.\n\n✨ Moral: We must face our past to embrace our future.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '44',
      title: 'Finding Nemo',
      genre: 'Animals',
      duration: '6 min',
      ageRange: '3-7',
      coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
      text: 'In the Great Barrier Reef lived a clownfish named Marlin and his only son, Nemo. Marlin was very protective—too protective, Nemo thought.\n\n"Dad, I can do things by myself!" Nemo complained on his first day of school.\n\nTo prove himself, Nemo swam too far and was caught by a scuba diver! Marlin watched helplessly as his son disappeared.\n\n"I have to find him!" Determined, Marlin set off across the ocean. He met Dory, a forgetful but cheerful blue fish. "I suffer from short-term memory loss, but I\'ll help you find your son!"\n\nTogether, they faced sharks, jellyfish, and a whale\'s belly! Meanwhile, Nemo ended up in a fish tank in Sydney. He made friends who helped him plan an escape.\n\n"All drains lead to the ocean!" they discovered.\n\nMarlin and Dory finally reached Sydney Harbor. "Nemo! I\'m here!"\n\nFather and son reunited joyfully. Marlin learned to let Nemo take risks, and Nemo understood his father\'s love. They swam home together, with Dory happily tagging along.\n\n"Just keep swimming, just keep swimming!" she sang.\n\n✨ Moral: Love means trusting others to find their own way.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '45',
      title: 'Frozen - The Tale of Two Sisters',
      genre: 'Magical world',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600',
      text: 'In the kingdom of Arendelle lived two princess sisters: Elsa and Anna. Elsa had a secret—she could create ice and snow with her hands! But after accidentally hurting Anna as children, Elsa hid away, afraid of her own powers.\n\nYears later, on Elsa\'s coronation day, her powers were revealed to everyone. Frightened and overwhelmed, she ran into the mountains and built a magnificent ice palace, accidentally plunging Arendelle into eternal winter.\n\nBrave Anna set off to find her sister. Along the way, she met Kristoff, his reindeer Sven, and a magical snowman named Olaf who dreamed of summer.\n\n"Some people are worth melting for!" Olaf said warmly.\n\nAnna found Elsa and tried to bring her home, but Elsa accidentally struck Anna\'s heart with ice. Only an act of true love could save her!\n\nAs Anna was freezing, she saw Elsa in danger. Instead of saving herself, Anna threw herself in front of Elsa—and turned to ice. But her sacrifice WAS the act of true love! Anna thawed, and Elsa realized love was the key to controlling her powers.\n\nElsa brought back summer, and the sisters finally hugged after years apart. Arendelle celebrated, and the palace gates stayed open forever.\n\n✨ Moral: True love, especially between family, can thaw the coldest heart.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '46',
      title: 'Pinocchio',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      text: 'Old woodcarver Geppetto was lonely, so he carved a puppet and named him Pinocchio. That night, the Blue Fairy visited and brought Pinocchio to life!\n\n"Prove yourself brave, truthful, and unselfish, and someday you\'ll be a real boy," she said, assigning Jiminy Cricket as his conscience.\n\nPinocchio started school but was easily led astray. When he lied about his adventures, his nose grew longer and longer! "A lie keeps growing until it\'s as plain as the nose on your face," warned the fairy.\n\nPinocchio was tricked into going to Pleasure Island, where naughty boys turned into donkeys! He barely escaped, growing donkey ears as a warning.\n\nWorse, he discovered Geppetto had been swallowed by a giant whale while searching for him! Brave Pinocchio dove into the ocean to save his father. Inside the whale, they built a fire, making the whale sneeze them out!\n\nSwimming to shore, Pinocchio saved Geppetto but collapsed from exhaustion. The Blue Fairy appeared one last time.\n\n"You have proven yourself brave, truthful, and unselfish. Awake, Pinocchio—as a REAL boy!"\n\nGeppetto hugged his real son, tears of joy streaming down his face.\n\n✨ Moral: Honesty and bravery make us who we truly are.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '47',
      title: 'The Jungle Book',
      genre: 'Animals',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1518173946687-a4c036bc6d20?w=600',
      text: 'Deep in the Indian jungle, a wolf pack discovered a human baby and named him Mowgli. He grew up among the animals, learning the ways of the jungle from Bagheera the wise panther and Baloo the fun-loving bear.\n\n"Look for the bare necessities, the simple bare necessities!" Baloo sang, teaching Mowgli to enjoy life.\n\nBut danger lurked—Shere Khan, the fierce tiger, hated humans and wanted Mowgli gone. "The man-cub must leave before I find him!"\n\nMowgli didn\'t want to leave his jungle family. Along the way, he encountered Kaa the hypnotic snake and King Louie, a monkey who wanted to learn the secret of fire.\n\nWhen Shere Khan attacked, brave Mowgli stood his ground. Using fire—man\'s one advantage—he scared the tiger away, saving his friends.\n\nBut Mowgli realized something important. Seeing a village girl, he felt drawn to his own kind. His animal friends understood.\n\n"Go on, little brother," Bagheera said gently. "You belong with your own people now."\n\nWith love in his heart, Mowgli walked toward the village—but he would never forget his jungle family, and they would always be watching over him.\n\n✨ Moral: Home is where you\'re loved, no matter where that may be.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '48',
      title: 'Peter Pan',
      genre: 'Adventures',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
      text: 'One magical night, Peter Pan flew through the window of the Darling children—Wendy, John, and Michael. "Come with me to Neverland, where you never grow up!"\n\n"All you need is faith, trust, and a little pixie dust!" sprinkled Tinker Bell, the tiny fairy.\n\nSoon they were flying over London, past the stars, to the magical island of Neverland! There, Peter introduced them to the Lost Boys—children who had no parents and never aged.\n\nBut danger waited: Captain Hook, the villainous pirate who lost his hand to Peter (and to a hungry crocodile!). "I\'ll have my revenge on Peter Pan!" Hook plotted.\n\nWendy became like a mother to the Lost Boys, telling them bedtime stories. But she began to miss home. When Hook captured the children, Peter Pan flew to the rescue!\n\nIn an exciting sword fight on the pirate ship, Peter defeated Hook. "Take that, you codfish!" The crocodile chased Hook into the sea, tick-tock, tick-tock!\n\nWendy, John, and Michael decided to go home, but they never forgot Neverland. Peter promised to return for spring cleaning—and to hear Wendy\'s stories.\n\n"To live will be an awfully big adventure," Peter said, flying back to his island of dreams.\n\n✨ Moral: Growing up is part of life, but keep your imagination alive.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '49',
      title: 'Hansel and Gretel',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600',
      text: 'In a small cottage near a dark forest lived Hansel and Gretel with their poor father and cruel stepmother. When food ran out, the stepmother convinced their father to abandon the children in the woods.\n\nClever Hansel dropped pebbles along the path and led Gretel home. But the second time, he only had breadcrumbs, which birds ate! The children were truly lost.\n\nWandering deeper into the forest, they discovered an amazing sight—a house made entirely of candy! Gingerbread walls, candy cane pillars, and frosting snow!\n\n"Nibble, nibble, little mouse, who is nibbling at my house?" croaked a voice. An old witch appeared, her eyes glittering.\n\nShe trapped Hansel in a cage to fatten him up and made Gretel her servant. "When he\'s plump enough, I\'ll eat him!" she cackled.\n\nBrave Gretel made a plan. When the witch checked the oven, Gretel pushed her in and slammed the door! She freed Hansel, and they discovered the witch\'s treasure.\n\nThe children found their way home. Their stepmother had left, and their father wept with joy. With the treasure, they never went hungry again.\n\n✨ Moral: Bravery and cleverness can overcome any danger.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '50',
      title: 'The Three Little Pigs',
      genre: 'Fairy tales',
      duration: '4 min',
      ageRange: '2-6',
      coverImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600',
      text: 'Once upon a time, three little pig brothers set out to build their own houses.\n\nThe first pig was lazy. "I\'ll build my house of straw—quick and easy!" And he played all day.\n\nThe second pig was a little lazy too. "I\'ll use sticks—faster than bricks!" And he played most of the day.\n\nThe third pig worked hard. "I\'ll build with bricks. It takes longer, but it will be strong!" He worked all day.\n\nSoon, the Big Bad Wolf came! "Little pig, little pig, let me come in!"\n\n"Not by the hair on my chinny chin chin!"\n\n"Then I\'ll huff, and I\'ll puff, and I\'ll BLOW your house down!" The straw house flew apart, and the first pig ran to his brother\'s stick house.\n\nThe wolf huffed and puffed—and blew that house down too! Both pigs ran to the brick house.\n\nThe wolf huffed and puffed and PUFFED... but the brick house stood strong! Angry, he climbed down the chimney—but the clever pigs had a pot of hot water waiting! The wolf yelped and ran away forever.\n\nThe three pigs lived safely in the brick house, and the lazy brothers learned an important lesson.\n\n✨ Moral: Hard work and planning keep us safe.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '51',
      title: 'Little Red Riding Hood',
      genre: 'Fairy tales',
      duration: '4 min',
      ageRange: '3-7',
      coverImage: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600',
      text: 'Once upon a time, a sweet girl always wore a red hooded cape, so everyone called her Little Red Riding Hood. One day, her mother said, "Take this basket of treats to Grandma\'s house. Stay on the path!"\n\nSkipping through the forest, Red met a wolf. "Where are you going, little girl?" he asked sweetly.\n\n"To Grandma\'s house!" Red answered, not knowing wolves were dangerous.\n\nThe wolf raced ahead and swallowed poor Grandma whole! He put on her nightgown and waited in bed.\n\nWhen Red arrived, something seemed strange. "Grandma, what big eyes you have!"\n\n"All the better to see you with!"\n\n"What big ears you have!"\n\n"All the better to hear you with!"\n\n"What big TEETH you have!"\n\n"All the better to EAT you with!" The wolf leaped—but just then, a woodcutter burst through the door!\n\nThe brave woodcutter scared the wolf, who coughed up Grandma, completely unharmed! The wolf ran away and never bothered anyone again.\n\nRed hugged Grandma and the woodcutter. "I\'ll always stay on the path and never talk to strangers!"\n\n✨ Moral: Listen to your parents and be careful of strangers.',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '52',
      title: 'Goldilocks and the Three Bears',
      genre: 'Fairy tales',
      duration: '4 min',
      ageRange: '2-6',
      coverImage: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600',
      text: 'Once upon a time, three bears lived in a cozy cottage: Papa Bear, Mama Bear, and Baby Bear. One morning, they went for a walk while their porridge cooled.\n\nA curious girl named Goldilocks wandered by. "What a cute house!" She walked right in without knocking.\n\nOn the table sat three bowls of porridge. She tasted Papa Bear\'s—"Too hot!" Mama Bear\'s—"Too cold!" Baby Bear\'s—"Just right!" And she ate it all up.\n\nFeeling tired, she tried the chairs. Papa Bear\'s was too hard. Mama Bear\'s was too soft. Baby Bear\'s was just right—CRACK! It broke into pieces!\n\nUpstairs, Goldilocks found three beds. Papa Bear\'s was too firm. Mama Bear\'s was too squishy. Baby Bear\'s was just right, and she fell fast asleep.\n\nThe bears came home and discovered the mess! "Someone\'s been eating my porridge!" growled Papa. "Someone\'s been sitting in my chair!" said Mama. "Someone\'s been sleeping in my bed—AND SHE\'S STILL THERE!" cried Baby Bear.\n\nGoldilocks woke up, saw three bears, and jumped out the window! She ran home and never entered a stranger\'s house again.\n\nThe bears fixed Baby Bear\'s chair and lived happily ever after.\n\n✨ Moral: Always respect other people\'s belongings.',
      rating: 4.7,
      isFavorite: false
    },
    {
      id: '53',
      title: 'Jack and the Beanstalk',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
      text: 'Jack and his mother were very poor. "Take our cow to market and sell her," said his mother sadly.\n\nOn the way, Jack met a strange man who offered magic beans for the cow. Jack agreed! His mother was furious and threw the beans out the window.\n\nOvernight, a GIANT beanstalk grew up, up, up into the clouds! Curious Jack climbed all the way to the top and found an enormous castle.\n\nInside lived a giant and his wife. "FEE FI FO FUM!" thundered the giant. Jack hid quickly! He watched the giant count golden coins, play a harp that sang by itself, and pet a goose that laid golden eggs.\n\nWhen the giant fell asleep, Jack grabbed the goose and climbed down. The giant woke and followed! "FEE FI FO FUM! I\'ll catch you, little one!"\n\nJack reached the ground first. "Mother, bring the axe!" CHOP CHOP CHOP! The beanstalk fell, and the giant tumbled back into the clouds, never to be seen again.\n\nWith the golden goose, Jack and his mother were never poor again. And sometimes, when the wind blew, Jack swore he could still hear the giant\'s distant grumbling.\n\n✨ Moral: Courage and quick thinking can change your life.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '54',
      title: 'Dumbo the Flying Elephant',
      genre: 'Animals',
      duration: '5 min',
      ageRange: '3-7',
      coverImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600',
      text: 'In a circus, a baby elephant was born with the biggest ears anyone had ever seen. The other elephants called him "Dumbo" and laughed at him. Only his loving mother believed he was special.\n\nPoor Dumbo felt sad and alone. His ears were so big he tripped over them! The circus made him a clown, which hurt his feelings even more.\n\nOne night, Dumbo\'s only friend, a brave little mouse named Timothy, discovered something amazing. "Dumbo, your ears aren\'t a problem—they\'re WINGS! You can FLY!"\n\nDumbo didn\'t believe it. Timothy gave him a "magic feather." "Hold this, and you can fly!" Dumbo held the feather tightly, flapped his enormous ears, and lifted off the ground!\n\nAt the next show, Dumbo was supposed to fall from a high platform. But instead, he spread his ears and SOARED! The audience gasped, then cheered wildly!\n\nDumbo became the most famous elephant in the world. But the best part? He was reunited with his mother, and no one ever laughed at his ears again.\n\nTimothy smiled. "I knew you were special all along, buddy."\n\n✨ Moral: What makes you different makes you special.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '55',
      title: 'Bambi',
      genre: 'Animals',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600',
      text: 'In a beautiful forest, a fawn named Bambi was born. All the animals came to see the young prince! His mother taught him about the meadow, the seasons, and staying safe.\n\nBambi made wonderful friends: Thumper the rabbit and Flower the skunk. They played together, explored together, and learned about the forest.\n\n"If you can\'t say something nice, don\'t say nothing at all," Thumper\'s mother always reminded him.\n\nBut the forest held dangers too. Bambi\'s mother warned him about "Man." One terrible winter day, hunters came. "Run, Bambi! Don\'t look back!" His mother didn\'t make it home that day.\n\nSad and alone, Bambi was found by the Great Prince of the Forest—his father. "You must learn to be brave," the Prince said gently.\n\nSeasons passed. Bambi grew strong and wise. He fell in love with a beautiful doe named Faline. When a forest fire threatened everyone, Bambi bravely led the animals to safety.\n\nYears later, Bambi became the Great Prince himself. One spring morning, the animals gathered again—this time to celebrate Bambi\'s own twin fawns.\n\nThe circle of life continued beautifully.\n\n✨ Moral: Life has sadness and joy—both help us grow.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '56',
      title: 'The Ugly Duckling',
      genre: 'Moral stories',
      duration: '4 min',
      ageRange: '3-7',
      coverImage: 'https://images.unsplash.com/photo-1459682687441-7761439a709d?w=600',
      text: 'On a farm, a mother duck hatched her eggs. Out popped fluffy yellow ducklings... and one large, gray, awkward bird. "What an ugly duckling!" the others quacked.\n\nThe poor duckling was pushed away, pecked at, and teased. Even the chickens and turkeys were mean to him. Heartbroken, he ran away.\n\nThrough summer, fall, and cold winter, the ugly duckling wandered alone. He nearly froze on an icy pond until a kind farmer rescued him.\n\nWhen spring arrived, the duckling saw beautiful white birds gliding gracefully on a lake. "I wish I could be like them," he sighed.\n\nHe swam toward them, expecting to be chased away. But the beautiful birds welcomed him warmly! Confused, he looked down at his reflection—and gasped!\n\nHe wasn\'t an ugly duckling anymore. He was a beautiful white SWAN! The most graceful bird of all!\n\n"Welcome, brother!" the swans said kindly. "You belong with us."\n\nChildren by the lake pointed and said, "Look at the new swan—he\'s the most beautiful one of all!"\n\nThe swan remembered his hard journey and knew that everything had led him here. He had always been beautiful—just different.\n\n✨ Moral: True beauty takes time to reveal itself. Be patient with yourself.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '57',
      title: 'The Princess and the Frog',
      genre: 'Fairy tales',
      duration: '5 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      text: 'In New Orleans lived a hardworking girl named Tiana who dreamed of opening her own restaurant. She worked day and night, saving every penny.\n\nOne evening, at a costume ball, Tiana met a talking frog! "I\'m actually Prince Naveen," he explained. "An evil witch cursed me! A kiss from a princess will break the spell!"\n\nTiana wasn\'t a princess, but she was wearing a princess costume. When she kissed him—POOF! Instead of turning him human, SHE became a frog too!\n\n"This is NOT what I planned!" Tiana croaked.\n\nTogether, the two frogs journeyed through the Louisiana bayou to find Mama Odie, a good voodoo queen. Along the way, they met Louis the trumpet-playing alligator and Ray the romantic firefly.\n\nTiana and Naveen argued at first—she thought he was lazy; he thought she was too serious. But slowly, they saw each other\'s hearts and fell in love.\n\nMama Odie taught them: "You need to dig a little deeper to find what you need!" True love\'s kiss finally broke the spell!\n\nTiana opened her restaurant, and it became the best in New Orleans. Naveen proved that love had taught him to work hard. Together, they achieved their dreams.\n\n✨ Moral: Dreams come true through hard work and love.',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '58',
      title: 'Moana',
      genre: 'Adventures',
      duration: '6 min',
      ageRange: '4-8',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      text: 'On the island of Motunui lived a brave girl named Moana. Though her father forbade anyone from sailing beyond the reef, the ocean called to her heart.\n\nWhen darkness began spreading across the islands—killing plants and driving away fish—Moana learned the truth. Long ago, the demigod Maui stole the heart of Te Fiti, the island goddess, causing this curse. Only returning the heart could save everyone.\n\nThe ocean chose Moana for this quest! She sailed beyond the reef for the first time, facing storms and finding Maui on a remote island.\n\n"I am Moana of Motunui. You will board my boat, and restore the heart of Te Fiti!" she declared.\n\nMaui was arrogant at first, but Moana\'s determination inspired him. Together, they faced Tamatoa the giant crab and the lava monster Te Ka.\n\nWhen all seemed lost, Moana realized Te Ka WAS Te Fiti—transformed by losing her heart! Bravely, Moana walked toward the monster.\n\n"I know who you are," she said gently, pressing the heart back where it belonged.\n\nTe Fiti was restored! Life returned to all the islands. Moana sailed home a hero and taught her people to voyage again.\n\n"The ocean connects us all," she smiled.\n\n✨ Moral: Listen to your heart and have courage to follow your calling.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '59',
      title: 'Toy Story',
      genre: 'Adventures',
      duration: '6 min',
      ageRange: '3-8',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      text: 'In Andy\'s room, toys came alive when no one was watching! Woody the cowboy was Andy\'s favorite—he got the special spot on the bed and led all the other toys.\n\nBut on Andy\'s birthday, a new toy arrived: Buzz Lightyear, a space ranger who didn\'t know he was a toy! "I\'m Buzz Lightyear, Space Ranger!"\n\nWoody was jealous. Buzz got all the attention now! When Woody accidentally knocked Buzz out the window, the other toys were angry. "You pushed him on purpose!"\n\nWoody chased after Buzz, but they both ended up at Sid\'s house—a neighbor boy who destroyed toys! Woody and Buzz had to work together to escape.\n\nDuring their adventure, Buzz discovered he truly was a toy. He felt devastated. But Woody helped him understand: "Being a toy is the greatest thing. You make a child happy!"\n\nBuzz smiled. "You\'re right, Woody."\n\nThey escaped Sid\'s house just as Andy\'s family was moving! Racing after the moving truck, Woody and Buzz became best friends. They landed safely in Andy\'s car.\n\nAndy hugged both toys. "I found them! My two favorite toys!"\n\nWoody and Buzz shared a smile. They were partners now.\n\n✨ Moral: Friendship is more important than being #1.',
      rating: 5.0,
      isFavorite: false
    },
    {
      id: '60',
      title: 'The Tortoise and the Hare',
      genre: 'Moral stories',
      duration: '3 min',
      ageRange: '2-6',
      coverImage: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600',
      text: 'In a sunny meadow, a hare bragged constantly about his speed. "I\'m the fastest animal alive! No one can beat me!"\n\nA slow tortoise listened quietly and finally said, "I\'ll race you."\n\nEveryone laughed! "A tortoise racing a hare? Impossible!"\n\nThe race began. The hare zoomed ahead, leaving the tortoise far behind. Looking back, he laughed. "This is too easy! I\'ll take a little nap."\n\nThe hare stretched under a shady tree and fell asleep. Meanwhile, the tortoise kept walking—slow and steady, step by step, never stopping.\n\nHours passed. When the hare finally woke up, he saw the tortoise was almost at the finish line!\n\n"No! No! No!" The hare ran as fast as he could, but it was too late.\n\nThe tortoise crossed the finish line first!\n\nAll the animals cheered! The tortoise smiled calmly. "I may be slow, but I never gave up."\n\nThe embarrassed hare learned an important lesson that day. He never bragged or underestimated anyone again.\n\n✨ Moral: Slow and steady wins the race.',
      rating: 4.9,
      isFavorite: false
    }
  ]);

  const [musicTracks] = useState<Music[]>([
    { id: '1', name: 'Rain', type: 'Rain sounds', icon: 'cloud-rain', isPlaying: false },
    { id: '2', name: 'Ocean Waves', type: 'Ocean', icon: 'waves', isPlaying: false },
    { id: '3', name: 'Soft Lullaby', type: 'Lullaby', icon: 'music', isPlaying: false },
    { id: '4', name: 'Wind Chimes', type: 'Wind chimes', icon: 'wind', isPlaying: false },
    { id: '5', name: 'White Noise', type: 'White noise', icon: 'radio', isPlaying: false },
    { id: '6', name: 'Forest Ambience', type: 'Forest', icon: 'trees', isPlaying: false }
  ]);

  const [rhymes] = useState<Rhyme[]>([
    { id: 'r1', title: 'ABCD Song', emoji: '🔤', audio: 'nrt-1-abcd-Song.mp3', isPlaying: false },
    { id: 'r2', title: 'I Am a Little Teapot', emoji: '🫖', audio: 'nrt-2-i-am-a-little-teapot.mp3', isPlaying: false },
    { id: 'r3', title: 'Pat-a-Cake', emoji: '🎂', audio: 'nrt-3-pat-a-cake.mp3', isPlaying: false },
    { id: 'r4', title: 'Row Row Row Your Boat', emoji: '🚣', audio: 'nrt-5-row-row-row-your-boat.mp3', isPlaying: false },
    { id: 'r5', title: 'One Two Buckle My Shoe', emoji: '👞', audio: 'nrt-6-one-two-buckle-my-shoe.mp3', isPlaying: false },
    { id: 'r6', title: 'Baa Baa Black Sheep', emoji: '🐑', audio: 'nrt-7-baa-baa-black-sheep.mp3', isPlaying: false },
    { id: 'r7', title: 'Twinkle Twinkle Little Star', emoji: '⭐', audio: 'nrt-8-twinkle-twinkle-little-star.mp3', isPlaying: false },
    { id: 'r8', title: 'Head Shoulders Knees and Toes', emoji: '🧑', audio: 'nrt-9-head-shoulders-knees-and-toes.mp3', isPlaying: false },
    { id: 'r9', title: 'Hey Diddle Diddle', emoji: '🐄', audio: 'nrt-10-hey-diddle-diddle.mp3', isPlaying: false },
    { id: 'r10', title: 'Hickory Dickory Dock', emoji: '🐭', audio: 'nrt-14-hickory-dickory-dock.mp3', isPlaying: false },
    { id: 'r11', title: 'If You\'re Happy and You Know It', emoji: '👏', audio: 'nrt-17-if-youre-happy-and-you-know-it.mp3', isPlaying: false },
    { id: 'r12', title: 'Wheels on the Bus', emoji: '🚌', audio: 'nrt-18-wheels-on-the-bus.mp3', isPlaying: false },
    { id: 'r13', title: 'Old MacDonald Had a Farm', emoji: '🚜', audio: 'nrt-19-old-macdonald-had-a-farm.mp3', isPlaying: false },
    { id: 'r14', title: 'Bingo', emoji: '🐶', audio: 'nrt-13-bingo.mp3', isPlaying: false },
  ]);

  const handleNavigate = (screen: Screen, story?: Story, genre?: string) => {
    setCurrentScreen(screen);
    if (story) {
      setSelectedStory(story);
    }
    if (genre) {
      setSelectedGenre(genre);
    } else if (screen === 'stories' && !genre) {
      // Reset to All when navigating to stories without specific genre
      setSelectedGenre('All');
    }
  };

  const handleToggleFavorite = (storyId: string) => {
    setStories(stories.map(story =>
      story.id === storyId ? { ...story, isFavorite: !story.isFavorite } : story
    ));
    if (selectedStory?.id === storyId) {
      setSelectedStory({ ...selectedStory, isFavorite: !selectedStory.isFavorite });
    }
  };

  const handleRateStory = (storyId: string, rating: number) => {
    setStories(stories.map(story =>
      story.id === storyId ? { ...story, rating } : story
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B2545] to-[#162B5B]">
      {currentScreen === 'home' && (
        <Home onNavigate={handleNavigate} recentStories={stories.slice(0, 3)} />
      )}
      {currentScreen === 'stories' && (
        <StoryLibrary
          stories={stories}
          onNavigate={handleNavigate}
          onToggleFavorite={handleToggleFavorite}
          initialGenre={selectedGenre}
        />
      )}
      {currentScreen === 'story-player' && selectedStory && (
        <StoryPlayer 
          story={selectedStory}
          allStories={stories}
          onNavigate={handleNavigate}
          onToggleFavorite={handleToggleFavorite}
          onRateStory={handleRateStory}
        />
      )}
      {currentScreen === 'music' && (
        <MusicPlayer musicTracks={musicTracks} rhymes={rhymes} onNavigate={handleNavigate} />
      )}
      {currentScreen === 'favorites' && (
        <Favorites 
          stories={stories.filter(s => s.isFavorite)}
          onNavigate={handleNavigate}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Bottom Navigation */}
      {currentScreen !== 'story-player' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#162B5B]/95 backdrop-blur-lg border-t border-[#5B84D8]/20">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex justify-around items-center">
              <button
                onClick={() => handleNavigate('home')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  currentScreen === 'home' ? 'text-[#F8EDEB]' : 'text-[#A8C7FF]/60'
                }`}
              >
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs">Home</span>
              </button>
              <button
                onClick={() => handleNavigate('stories')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  currentScreen === 'stories' ? 'text-[#F8EDEB]' : 'text-[#A8C7FF]/60'
                }`}
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-xs">Stories</span>
              </button>
              <button
                onClick={() => handleNavigate('music')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  currentScreen === 'music' ? 'text-[#F8EDEB]' : 'text-[#A8C7FF]/60'
                }`}
              >
                <MusicIcon className="w-6 h-6" />
                <span className="text-xs">Music</span>
              </button>
              <button
                onClick={() => handleNavigate('favorites')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  currentScreen === 'favorites' ? 'text-[#F8EDEB]' : 'text-[#A8C7FF]/60'
                }`}
              >
                <Heart className="w-6 h-6" />
                <span className="text-xs">Favorites</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
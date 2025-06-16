export const JAPANESE_URLS = [
  "./public/Natural-Lighting-and-Soft-Ambiance.webp",
  "./public/Focus-on-Minimalism.webp",
  "./public/Copie_de_Nouvelle_image_blog__2500_x_1306_px___6__16 (2).webp",
  "./public/pexels-photo-5461586.webp",
  "./public/photo-1646200436473-53829a7cec37.webp",
];

export const DUMMY_IMAGE_RESULTS = [
  {
    id: "7ae6a8be-eb13-4c8b-851f-9c8716c95d60",
    image_url: "/public/image",
    styles: [
      {
        style: "Japanese",
        elements: [
          "Shoji screens (sliding paper doors)",
          "Low furniture",
          "Minimal decor",
          "Natural wood finishes",
          "Large paper lantern light fixtures",
          "Floor seating and tables",
          "Strong indoor-outdoor connection",
        ],
        confidence: 0.95,
      },
      {
        style: "Minimalist",
        elements: [
          "Clean lines",
          "Lack of clutter",
          "Neutral color palette",
          "Open space",
          "Simple and functional furniture",
        ],
        confidence: 0.85,
      },
      {
        style: "Modern",
        elements: [
          "Large windows",
          "Geometric furniture forms",
          "Integration of natural light",
          "Contemporary sofa and table design",
        ],
        confidence: 0.7,
      },
    ],
    reasoning:
      "The predominant use of Japanese design elements such as the shoji screens, low furniture, and paper lanterns makes Japanese style the highest confidence. Minimalist cues come from the uncluttered space, neutral tones, and clean lines. Modern elements appear in the use of contemporary furniture and expansive windows. The confidence scores reflect the prominence and clarity of these features.",
  },
  {
    id: "e011e01c-218e-477b-9ecd-837af80b7dbf",
    image_url: "/public/image",
    styles: [
      {
        style: "Japanese",
        elements: [
          "Shoji screens with translucent panels",
          "Low wooden table and floor seating",
          "Minimal decor and uncluttered space",
          "Abundant natural light",
          "Earthy, natural materials (wood, tatami mat)",
          "Indoor plant as subtle natural accent",
        ],
        confidence: 0.95,
      },
      {
        style: "Minimalist",
        elements: [
          "Sparse furnishing",
          "Simple, clean lines",
          "Neutral, subdued color palette",
          "Lack of ornamentation",
        ],
        confidence: 0.85,
      },
    ],
    reasoning:
      "The dominant use of natural wood, the presence of shoji screens, and the low table with floor seating are all strong indicators of Japanese Zen style, which is typically minimal and prioritizes simplicity, calmness, and natural materials. The uncluttered articulation, absence of excessive decorative items, and use of negative space reinforce both the Japanese Zen and Minimalist design styles, hence the high confidence scores for both. The balance and harmony conveyed by the arrangement also suggest a focus on mindfulness and tranquility distinctive to Japanese Zen interiors.",
  },
  {
    id: "b41c6a4b-4bc2-4a17-9042-c85b9bb4f9e7",
    image_url: "/public/image",
    styles: [
      {
        style: "Japanese",
        elements: [
          "Tatami mats",
          "Shoji screens",
          "Low, minimal seating",
          "Natural wood finishes",
          "Tokonoma-style alcove",
          "Minimal decoration",
          "Sliding doors",
        ],
        confidence: 0.98,
      },
      {
        style: "Minimalist",
        elements: [
          "Neutral color palette",
          "Clean lines",
          "Uncluttered space",
          "Simple furniture",
          "Focus on natural light",
          "Sparse decor",
        ],
        confidence: 0.9,
      },
      {
        style: "Scandinavian",
        elements: [
          "Use of light woods",
          "Emphasis on light and airiness",
          "Functional, inviting seating",
          "Simple, understated décor",
        ],
        confidence: 0.55,
      },
    ],
    confidence_reasoning: [
      "The dominance of tatami mats, shoji screens, and the overall layout are quintessentially Japanese, leading to very high confidence in the Japanese style.",
      "The open, uncluttered nature and simplicity of the space strongly align with Minimalist principles, thus resulting in a high confidence score.",
      "While there are overlapping features with Scandinavian style (light wood, bright and airy feel), the distinctively Japanese elements are more prominent, resulting in a moderate confidence for Scandinavian influences.",
    ],
  },
  {
    id: "a6fbc546-22aa-418e-a667-8e91bb2f2090",
    image_url: "/public/image",
    styles: [
      {
        style: "Japanese",
        elements: [
          "Shoji screens (sliding paper doors)",
          "Tatami flooring",
          "Low platform seating",
          "Natural wood finishes",
          "Minimalist decor and clean lines",
          "Muted, earthy color palette",
          "Integrated indoor-outdoor connection (large window to garden",
        ],
        confidence: 0.98,
      },
      {
        style: "Minimalist",
        elements: [
          "Sparse furniture",
          "Lack of decorative clutter",
          "Open, airy space",
          "Emphasis on light and simplicity",
        ],
        confidence: 0.85,
      },
    ],
    reasoning:
      "The image features distinct characteristics of Japanese interior design, such as shoji screens, tatami mats, and a connection to nature through large windows. The dominant use of wood and natural light, along with the low-profile furniture and tranquil ambiance, contribute to a strong Japanese style, so confidence is very high. Minimalism is also evident due to the uncluttered space, simple forms, and focus on function, though it is slightly less dominant compared to the overt Japanese influences.",
  },
  {
    id: "b8577c70-96eb-46f0-ba42-fc079dca3e22",
    image_url: "/public/image",
    styles: [
      {
        style: "Japanese",
        elements: [
          "Rice paper-style pendant lights with wooden frames",
          "Muted, natural color palette",
          "Textured, plaster-like wall surfaces",
          "Simple, minimalistic and uncluttered layout",
        ],
        confidence: 0.9,
      },
      {
        style: "Minimalist",
        elements: [
          "Sparse decoration and clean lines",
          "Emphasis on light and openness",
          "Large, unobstructed windows for maximizing natural light",
        ],
        confidence: 0.8,
      },
    ],
    reasoning:
      "The strongest style influence is Japanese, visible through the use of shoji-inspired pendant lights, natural wood tones, and minimal decorative elements, which all point toward a Japanese aesthetic. The overall restraint in decor, the open vertical space, and the focus on simplicity also suggest a strong minimalist influence. The confidence for Japanese is higher due to the distinct lighting elements, while minimalism is present as a complementary style.",
  },
];

export const DUMMY_USERS = [
  {
    id: "123",
    tasteProfile: {
      Japanese: 4.76,
      Minimalist: 4.25,
      Modern: 0.7,
      Scandinavian: 0.55,
    },
  },
];

export const DUMMY_LIKES = [
  {
    imageId: "7ae6a8be-eb13-4c8b-851f-9c8716c95d60",
    userId: "123",
  },
  {
    imageId: "e011e01c-218e-477b-9ecd-837af80b7dbf",
    userId: "123",
  },
  {
    imageId: "b41c6a4b-4bc2-4a17-9042-c85b9bb4f9e7",
    userId: "123",
  },
  {
    imageId: "a6fbc546-22aa-418e-a667-8e91bb2f2090",
    userId: "123",
  },
  {
    imageId: "b8577c70-96eb-46f0-ba42-fc079dca3e22",
    userId: "123",
  },
];

const DUMMY_TASTE_PROFILE = [
  `
  Based on your taste profile, your highest preferences are for **Japanese** and **Minimalist** styles, with a strong
inclination toward these aesthetics. Let me break down what this means for your unique interior design taste:

---

### 1. Japanese (Score: 4.76/5)
This is clearly your most dominant influence. You are drawn to interiors that are:
- **Serene, calming, and harmonious**, emphasizing a deep connection with nature.
- Focused on **simplicity, clean lines, and uncluttered spaces** — you appreciate environments where every item has a
purpose.
- Likely to appreciate **natural materials** like wood, bamboo, stone, and paper (as seen in shoji screens).
- Enthusiastic about **soft, neutral color palettes** punctuated by subtle earthy tones or natural greens.
- Keen on the clever use of space, perhaps including elements like tatami mats, low furniture, sliding doors, and
indoor/outdoor flow.
- Drawn to the Japanese concept of **wabi-sabi**, finding beauty in imperfection and transience.

---

### 2. Minimalist (Score: 4.25/5)
A very close second, the minimalist style complements your Japanese leanings. You value:
- **Function over ornamentation** — enjoying spaces with only the essentials and nothing superfluous.
- A "less is more" philosophy that produces open, clutter-free rooms.
- **Monochrome or restricted color palettes**, with a focus on whites, soft grays, or muted naturals.
- Simple, unadorned furniture with clean, straight lines.
- Plenty of negative space, which allows architectural features and carefully chosen decor to truly stand out.

---

### 3. Modern (Score: 0.7/5) & Scandinavian (Score: 0.55/5)
You show much less interest in these styles, indicating:
- You're not as taken by the bolder, sometimes more industrial or tech-forward elements of **Modern** design (such as
glass, steel, dramatic color contrasts, or striking geometric forms).
- While **Scandinavian** also shares an affinity for minimalism and light, you seem to prefer the slightly more natural,
zen-focused feel of Japanese interiors over the Scandinavian warmth, playful touches, and cozy textiles.

---

## **Overall Description of Your Interior Design Taste**

You’re best described as a lover of **Japanese Minimalism** — a hybrid that maximizes peace, clarity, and natural
simplicity. You are especially sensitive to the mood and atmosphere an interior creates. Your ideal space is one that
promotes mindfulness, rest, and an organic connection to the environment.

You dislike visual noise, clutter, and overly bold statement pieces. Instead, you favor hand-selected furnishings,
abundant natural light, and a flow that feels effortless. Emphasis is on quality over quantity: a few beautiful,
practical items, sometimes with a handcrafted touch, compose your space. Neutral and earthy colors, tasteful use of
plants, and an avoidance of busy patterns further define your aesthetic.

**In essence, your interiors are tranquil refuges rooted in purposeful simplicity, celebrating both nature and
intention.**`,
];

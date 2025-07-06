export interface Quote {
  text: string;
  category: string;
}

export const QUOTES: Quote[] = [
  // Personal Growth & Mindset
  {
    text: "Every day is a chance to become a better version of yourself.",
    category: "growth",
  },
  { text: "Your thoughts shape your reality.", category: "mindset" },
  { text: "Progress, not perfection.", category: "growth" },
  { text: "Small steps lead to big changes.", category: "growth" },
  { text: "You are capable of amazing things.", category: "affirmation" },
  { text: "Believe in yourself and all that you are.", category: "confidence" },
  { text: "Growth happens outside your comfort zone.", category: "growth" },
  { text: "Every expert was once a beginner.", category: "learning" },
  { text: "Your potential is limitless.", category: "affirmation" },
  {
    text: "Embrace the journey, not just the destination.",
    category: "wisdom",
  },

  // Resilience & Overcoming Challenges
  { text: "Fall seven times, stand up eight.", category: "resilience" },
  { text: "This too shall pass.", category: "resilience" },
  { text: "Storms make trees take deeper roots.", category: "resilience" },
  { text: "You are stronger than you think.", category: "strength" },
  { text: "Every setback is a setup for a comeback.", category: "resilience" },
  {
    text: "Difficult roads often lead to beautiful destinations.",
    category: "perseverance",
  },
  { text: "Your struggles develop your strengths.", category: "growth" },
  {
    text: "When you can't control what's happening, control how you respond.",
    category: "wisdom",
  },
  { text: "The only way out is through.", category: "perseverance" },
  { text: "You've survived 100% of your worst days.", category: "resilience" },

  // Daily Motivation & Energy
  { text: "Today is full of possibilities.", category: "motivation" },
  { text: "Make today amazing.", category: "motivation" },
  {
    text: "You have the power to create a great day.",
    category: "empowerment",
  },
  {
    text: "Start where you are, use what you have, do what you can.",
    category: "action",
  },
  { text: "Every moment is a fresh beginning.", category: "renewal" },
  { text: "Your energy introduces you before you speak.", category: "energy" },
  { text: "Choose joy, it's always available.", category: "happiness" },
  { text: "Good vibes only.", category: "positivity" },
  { text: "You are exactly where you need to be.", category: "acceptance" },
  { text: "Trust the process.", category: "patience" },

  // Self-Love & Acceptance
  { text: "You are enough, exactly as you are.", category: "self-love" },
  { text: "Love yourself first.", category: "self-love" },
  { text: "Be kind to yourself.", category: "self-compassion" },
  {
    text: "You deserve all the good things coming your way.",
    category: "self-worth",
  },
  {
    text: "Your value doesn't decrease based on someone's inability to see your worth.",
    category: "self-worth",
  },
  { text: "Self-care is not selfish.", category: "self-care" },
  { text: "You are worthy of love and respect.", category: "self-worth" },
  { text: "Embrace your uniqueness.", category: "self-acceptance" },
  { text: "You are beautifully imperfect.", category: "self-acceptance" },
  {
    text: "Your flaws make you human, your strengths make you unstoppable.",
    category: "self-love",
  },

  // Wisdom & Life Lessons
  { text: "What you focus on grows.", category: "wisdom" },
  {
    text: "Life is 10% what happens to you and 90% how you react to it.",
    category: "wisdom",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    category: "action",
  },
  {
    text: "You can't control the wind, but you can adjust your sails.",
    category: "adaptability",
  },
  { text: "Comparison is the thief of joy.", category: "wisdom" },
  { text: "Everything happens for a reason.", category: "faith" },
  { text: "The only constant in life is change.", category: "acceptance" },
  { text: "Life begins at the end of your comfort zone.", category: "courage" },
  { text: "You are the author of your own story.", category: "empowerment" },
  { text: "Sometimes you win, sometimes you learn.", category: "learning" },

  // Gratitude & Appreciation
  { text: "Gratitude turns what we have into enough.", category: "gratitude" },
  { text: "Count your blessings, not your troubles.", category: "gratitude" },
  {
    text: "There's always something to be grateful for.",
    category: "gratitude",
  },
  { text: "Appreciate the small moments.", category: "mindfulness" },
  {
    text: "Life is a gift, that's why it's called the present.",
    category: "gratitude",
  },
  { text: "Find joy in the ordinary.", category: "mindfulness" },
  { text: "Every sunrise is a gift.", category: "gratitude" },
  { text: "Be thankful for this moment.", category: "gratitude" },
  { text: "Gratitude is the key to abundance.", category: "abundance" },
  {
    text: "The more grateful you are, the more you have to be grateful for.",
    category: "gratitude",
  },

  // Success & Achievement
  { text: "Success is not final, failure is not fatal.", category: "success" },
  { text: "Dream big, work hard, stay focused.", category: "success" },
  {
    text: "The only impossible journey is the one you never begin.",
    category: "action",
  },
  { text: "Success is a journey, not a destination.", category: "success" },
  { text: "Don't wait for opportunity, create it.", category: "action" },
  { text: "Your only limit is your mind.", category: "mindset" },
  { text: "Great things never come from comfort zones.", category: "courage" },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "dreams",
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    category: "persistence",
  },
  {
    text: "You don't have to be great to get started, but you have to get started to be great.",
    category: "action",
  },

  // Relationships & Connection
  { text: "Be the reason someone smiles today.", category: "kindness" },
  { text: "Kindness is free, sprinkle it everywhere.", category: "kindness" },
  {
    text: "In a world where you can be anything, be kind.",
    category: "kindness",
  },
  { text: "We rise by lifting others.", category: "service" },
  { text: "Love is the bridge between two hearts.", category: "love" },
  {
    text: "Surround yourself with people who lift you up.",
    category: "relationships",
  },
  { text: "You are loved more than you know.", category: "love" },
  {
    text: "Connection is the energy that exists between people.",
    category: "relationships",
  },
  {
    text: "Be someone's reason to believe in the goodness of people.",
    category: "kindness",
  },
  {
    text: "The best relationships are built on trust and communication.",
    category: "relationships",
  },

  // Mindfulness & Presence
  {
    text: "Be present in all things and thankful for all things.",
    category: "mindfulness",
  },
  { text: "This moment is all we have.", category: "mindfulness" },
  { text: "Breathe and let go.", category: "mindfulness" },
  { text: "Peace comes from within.", category: "inner-peace" },
  {
    text: "The present moment is the only moment available to us.",
    category: "mindfulness",
  },
  { text: "Slow down and enjoy life.", category: "mindfulness" },
  { text: "Be here now.", category: "presence" },
  { text: "Life is happening right now.", category: "mindfulness" },
  { text: "Find peace in the chaos.", category: "inner-peace" },
  { text: "Let go of what you can't control.", category: "acceptance" },

  // Courage & Bravery
  { text: "You are braver than you believe.", category: "courage" },
  {
    text: "Courage isn't the absence of fear, it's acting despite it.",
    category: "courage",
  },
  { text: "Be brave enough to be yourself.", category: "authenticity" },
  { text: "Take the leap of faith.", category: "courage" },
  { text: "Fortune favors the bold.", category: "courage" },
  {
    text: "Do something today that your future self will thank you for.",
    category: "action",
  },
  { text: "Feel the fear and do it anyway.", category: "courage" },
  {
    text: "You have everything you need within you.",
    category: "inner-strength",
  },
  {
    text: "Be fearless in the pursuit of what sets your soul on fire.",
    category: "passion",
  },
  {
    text: "The cave you fear to enter holds the treasure you seek.",
    category: "courage",
  },

  // Creativity & Innovation
  { text: "Creativity is intelligence having fun.", category: "creativity" },
  { text: "Every artist was first an amateur.", category: "creativity" },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    category: "innovation",
  },
  { text: "Think outside the box.", category: "creativity" },
  {
    text: "Imagination is more important than knowledge.",
    category: "creativity",
  },
  { text: "Create something beautiful today.", category: "creativity" },
  {
    text: "Art is not what you see, but what you make others see.",
    category: "creativity",
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "innovation",
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    category: "excellence",
  },
  { text: "Creativity takes courage.", category: "creativity" },

  // Health & Wellness
  {
    text: "Your body is your temple, treat it with respect.",
    category: "health",
  },
  {
    text: "Health is not about the weight you lose, but about the life you gain.",
    category: "wellness",
  },
  {
    text: "Take care of your body, it's the only place you have to live.",
    category: "health",
  },
  { text: "A healthy outside starts from the inside.", category: "wellness" },
  { text: "Water is life, drink up!", category: "hydration" },
  { text: "Movement is medicine.", category: "fitness" },
  {
    text: "Rest when you're weary, refresh and renew yourself.",
    category: "rest",
  },
  {
    text: "Your mental health is just as important as your physical health.",
    category: "mental-health",
  },
  {
    text: "Listen to your body, it knows what it needs.",
    category: "wellness",
  },
  {
    text: "Healthy habits are the foundation of a happy life.",
    category: "health",
  },

  // Productivity & Focus
  { text: "Focus on progress, not perfection.", category: "productivity" },
  {
    text: "You don't have to be perfect, just consistent.",
    category: "consistency",
  },
  { text: "One task at a time.", category: "focus" },
  {
    text: "Discipline is the bridge between goals and accomplishment.",
    category: "discipline",
  },
  {
    text: "The key to productivity is doing the most important thing first.",
    category: "productivity",
  },
  { text: "Excellence is not an act, but a habit.", category: "excellence" },
  { text: "Time is your most valuable asset.", category: "time-management" },
  { text: "Procrastination is the thief of time.", category: "productivity" },
  { text: "Done is better than perfect.", category: "action" },
  { text: "Focus on what matters most.", category: "priorities" },

  // Inner Peace & Spirituality
  { text: "Peace begins with a smile.", category: "inner-peace" },
  {
    text: "The quieter you become, the more you are able to hear.",
    category: "inner-peace",
  },
  { text: "Find your inner light and let it shine.", category: "spirituality" },
  {
    text: "Meditation is not about stopping thoughts, but learning to observe them.",
    category: "meditation",
  },
  { text: "The universe has your back.", category: "faith" },
  {
    text: "You are exactly where you need to be in your journey.",
    category: "acceptance",
  },
  { text: "Trust in the timing of your life.", category: "faith" },
  {
    text: "Everything is energy and that's all there is to it.",
    category: "spirituality",
  },
  { text: "The answer lies within.", category: "inner-wisdom" },
  { text: "You are one with the universe.", category: "spirituality" },

  // Additional Motivational Quotes
  { text: "Winners never quit, quitters never win.", category: "perseverance" },
  {
    text: "The only way to do great work is to love what you do.",
    category: "passion",
  },
  {
    text: "Life isn't about finding yourself, it's about creating yourself.",
    category: "self-creation",
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, today is a gift.",
    category: "mindfulness",
  },
  {
    text: "The miracle is not that we do this work, but that we are happy to do it.",
    category: "joy",
  },
  {
    text: "Happiness is not something ready-made, it comes from your own actions.",
    category: "happiness",
  },
  { text: "The best revenge is massive success.", category: "success" },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    category: "persistence",
  },
  {
    text: "Whether you think you can or you think you can't, you're right.",
    category: "mindset",
  },
  {
    text: "The greatest glory is not in never falling, but in rising every time we fall.",
    category: "resilience",
  },

  // Additional Life Wisdom
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "life",
  },
  {
    text: "The purpose of life is to live it, to taste experience to the utmost.",
    category: "life",
  },
  {
    text: "Life is 10% what happens to you and 90% how you react to it.",
    category: "attitude",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "friendship",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    category: "authenticity",
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    category: "humor",
  },
  {
    text: "A room without books is like a body without a soul.",
    category: "learning",
  },
  {
    text: "If you want to know what a man's like, take a good look at how he treats his inferiors.",
    category: "character",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    category: "hope",
  },
  {
    text: "The only thing we have to fear is fear itself.",
    category: "courage",
  },
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
};

export const getQuotesByCategory = (category: string): Quote[] => {
  return QUOTES.filter((quote) => quote.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(QUOTES.map((quote) => quote.category))];
};

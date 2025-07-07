'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// import { useAnimation } from '@/hooks';

interface TarotCard {
  id: string;
  name: string;
  description: string;
  meaning: string;
  reversedMeaning: string;
  keywords: string[];
  image: string;
  suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  number: number;
}

const TAROT_DECK: TarotCard[] = [
  {
    id: '1',
    name: 'The Fool',
    description: 'New beginnings, innocence, spontaneity',
    meaning: 'Embrace new opportunities with childlike wonder and trust in the journey ahead.',
    reversedMeaning: 'Recklessness, naivety, or missed opportunities due to lack of planning.',
    keywords: ['new beginnings', 'innocence', 'adventure', 'spontaneity', 'trust'],
    image: '🃏',
    suit: 'major',
    number: 0,
  },
  {
    id: '2',
    name: 'The Magician',
    description: 'Manifestation, power, skill',
    meaning: 'You have all the tools and resources you need to manifest your desires.',
    reversedMeaning: 'Manipulation, poor planning, or untapped talents.',
    keywords: ['manifestation', 'power', 'skill', 'concentration', 'action'],
    image: '🧙‍♂️',
    suit: 'major',
    number: 1,
  },
  {
    id: '3',
    name: 'The High Priestess',
    description: 'Intuition, mystery, inner knowledge',
    meaning: 'Trust your intuition and inner wisdom. Listen to your subconscious mind.',
    reversedMeaning: 'Secrets, disconnected from intuition, or surface-level knowledge.',
    keywords: ['intuition', 'mystery', 'spirituality', 'inner knowledge', 'divine feminine'],
    image: '🔮',
    suit: 'major',
    number: 2,
  },
  {
    id: '4',
    name: 'The Empress',
    description: 'Fertility, nurturing, abundance',
    meaning: 'Embrace creativity, nurture your projects, and trust in abundance.',
    reversedMeaning: 'Creative block, dependence on others, or emptiness.',
    keywords: ['fertility', 'nurturing', 'abundance', 'creativity', 'motherhood'],
    image: '👑',
    suit: 'major',
    number: 3,
  },
  {
    id: '5',
    name: 'The Emperor',
    description: 'Authority, structure, control',
    meaning: 'Take charge of your situation with confidence and establish clear boundaries.',
    reversedMeaning: 'Domination, excessive control, or lack of discipline.',
    keywords: ['authority', 'structure', 'control', 'fatherhood', 'power'],
    image: '⚔️',
    suit: 'major',
    number: 4,
  },
  {
    id: '6',
    name: 'The Hierophant',
    description: 'Tradition, conformity, morality',
    meaning: 'Follow established traditions and seek guidance from mentors or institutions.',
    reversedMeaning: 'Personal beliefs, freedom, or challenging the status quo.',
    keywords: ['tradition', 'conformity', 'morality', 'ethics', 'education'],
    image: '⛪',
    suit: 'major',
    number: 5,
  },
  {
    id: '7',
    name: 'The Lovers',
    description: 'Love, harmony, relationships',
    meaning: 'Make choices from the heart and seek harmony in your relationships.',
    reversedMeaning: 'Disharmony, imbalance, or misalignment of values.',
    keywords: ['love', 'harmony', 'relationships', 'choices', 'alignment'],
    image: '💕',
    suit: 'major',
    number: 6,
  },
  {
    id: '8',
    name: 'The Chariot',
    description: 'Control, willpower, victory',
    meaning: 'Harness your willpower and determination to overcome obstacles.',
    reversedMeaning: 'Self-discipline, opposition, or lack of direction.',
    keywords: ['control', 'willpower', 'victory', 'assertion', 'determination'],
    image: '🏛️',
    suit: 'major',
    number: 7,
  },
  {
    id: '9',
    name: 'Strength',
    description: 'Inner strength, courage, persuasion',
    meaning: 'Find your inner strength and face challenges with courage and compassion.',
    reversedMeaning: 'Inner strength, self-doubt, or low energy.',
    keywords: ['inner strength', 'courage', 'persuasion', 'influence', 'compassion'],
    image: '🦁',
    suit: 'major',
    number: 8,
  },
  {
    id: '10',
    name: 'The Hermit',
    description: 'Soul-searching, introspection, solitude',
    meaning: 'Take time for introspection and seek inner guidance.',
    reversedMeaning: 'Isolation, loneliness, or withdrawal.',
    keywords: ['soul-searching', 'introspection', 'solitude', 'inner guidance', 'wisdom'],
    image: '🕯️',
    suit: 'major',
    number: 9,
  },
  {
    id: '11',
    name: 'Wheel of Fortune',
    description: 'Good luck, karma, life cycles',
    meaning: 'Embrace change and trust in the natural cycles of life.',
    reversedMeaning: 'Bad luck, resistance to change, or breaking cycles.',
    keywords: ['good luck', 'karma', 'life cycles', 'turning point', 'fate'],
    image: '🎡',
    suit: 'major',
    number: 10,
  },
  {
    id: '12',
    name: 'Justice',
    description: 'Justice, fairness, truth',
    meaning: 'Seek truth and fairness in your decisions and actions.',
    reversedMeaning: 'Unfairness, lack of accountability, or dishonesty.',
    keywords: ['justice', 'fairness', 'truth', 'cause and effect', 'law'],
    image: '⚖️',
    suit: 'major',
    number: 11,
  },
  {
    id: '13',
    name: 'The Hanged Man',
    description: 'Surrender, letting go, new perspective',
    meaning: 'Let go of control and see things from a new perspective.',
    reversedMeaning: 'Stalling, needless sacrifice, or fear of sacrifice.',
    keywords: ['surrender', 'letting go', 'new perspective', 'enlightenment', 'sacrifice'],
    image: '🔄',
    suit: 'major',
    number: 12,
  },
  {
    id: '14',
    name: 'Death',
    description: 'Endings, change, transformation',
    meaning: 'Embrace transformation and let go of what no longer serves you.',
    reversedMeaning: 'Resistance to change, inability to move on, or stagnation.',
    keywords: ['endings', 'change', 'transformation', 'transition', 'metamorphosis'],
    image: '💀',
    suit: 'major',
    number: 13,
  },
  {
    id: '15',
    name: 'Temperance',
    description: 'Balance, moderation, patience',
    meaning: 'Find balance in your life and practice patience and moderation.',
    reversedMeaning: 'Imbalance, excess, or lack of harmony.',
    keywords: ['balance', 'moderation', 'patience', 'purpose', 'meaning'],
    image: '🕊️',
    suit: 'major',
    number: 14,
  },
  {
    id: '16',
    name: 'The Devil',
    description: 'Shadow self, attachment, addiction',
    meaning: 'Face your shadow self and break free from limiting beliefs or attachments.',
    reversedMeaning: 'Releasing limiting beliefs, exploring dark thoughts, or detachment.',
    keywords: ['shadow self', 'attachment', 'addiction', 'restriction', 'sexuality'],
    image: '😈',
    suit: 'major',
    number: 15,
  },
  {
    id: '17',
    name: 'The Tower',
    description: 'Sudden change, upheaval, chaos',
    meaning: 'Embrace necessary destruction to rebuild something stronger.',
    reversedMeaning: 'Personal transformation, fear of change, or averting disaster.',
    keywords: ['sudden change', 'upheaval', 'chaos', 'revelation', 'awakening'],
    image: '🗼',
    suit: 'major',
    number: 16,
  },
  {
    id: '18',
    name: 'The Star',
    description: 'Hope, faith, purpose',
    meaning: 'Maintain hope and faith in your journey and purpose.',
    reversedMeaning: 'Lack of faith, despair, or disconnection.',
    keywords: ['hope', 'faith', 'purpose', 'renewal', 'spirituality'],
    image: '⭐',
    suit: 'major',
    number: 17,
  },
  {
    id: '19',
    name: 'The Moon',
    description: 'Illusion, fear, anxiety',
    meaning: 'Trust your intuition but be aware of illusions and fears.',
    reversedMeaning: 'Release of fear, repressed emotion, or inner confusion.',
    keywords: ['illusion', 'fear', 'anxiety', 'subconscious', 'intuition'],
    image: '🌙',
    suit: 'major',
    number: 18,
  },
  {
    id: '20',
    name: 'The Sun',
    description: 'Positivity, fun, warmth',
    meaning: 'Embrace joy, positivity, and the warmth of success.',
    reversedMeaning: 'Inner child, feeling down, or overly optimistic.',
    keywords: ['positivity', 'fun', 'warmth', 'success', 'vitality'],
    image: '☀️',
    suit: 'major',
    number: 19,
  },
  {
    id: '21',
    name: 'Judgement',
    description: 'Judgement, rebirth, inner calling',
    meaning: 'Answer your inner calling and embrace spiritual rebirth.',
    reversedMeaning: 'Self-doubt, inner critic, or ignoring the call.',
    keywords: ['judgement', 'rebirth', 'inner calling', 'absolution', 'awakening'],
    image: '👼',
    suit: 'major',
    number: 20,
  },
  {
    id: '22',
    name: 'The World',
    description: 'Completion, integration, accomplishment',
    meaning: 'Celebrate completion and integration of your journey.',
    reversedMeaning: 'Seeking personal closure, short-cut to success, or delays.',
    keywords: ['completion', 'integration', 'accomplishment', 'travel', 'unity'],
    image: '🌍',
    suit: 'major',
    number: 21,
  },
];

interface DailyPull {
  id: string;
  date: string;
  card: TarotCard;
  isReversed: boolean;
  interpretation: string;
  createdAt: Date;
}

export default function DailyTarotPull() {
  const [dailyPulls, setDailyPulls] = useState<DailyPull[]>([]);
  const [showPullDialog, setShowPullDialog] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [todayPull, setTodayPull] = useState<DailyPull | null>(null);
  // const { isDark } = useTheme();
  // const { fadeIn } = useAnimation();

  useEffect(() => {
    // Load daily pulls from localStorage
    const savedPulls = localStorage.getItem('dailyTarotPulls');
    if (savedPulls) {
      const pulls = JSON.parse(savedPulls).map((pull: Record<string, unknown>) => ({
        ...pull,
        card:
          TAROT_DECK.find(card => card.id === (pull.card as { id: string }).id) || TAROT_DECK[0],
        createdAt: new Date(pull.createdAt as string),
      }));
      setDailyPulls(pulls);

      // Check if today's pull exists
      const today = new Date().toISOString().split('T')[0];
      const todayPull = pulls.find((pull: DailyPull) => pull.date === today);
      setTodayPull(todayPull || null);
    }
  }, []);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  const saveDailyPulls = (updatedPulls: DailyPull[]) => {
    setDailyPulls(updatedPulls);
    localStorage.setItem('dailyTarotPulls', JSON.stringify(updatedPulls));
  };

  const pullDailyCard = () => {
    setIsPulling(true);
    setShowPullDialog(true);

    // Simulate card shuffling and selection
    setTimeout(() => {
      const randomCard = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
      const randomReversed = Math.random() > 0.5;

      setSelectedCard(randomCard);
      setIsReversed(randomReversed);
      setIsPulling(false);
    }, 2000);
  };

  const savePull = () => {
    if (!selectedCard) return;

    const today = new Date().toISOString().split('T')[0];
    const interpretation = isReversed ? selectedCard.reversedMeaning : selectedCard.meaning;

    const dailyPull: DailyPull = {
      id: Date.now().toString(),
      date: today,
      card: selectedCard,
      isReversed,
      interpretation,
      createdAt: new Date(),
    };

    const updatedPulls = [...dailyPulls, dailyPull];
    saveDailyPulls(updatedPulls);
    setTodayPull(dailyPull);
    setShowPullDialog(false);
    setSelectedCard(null);
    setIsReversed(false);
  };

  // const getSuitColor = (suit: string) => {
  //   switch (suit) {
  //     case 'wands':
  //       return 'text-orange-500';
  //     case 'cups':
  //       return 'text-blue-500';
  //     case 'swords':
  //       return 'text-gray-500';
  //     case 'pentacles':
  //       return 'text-green-500';
  //     default:
  //       return 'text-purple-500';
  //   }
  // };

  const title = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-star text-purple-500 text-xl"></i>
      <span className="text-xl font-bold">Daily Tarot Pull</span>
    </div>
  );
  const subtitle = (
    <span className="text-gray-600 dark:text-gray-300">Seek guidance from the cards</span>
  );

  return (
    <div className="daily-tarot-pull">
      <Card className="tarot-card shadow-lg border-0" header={title} subTitle={subtitle}>
        <div className="space-y-6">
          {/* Today's Pull */}
          {todayPull ? (
            <div className="text-center p-6 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="mb-4">
                <div className="text-6xl mb-3 transform transition-transform duration-500 hover:scale-110">
                  {todayPull.card.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {todayPull.card.name}
                  {todayPull.isReversed && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      (Reversed)
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {todayPull.card.description}
                </p>
              </div>

              <div className="text-left bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Today&apos;s Message
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{todayPull.interpretation}</p>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {todayPull.card.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Ready for Today&apos;s Guidance?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Pull a card to receive wisdom for your day
              </p>
              <Button
                label="Pull Daily Card"
                icon="pi pi-star"
                className="p-button-outlined p-button-purple"
                onClick={pullDailyCard}
              />
            </div>
          )}

          {/* Recent Pulls */}
          {dailyPulls.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Recent Pulls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {dailyPulls
                  .slice(-6)
                  .reverse()
                  .map(pull => (
                    <div
                      key={pull.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{pull.card.image}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {pull.card.name}
                            {pull.isReversed && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                (R)
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {pull.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Pull Dialog */}
      <Dialog
        header="Daily Tarot Pull"
        visible={showPullDialog}
        style={{ width: '600px' }}
        onHide={() => setShowPullDialog(false)}
        modal
        className="tarot-dialog"
      >
        <div className="text-center space-y-6">
          {isPulling ? (
            <div className="space-y-4">
              <div className="text-6xl animate-pulse">🔮</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Shuffling the Cards...
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Focus on your question and let the cards guide you
              </p>
            </div>
          ) : selectedCard ? (
            <div className="space-y-4">
              <div className="text-6xl transform transition-transform duration-500 hover:scale-110">
                {selectedCard.image}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {selectedCard.name}
                {isReversed && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(Reversed)</span>
                )}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">{selectedCard.description}</p>

              <div className="text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {isReversed ? 'Reversed Meaning' : 'Upright Meaning'}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {isReversed ? selectedCard.reversedMeaning : selectedCard.meaning}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {selectedCard.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  label="Pull Again"
                  icon="pi pi-refresh"
                  className="p-button-outlined"
                  onClick={pullDailyCard}
                />
                <Button label="Save Pull" icon="pi pi-check" onClick={savePull} />
              </div>
            </div>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
}

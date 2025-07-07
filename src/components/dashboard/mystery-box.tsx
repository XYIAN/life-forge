'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';

interface MysteryReward {
  id: string;
  type: 'motivation' | 'challenge' | 'gift' | 'wisdom' | 'activity';
  title: string;
  description: string;
  content: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  color: string;
}

const MYSTERY_REWARDS: MysteryReward[] = [
  // Motivation Rewards
  {
    id: '1',
    type: 'motivation',
    title: 'Daily Inspiration',
    description: 'A boost of motivation for your day',
    content: 'You are capable of amazing things. Today is your day to shine!',
    rarity: 'common',
    icon: '💪',
    color: 'text-blue-500',
  },
  {
    id: '2',
    type: 'motivation',
    title: 'Power Quote',
    description: 'Words of wisdom to fuel your fire',
    content: '"The only way to do great work is to love what you do." - Steve Jobs',
    rarity: 'rare',
    icon: '🔥',
    color: 'text-orange-500',
  },
  {
    id: '3',
    type: 'motivation',
    title: 'Success Mantra',
    description: 'A powerful affirmation for success',
    content: 'I am unstoppable. I am powerful. I am achieving my dreams.',
    rarity: 'epic',
    icon: '⭐',
    color: 'text-yellow-500',
  },
  {
    id: '4',
    type: 'motivation',
    title: 'Legendary Motivation',
    description: 'The ultimate motivational boost',
    content:
      'You have within you the power to change the world. Believe it, embrace it, and make it happen.',
    rarity: 'legendary',
    icon: '👑',
    color: 'text-purple-500',
  },

  // Challenge Rewards
  {
    id: '5',
    type: 'challenge',
    title: 'Mini Challenge',
    description: 'A small challenge to push yourself',
    content: 'Do 10 push-ups right now, no matter where you are!',
    rarity: 'common',
    icon: '🎯',
    color: 'text-green-500',
  },
  {
    id: '6',
    type: 'challenge',
    title: 'Social Challenge',
    description: 'Connect with someone today',
    content: "Reach out to someone you haven't talked to in a while and brighten their day.",
    rarity: 'rare',
    icon: '🤝',
    color: 'text-blue-500',
  },
  {
    id: '7',
    type: 'challenge',
    title: 'Growth Challenge',
    description: 'Step out of your comfort zone',
    content: 'Learn something new today - watch a tutorial, read an article, or try a new skill.',
    rarity: 'epic',
    icon: '🌱',
    color: 'text-emerald-500',
  },
  {
    id: '8',
    type: 'challenge',
    title: 'Legendary Quest',
    description: 'A major challenge for the brave',
    content: 'Set a big goal that scares you and take the first step toward it today.',
    rarity: 'legendary',
    icon: '⚔️',
    color: 'text-red-500',
  },

  // Gift Rewards
  {
    id: '9',
    type: 'gift',
    title: 'Self-Care Moment',
    description: 'A reminder to take care of yourself',
    content:
      'Treat yourself to something nice today - a favorite snack, a walk, or some quiet time.',
    rarity: 'common',
    icon: '🎁',
    color: 'text-pink-500',
  },
  {
    id: '10',
    type: 'gift',
    title: 'Gratitude Practice',
    description: 'A moment of appreciation',
    content: "Write down 3 things you're grateful for right now.",
    rarity: 'rare',
    icon: '🙏',
    color: 'text-yellow-500',
  },
  {
    id: '11',
    type: 'gift',
    title: 'Joy Moment',
    description: 'Find joy in the little things',
    content:
      'Do something that makes you laugh today - watch a funny video, call a friend, or dance to your favorite song.',
    rarity: 'epic',
    icon: '😊',
    color: 'text-orange-500',
  },
  {
    id: '12',
    type: 'gift',
    title: 'Legendary Gift',
    description: 'The ultimate self-gift',
    content:
      "Plan a special day for yourself - do something you've always wanted to do but never had time for.",
    rarity: 'legendary',
    icon: '💎',
    color: 'text-purple-500',
  },

  // Wisdom Rewards
  {
    id: '13',
    type: 'wisdom',
    title: 'Life Lesson',
    description: 'A simple truth to remember',
    content: 'Progress, not perfection. Every small step forward is a victory.',
    rarity: 'common',
    icon: '📚',
    color: 'text-blue-500',
  },
  {
    id: '14',
    type: 'wisdom',
    title: 'Mindful Moment',
    description: 'A moment of mindfulness',
    content:
      'Take 5 deep breaths and focus on the present moment. You are exactly where you need to be.',
    rarity: 'rare',
    icon: '🧘',
    color: 'text-green-500',
  },
  {
    id: '15',
    type: 'wisdom',
    title: 'Deep Insight',
    description: 'A profound realization',
    content: 'Your thoughts create your reality. Choose positive, empowering thoughts today.',
    rarity: 'epic',
    icon: '💡',
    color: 'text-yellow-500',
  },
  {
    id: '16',
    type: 'wisdom',
    title: 'Legendary Wisdom',
    description: 'Ancient wisdom for modern life',
    content:
      'The journey of a thousand miles begins with a single step. Your dreams are waiting for you to take action.',
    rarity: 'legendary',
    icon: '🏛️',
    color: 'text-purple-500',
  },

  // Activity Rewards
  {
    id: '17',
    type: 'activity',
    title: 'Quick Activity',
    description: 'A fun activity to try',
    content:
      'Try a new hobby for 15 minutes today - drawing, writing, cooking, or anything that interests you.',
    rarity: 'common',
    icon: '🎨',
    color: 'text-pink-500',
  },
  {
    id: '18',
    type: 'activity',
    title: 'Adventure Time',
    description: 'Explore something new',
    content: "Visit a place you've never been before - a new park, restaurant, or neighborhood.",
    rarity: 'rare',
    icon: '🗺️',
    color: 'text-blue-500',
  },
  {
    id: '19',
    type: 'activity',
    title: 'Creative Challenge',
    description: 'Express your creativity',
    content:
      'Create something today - write a poem, make a playlist, take photos, or build something with your hands.',
    rarity: 'epic',
    icon: '🎭',
    color: 'text-purple-500',
  },
  {
    id: '20',
    type: 'activity',
    title: 'Legendary Adventure',
    description: 'An epic activity to remember',
    content:
      "Plan and execute a day trip or mini-adventure that you'll remember for years to come.",
    rarity: 'legendary',
    icon: '🏔️',
    color: 'text-red-500',
  },
];

interface MysteryBoxHistory {
  id: string;
  date: string;
  reward: MysteryReward;
  claimed: boolean;
  createdAt: Date;
}

export default function MysteryBox() {
  const [history, setHistory] = useState<MysteryBoxHistory[]>([]);
  const [showBoxDialog, setShowBoxDialog] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedReward, setSelectedReward] = useState<MysteryReward | null>(null);
  const [canOpenToday, setCanOpenToday] = useState(true);
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('mysteryBoxHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((item: Record<string, unknown>) => ({
        ...item,
        reward:
          MYSTERY_REWARDS.find(r => r.id === (item.reward as { id: string }).id) ||
          MYSTERY_REWARDS[0],
        createdAt: new Date(item.createdAt as string),
      }));
      setHistory(parsedHistory);

      // Check if box was opened today
      const today = new Date().toISOString().split('T')[0];
      const todayOpened = parsedHistory.some((item: MysteryBoxHistory) => item.date === today);
      setCanOpenToday(!todayOpened);
    }
  }, []);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  const saveHistory = (updatedHistory: MysteryBoxHistory[]) => {
    setHistory(updatedHistory);
    localStorage.setItem('mysteryBoxHistory', JSON.stringify(updatedHistory));
  };

  const openMysteryBox = () => {
    setIsOpening(true);
    setShowBoxDialog(true);

    // Simulate box opening animation
    setTimeout(() => {
      const reward = getRandomReward();
      setSelectedReward(reward);
      setIsOpening(false);
    }, 3000);
  };

  const getRandomReward = (): MysteryReward => {
    const weights = {
      common: 0.5,
      rare: 0.3,
      epic: 0.15,
      legendary: 0.05,
    };

    const random = Math.random();
    let cumulativeWeight = 0;

    for (const [rarity, weight] of Object.entries(weights)) {
      cumulativeWeight += weight;
      if (random <= cumulativeWeight) {
        const rewardsOfRarity = MYSTERY_REWARDS.filter(r => r.rarity === rarity);
        return rewardsOfRarity[Math.floor(Math.random() * rewardsOfRarity.length)];
      }
    }

    return MYSTERY_REWARDS[0];
  };

  const claimReward = () => {
    if (!selectedReward) return;

    const today = new Date().toISOString().split('T')[0];
    const historyItem: MysteryBoxHistory = {
      id: Date.now().toString(),
      date: today,
      reward: selectedReward,
      claimed: true,
      createdAt: new Date(),
    };

    const updatedHistory = [...history, historyItem];
    saveHistory(updatedHistory);
    setCanOpenToday(false);
    setShowBoxDialog(false);
    setSelectedReward(null);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-500';
      case 'rare':
        return 'text-blue-500';
      case 'epic':
        return 'text-purple-500';
      case 'legendary':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 dark:bg-gray-800';
      case 'rare':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'epic':
        return 'bg-purple-100 dark:bg-purple-900';
      case 'legendary':
        return 'bg-yellow-100 dark:bg-yellow-900';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const title = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-gift text-pink-500 text-xl"></i>
      <span className="text-xl font-bold">Mystery Box</span>
    </div>
  );
  const subtitle = (
    <span className="text-gray-600 dark:text-gray-300">
      Open daily for surprise rewards and challenges
    </span>
  );

  return (
    <div className="mystery-box">
      <Card className="mystery-box-card shadow-lg border-0" header={title} subTitle={subtitle}>
        <div className="space-y-6">
          {/* Mystery Box */}
          <div className="text-center p-8 border border-pink-200 dark:border-pink-800 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            <div className="text-6xl mb-4 animate-pulse">🎁</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Daily Mystery Box
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {canOpenToday
                ? "Ready to discover today's surprise?"
                : 'Come back tomorrow for another mystery!'}
            </p>

            {canOpenToday ? (
              <Button
                label="Open Box"
                icon="pi pi-gift"
                className="p-button-outlined p-button-pink"
                onClick={openMysteryBox}
              />
            ) : (
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <i className="pi pi-lock text-xl"></i>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Already opened today</p>
              </div>
            )}
          </div>

          {/* Recent Rewards */}
          {history.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Recent Rewards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {history
                  .slice(-6)
                  .reverse()
                  .map(item => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-lg hover:shadow-sm transition-shadow ${getRarityBg(
                        item.reward.rarity
                      )}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.reward.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {item.reward.title}
                          </div>
                          <div
                            className={`text-xs font-medium ${getRarityColor(item.reward.rarity)}`}
                          >
                            {item.reward.rarity.charAt(0).toUpperCase() +
                              item.reward.rarity.slice(1)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Reward Types Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Possible Rewards
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['motivation', 'challenge', 'gift', 'wisdom', 'activity'].map(type => {
                const sampleReward = MYSTERY_REWARDS.find(r => r.type === type);
                return (
                  <div
                    key={type}
                    className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="text-2xl mb-2">{sampleReward?.icon}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                      {type}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Mystery Box Dialog */}
      <Dialog
        header="Mystery Box"
        visible={showBoxDialog}
        style={{ width: '600px' }}
        onHide={() => setShowBoxDialog(false)}
        modal
        className="mystery-box-dialog"
      >
        <div className="text-center space-y-6">
          {isOpening ? (
            <div className="space-y-4">
              <div className="text-6xl animate-bounce">🎁</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Opening Your Mystery Box...
              </h3>
              <p className="text-gray-600 dark:text-gray-400">The magic is happening! ✨</p>
            </div>
          ) : selectedReward ? (
            <div className="space-y-4">
              <div
                className={`text-6xl transform transition-transform duration-500 hover:scale-110 ${selectedReward.color}`}
              >
                {selectedReward.icon}
              </div>

              <div className={`p-2 rounded-lg ${getRarityBg(selectedReward.rarity)}`}>
                <span className={`text-sm font-bold ${getRarityColor(selectedReward.rarity)}`}>
                  {selectedReward.rarity.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {selectedReward.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">{selectedReward.description}</p>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">{selectedReward.content}</p>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  label="Open Another"
                  icon="pi pi-refresh"
                  className="p-button-outlined"
                  onClick={openMysteryBox}
                />
                <Button label="Claim Reward" icon="pi pi-check" onClick={claimReward} />
              </div>
            </div>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
}

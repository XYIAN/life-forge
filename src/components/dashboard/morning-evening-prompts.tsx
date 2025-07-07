'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
// import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';

interface PromptResponse {
  id: string;
  date: string;
  type: 'morning' | 'evening';
  question: string;
  answer: string;
  mood: number;
  createdAt: Date;
}

const MORNING_PROMPTS = [
  'What are you most excited about today?',
  "What's one thing you want to accomplish today?",
  'How are you feeling this morning?',
  'What are you grateful for right now?',
  'What would make today a great day?',
  "What's one thing you can do today to take care of yourself?",
  'What are you looking forward to learning today?',
  'How can you be kind to yourself today?',
];

const EVENING_PROMPTS = [
  'What was the highlight of your day?',
  'What did you learn today?',
  'What are you grateful for from today?',
  'How did you take care of yourself today?',
  'What would you do differently tomorrow?',
  'What made you smile today?',
  'How did you grow today?',
  'What are you looking forward to tomorrow?',
];

export default function MorningEveningPrompts() {
  const [responses, setResponses] = useState<PromptResponse[]>([]);
  const [showMorningDialog, setShowMorningDialog] = useState(false);
  const [showEveningDialog, setShowEveningDialog] = useState(false);
  const [currentResponse, setCurrentResponse] = useState({
    question: '',
    answer: '',
    mood: 3,
    type: 'morning' as 'morning' | 'evening',
  });
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();

  useEffect(() => {
    // Load responses from localStorage
    const savedResponses = localStorage.getItem('promptResponses');
    if (savedResponses) {
      setResponses(
        JSON.parse(savedResponses).map((response: Record<string, unknown>) => ({
          ...response,
          createdAt: new Date(response.createdAt as string),
        }))
      );
    }
  }, []);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  const saveResponses = (updatedResponses: PromptResponse[]) => {
    setResponses(updatedResponses);
    localStorage.setItem('promptResponses', JSON.stringify(updatedResponses));
  };

  const startPrompt = (type: 'morning' | 'evening') => {
    const prompts = type === 'morning' ? MORNING_PROMPTS : EVENING_PROMPTS;
    const randomQuestion = prompts[Math.floor(Math.random() * prompts.length)];

    setCurrentResponse({
      question: randomQuestion,
      answer: '',
      mood: 3,
      type,
    });

    if (type === 'morning') {
      setShowMorningDialog(true);
    } else {
      setShowEveningDialog(true);
    }
  };

  const saveResponse = () => {
    if (!currentResponse.answer.trim()) return;

    const response: PromptResponse = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: currentResponse.type,
      question: currentResponse.question,
      answer: currentResponse.answer,
      mood: currentResponse.mood,
      createdAt: new Date(),
    };

    saveResponses([...responses, response]);
    setCurrentResponse({ question: '', answer: '', mood: 3, type: 'morning' });
    setShowMorningDialog(false);
    setShowEveningDialog(false);
  };

  const getTodayResponses = (): PromptResponse[] => {
    const today = new Date().toISOString().split('T')[0];
    return responses.filter(response => response.date === today);
  };

  const getMoodEmoji = (mood: number): string => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊'];
    return emojis[Math.min(mood - 1, 4)];
  };

  const todayResponses = getTodayResponses();
  const hasMorningResponse = todayResponses.some(r => r.type === 'morning');
  const hasEveningResponse = todayResponses.some(r => r.type === 'evening');

  const title = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-comments text-blue-500 text-xl"></i>
      <span className="text-xl font-bold">Daily Reflections</span>
    </div>
  );
  const subtitle = (
    <span className="text-gray-600 dark:text-gray-300">
      Morning and evening prompts for self-reflection
    </span>
  );

  return (
    <div className="morning-evening-prompts">
      <Card className="prompts-card shadow-lg border-0" header={title} subTitle={subtitle}>
        <div className="space-y-6">
          {/* Morning Section */}
          <div className="text-center p-6 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <div className="mb-4">
              <i className="pi pi-sun text-3xl text-orange-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Morning Reflection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Start your day with intention and gratitude
              </p>
            </div>

            {hasMorningResponse ? (
              <div className="text-center">
                <div className="text-green-500 mb-2">
                  <i className="pi pi-check-circle text-xl"></i>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Morning reflection completed
                </p>
              </div>
            ) : (
              <Button
                label="Start Morning Reflection"
                icon="pi pi-play"
                className="p-button-outlined p-button-orange"
                onClick={() => startPrompt('morning')}
              />
            )}
          </div>

          {/* Evening Section */}
          <div className="text-center p-6 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="mb-4">
              <i className="pi pi-moon text-3xl text-purple-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Evening Reflection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Reflect on your day and prepare for tomorrow
              </p>
            </div>

            {hasEveningResponse ? (
              <div className="text-center">
                <div className="text-green-500 mb-2">
                  <i className="pi pi-check-circle text-xl"></i>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Evening reflection completed
                </p>
              </div>
            ) : (
              <Button
                label="Start Evening Reflection"
                icon="pi pi-play"
                className="p-button-outlined p-button-purple"
                onClick={() => startPrompt('evening')}
              />
            )}
          </div>

          {/* Today's Responses */}
          {todayResponses.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Today&apos;s Reflections
              </h3>
              {todayResponses.map(response => (
                <div
                  key={response.id}
                  className={`p-4 border rounded-lg ${
                    response.type === 'morning'
                      ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <i
                        className={`pi ${response.type === 'morning' ? 'pi-sun' : 'pi-moon'} ${
                          response.type === 'morning' ? 'text-orange-500' : 'text-purple-500'
                        }`}
                      ></i>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {response.type === 'morning' ? 'Morning' : 'Evening'} Reflection
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMoodEmoji(response.mood)}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {response.mood}/5
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {response.question}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{response.answer}</p>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {response.createdAt.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent History */}
          {responses.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Recent Reflections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {responses
                  .slice(-6)
                  .reverse()
                  .map(response => (
                    <div
                      key={response.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1">
                          <i
                            className={`pi ${
                              response.type === 'morning' ? 'pi-sun' : 'pi-moon'
                            } text-xs ${
                              response.type === 'morning' ? 'text-orange-500' : 'text-purple-500'
                            }`}
                          ></i>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {response.type}
                          </span>
                        </div>
                        <span className="text-lg">{getMoodEmoji(response.mood)}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {response.answer}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {response.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Morning Prompt Dialog */}
      <Dialog
        header="Morning Reflection"
        visible={showMorningDialog}
        style={{ width: '600px' }}
        onHide={() => setShowMorningDialog(false)}
        modal
        className="p-fluid"
      >
        <div className="space-y-4">
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <i className="pi pi-sun text-2xl text-orange-500 mb-2"></i>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Good Morning! ☀️
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Take a moment to reflect on your day ahead
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Today&apos;s Question
            </label>
            <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 font-medium">
              {currentResponse.question}
            </p>
          </div>

          <div>
            <label htmlFor="answer" className="block text-sm font-medium mb-2">
              Your Reflection
            </label>
            <InputTextarea
              id="answer"
              value={currentResponse.answer}
              onChange={e => setCurrentResponse({ ...currentResponse, answer: e.target.value })}
              placeholder="Share your thoughts..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How are you feeling this morning?
            </label>
            <div className="flex items-center gap-3">
              <Rating
                value={currentResponse.mood}
                onChange={e => setCurrentResponse({ ...currentResponse, mood: e.value as number })}
                stars={5}
                cancel={false}
              />
              <span className="text-2xl">{getMoodEmoji(currentResponse.mood)}</span>
            </div>
          </div>
        </div>
        footer=
        {
          <div className="flex gap-2 justify-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setShowMorningDialog(false)}
            />
            <Button
              label="Save Reflection"
              icon="pi pi-check"
              onClick={saveResponse}
              disabled={!currentResponse.answer.trim()}
            />
          </div>
        }
      </Dialog>

      {/* Evening Prompt Dialog */}
      <Dialog
        header="Evening Reflection"
        visible={showEveningDialog}
        style={{ width: '600px' }}
        onHide={() => setShowEveningDialog(false)}
        modal
        className="p-fluid"
      >
        <div className="space-y-4">
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <i className="pi pi-moon text-2xl text-purple-500 mb-2"></i>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Good Evening! 🌙
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Take a moment to reflect on your day</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Today&apos;s Question
            </label>
            <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 font-medium">
              {currentResponse.question}
            </p>
          </div>

          <div>
            <label htmlFor="evening-answer" className="block text-sm font-medium mb-2">
              Your Reflection
            </label>
            <InputTextarea
              id="evening-answer"
              value={currentResponse.answer}
              onChange={e => setCurrentResponse({ ...currentResponse, answer: e.target.value })}
              placeholder="Share your thoughts..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">How was your day overall?</label>
            <div className="flex items-center gap-3">
              <Rating
                value={currentResponse.mood}
                onChange={e => setCurrentResponse({ ...currentResponse, mood: e.value as number })}
                stars={5}
                cancel={false}
              />
              <span className="text-2xl">{getMoodEmoji(currentResponse.mood)}</span>
            </div>
          </div>
        </div>
        footer=
        {
          <div className="flex gap-2 justify-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setShowEveningDialog(false)}
            />
            <Button
              label="Save Reflection"
              icon="pi pi-check"
              onClick={saveResponse}
              disabled={!currentResponse.answer.trim()}
            />
          </div>
        }
      </Dialog>
    </div>
  );
}

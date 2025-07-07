'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';

interface SocialActivity {
  id: string;
  type: 'challenge' | 'question' | 'share' | 'connect';
  title: string;
  description: string;
  content: string;
  category: 'friends' | 'family' | 'work' | 'community';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  icon: string;
  color: string;
}

interface SocialPost {
  id: string;
  type: 'achievement' | 'milestone' | 'reflection' | 'challenge';
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  likes: number;
  comments: number;
}

const SOCIAL_ACTIVITIES: SocialActivity[] = [
  // Challenges
  {
    id: '1',
    type: 'challenge',
    title: 'Gratitude Call',
    description: "Call someone and tell them why you're grateful for them",
    content:
      'Reach out to a friend, family member, or colleague and express your gratitude for their presence in your life.',
    category: 'friends',
    difficulty: 'easy',
    points: 10,
    icon: '📞',
    color: 'text-blue-500',
  },
  {
    id: '2',
    type: 'challenge',
    title: 'Random Act of Kindness',
    description: 'Do something kind for a stranger today',
    content:
      "Hold the door, pay for someone's coffee, or simply smile and say hello to brighten someone's day.",
    category: 'community',
    difficulty: 'easy',
    points: 15,
    icon: '🤝',
    color: 'text-green-500',
  },
  {
    id: '3',
    type: 'challenge',
    title: 'Social Media Detox',
    description: 'Take a 24-hour break from social media',
    content:
      'Disconnect from social media for a full day and focus on real-world connections and activities.',
    category: 'friends',
    difficulty: 'medium',
    points: 25,
    icon: '📱',
    color: 'text-purple-500',
  },
  {
    id: '4',
    type: 'challenge',
    title: 'Reconnect with Old Friend',
    description: "Reach out to someone you haven't talked to in months",
    content:
      "Send a message, call, or meet up with someone you've lost touch with and rekindle your friendship.",
    category: 'friends',
    difficulty: 'medium',
    points: 20,
    icon: '👥',
    color: 'text-orange-500',
  },

  // Questions
  {
    id: '5',
    type: 'question',
    title: 'Deep Conversation Starter',
    description: 'Ask someone a meaningful question',
    content:
      "Ask someone: \"What's something you've always wanted to do but haven't had the chance to try yet?\"",
    category: 'family',
    difficulty: 'easy',
    points: 5,
    icon: '❓',
    color: 'text-yellow-500',
  },
  {
    id: '6',
    type: 'question',
    title: 'Life Philosophy Share',
    description: 'Share your life philosophy with someone',
    content:
      'Have a conversation about your core values and beliefs with a friend or family member.',
    category: 'family',
    difficulty: 'medium',
    points: 15,
    icon: '💭',
    color: 'text-indigo-500',
  },
  {
    id: '7',
    type: 'question',
    title: 'Dream Discussion',
    description: 'Talk about your dreams and aspirations',
    content: 'Share your biggest dreams and goals with someone, and ask about theirs in return.',
    category: 'work',
    difficulty: 'medium',
    points: 20,
    icon: '🌟',
    color: 'text-pink-500',
  },

  // Share Activities
  {
    id: '8',
    type: 'share',
    title: 'Skill Share',
    description: 'Teach someone something you know',
    content: 'Share a skill, hobby, or knowledge with someone who wants to learn.',
    category: 'community',
    difficulty: 'medium',
    points: 25,
    icon: '🎓',
    color: 'text-teal-500',
  },
  {
    id: '9',
    type: 'share',
    title: 'Story Time',
    description: 'Share a meaningful story from your life',
    content:
      'Tell someone a story about a time when you learned something important or overcame a challenge.',
    category: 'family',
    difficulty: 'easy',
    points: 10,
    icon: '📖',
    color: 'text-red-500',
  },
  {
    id: '10',
    type: 'share',
    title: 'Recommendation Share',
    description: 'Share your favorite book, movie, or music',
    content: 'Recommend something you love to someone and explain why it means so much to you.',
    category: 'friends',
    difficulty: 'easy',
    points: 5,
    icon: '📚',
    color: 'text-blue-500',
  },

  // Connect Activities
  {
    id: '11',
    type: 'connect',
    title: 'Coffee Meetup',
    description: 'Meet someone for coffee or tea',
    content:
      'Schedule a face-to-face meeting with a friend, colleague, or acquaintance for a casual chat.',
    category: 'work',
    difficulty: 'easy',
    points: 15,
    icon: '☕',
    color: 'text-brown-500',
  },
  {
    id: '12',
    type: 'connect',
    title: 'Group Activity',
    description: 'Organize a group activity',
    content: 'Plan and organize a fun activity with friends, family, or colleagues.',
    category: 'community',
    difficulty: 'hard',
    points: 30,
    icon: '🎉',
    color: 'text-purple-500',
  },
  {
    id: '13',
    type: 'connect',
    title: 'Mentorship',
    description: 'Offer to mentor someone',
    content:
      'Share your knowledge and experience by offering to mentor someone in your field or area of expertise.',
    category: 'work',
    difficulty: 'hard',
    points: 35,
    icon: '👨‍🏫',
    color: 'text-green-500',
  },
];

export default function SocialFunPanel() {
  const [activities] = useState<SocialActivity[]>(SOCIAL_ACTIVITIES);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<SocialActivity | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'achievement' as 'achievement' | 'milestone' | 'reflection' | 'challenge',
  });
  const [filter, setFilter] = useState('all');
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('socialPosts');
    if (savedPosts) {
      setPosts(
        JSON.parse(savedPosts).map((post: Record<string, unknown>) => ({
          ...post,
          createdAt: new Date(post.createdAt as string),
        }))
      );
    }
  }, []);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  const savePosts = (updatedPosts: SocialPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));
  };

  const startActivity = (activity: SocialActivity) => {
    setSelectedActivity(activity);
    setShowActivityDialog(true);
  };

  const completeActivity = () => {
    if (!selectedActivity) return;

    // Add points to user's score (you can implement a points system)
    console.log(
      `Completed activity: ${selectedActivity.title} (+${selectedActivity.points} points)`
    );

    setShowActivityDialog(false);
    setSelectedActivity(null);
  };

  const createPost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: SocialPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      type: newPost.type,
      category: newPost.type,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    };

    savePosts([...posts, post]);
    setNewPost({ title: '', content: '', type: 'achievement' });
    setShowPostDialog(false);
  };

  const likePost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'danger' | 'info' => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'info';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'friends':
        return '👥';
      case 'family':
        return '👨‍👩‍👧‍👦';
      case 'work':
        return '💼';
      case 'community':
        return '🌍';
      default:
        return '🤝';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return '🏆';
      case 'milestone':
        return '🎯';
      case 'reflection':
        return '💭';
      case 'challenge':
        return '⚡';
      default:
        return '📝';
    }
  };

  const filteredActivities =
    filter === 'all' ? activities : activities.filter(activity => activity.type === filter);

  return (
    <div className="social-fun-panel">
      <Card
        className="glass-card social-fun-card shadow-lg border-0"
        header={
          <div className="flex align-items-center gap-2">
            <i className="pi pi-users text-indigo-500 text-xl"></i>
            <span className="text-xl font-bold">Social Fun</span>
          </div>
        }
        subTitle={
          <span className="text-gray-600 dark:text-gray-300">
            Connect, share, and grow with others
          </span>
        }
      >
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              label="Share Achievement"
              icon="pi pi-plus"
              className="p-button-outlined p-button-success"
              onClick={() => setShowPostDialog(true)}
            />
            <Button
              label="View Posts"
              icon="pi pi-comments"
              className="p-button-outlined p-button-info"
              onClick={() => setFilter('all')}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['all', 'challenge', 'question', 'share', 'connect'].map(filterType => (
              <Button
                key={filterType}
                label={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                className={`p-button-sm p-button-outlined ${
                  filter === filterType ? 'p-button-primary' : ''
                }`}
                onClick={() => setFilter(filterType)}
              />
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center justify-center">
            {filteredActivities.map(activity => (
              <div
                key={activity.id}
                className="p-4 glass-card hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => startActivity(activity)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="text-right">
                    <Tag
                      value={activity.difficulty}
                      severity={getDifficultyColor(activity.difficulty)}
                      className="text-xs"
                    />
                    <div className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                      +{activity.points} pts
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                  {activity.title}
                </h3>
                <p
                  className="text-sm mb-3 line-clamp-2"
                  style={{ color: 'var(--foreground)', opacity: 0.8 }}
                >
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{getCategoryIcon(activity.category)}</span>
                    <span
                      className="text-xs capitalize"
                      style={{ color: 'var(--foreground)', opacity: 0.7 }}
                    >
                      {activity.category}
                    </span>
                  </div>
                  <Button label="Start" icon="pi pi-play" className="p-button-text p-button-sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Posts */}
          {posts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Recent Posts
              </h3>
              <div className="space-y-3 flex flex-col items-center justify-center">
                {posts
                  .slice(-3)
                  .reverse()
                  .map(post => (
                    <div key={post.id} className="p-4 glass-card">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{getTypeIcon(post.type)}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                            {post.title}
                          </h4>
                          <div
                            className="text-xs"
                            style={{ color: 'var(--foreground)', opacity: 0.7 }}
                          >
                            {post.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="mb-3" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                        {post.content}
                      </p>
                      <div
                        className="flex items-center gap-4 text-sm"
                        style={{ color: 'var(--foreground)', opacity: 0.7 }}
                      >
                        <button
                          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                          onClick={() => likePost(post.id)}
                        >
                          <i className="pi pi-heart"></i>
                          <span>{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1">
                          <i className="pi pi-comments"></i>
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Activity Dialog */}
      <Dialog
        header={selectedActivity?.title}
        visible={showActivityDialog}
        style={{ width: '600px' }}
        onHide={() => setShowActivityDialog(false)}
        modal
        className="activity-dialog"
      >
        {selectedActivity && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-4xl mb-2">{selectedActivity.icon}</div>
              <p className="text-gray-600 dark:text-gray-400">{selectedActivity.description}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">What to do:</h4>
              <p className="text-gray-700 dark:text-gray-300">{selectedActivity.content}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">{getCategoryIcon(selectedActivity.category)}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {selectedActivity.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag
                  value={selectedActivity.difficulty}
                  severity={getDifficultyColor(selectedActivity.difficulty)}
                />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  +{selectedActivity.points} points
                </span>
              </div>
            </div>
          </div>
        )}
        footer=
        {
          <div className="flex gap-2 justify-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setShowActivityDialog(false)}
            />
            <Button label="Complete Activity" icon="pi pi-check" onClick={completeActivity} />
          </div>
        }
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog
        header="Share Your Achievement"
        visible={showPostDialog}
        style={{ width: '600px' }}
        onHide={() => setShowPostDialog(false)}
        modal
        className="post-dialog"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="post-title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <InputText
              id="post-title"
              value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="What did you accomplish?"
            />
          </div>

          <div>
            <label htmlFor="post-content" className="block text-sm font-medium mb-2">
              Share your story
            </label>
            <InputTextarea
              id="post-content"
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Tell us about your achievement, milestone, or reflection..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Post Type</label>
            <div className="flex gap-2">
              {['achievement', 'milestone', 'reflection', 'challenge'].map(type => (
                <Button
                  key={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  className={`p-button-outlined ${newPost.type === type ? 'p-button-primary' : ''}`}
                  onClick={() =>
                    setNewPost({
                      ...newPost,
                      type: type as 'achievement' | 'milestone' | 'reflection' | 'challenge',
                    })
                  }
                />
              ))}
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
              onClick={() => setShowPostDialog(false)}
            />
            <Button
              label="Share Post"
              icon="pi pi-send"
              onClick={createPost}
              disabled={!newPost.title || !newPost.content}
            />
          </div>
        }
      </Dialog>
    </div>
  );
}

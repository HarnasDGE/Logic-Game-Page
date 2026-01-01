import React from 'react';
import { Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
}

export interface BlogSectionProps {
  className?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Brain-Boosting Benefits of Daily Quiz Practice',
    excerpt: 'Discover how solving quizzes daily can improve your memory, focus, and cognitive abilities.',
    image: '📚',
    category: 'Brain Health',
    date: '2024-01-15',
    readTime: 5,
    author: 'Dr. Sarah Johnson',
  },
  {
    id: '2',
    title: 'How to Master Trivia: Tips from Champions',
    excerpt: 'Learn the strategies and techniques used by top trivia players to dominate competitions.',
    image: '🏆',
    category: 'Tips & Tricks',
    date: '2024-01-12',
    readTime: 7,
    author: 'Mike Chen',
  },
  {
    id: '3',
    title: 'The Science Behind Personality Quizzes',
    excerpt: 'Understanding the psychology and research that makes personality assessments effective.',
    image: '🧠',
    category: 'Psychology',
    date: '2024-01-10',
    readTime: 6,
    author: 'Emma Rodriguez',
  },
];

/**
 * BlogSection Component - Latest blog posts
 *
 * Displays recent blog posts in a card grid
 *
 * @example
 * <BlogSection />
 */
export const BlogSection: React.FC<BlogSectionProps> = ({ className }) => {
  return (
    <section className={cn('py-16 sm:py-20 bg-gradient-to-b from-white to-dark-50', className)}>
      <div className="container-custom">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-2">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-dark-600">
              Insights, tips, and stories from the world of quizzes
            </p>
          </div>
          <a
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
          >
            View All Posts
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-dark-100"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 flex items-center justify-center text-8xl">
                {post.image}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category and date */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 font-semibold rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-dark-500">
                    <Calendar size={14} />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-dark-600 mb-4 line-clamp-2">{post.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-100">
                  <div className="flex items-center gap-2 text-sm text-dark-500">
                    <Clock size={14} />
                    <span>{post.readTime} min read</span>
                  </div>
                  <button className="flex items-center gap-1 text-primary-600 font-semibold hover:gap-2 transition-all">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            View All Posts
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

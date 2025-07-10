import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Article {
  id: string;
  blog_name: string;
  filename?: string;
  blog_slug: string;
  category_name?: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentArticleId: string;
  className?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  currentArticleId,
  className = '',
}) => {
  // Filter out the current article and limit to 3 related articles
  const filteredArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Related Articles</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <Link
            key={article.id}
            href={`/blog/${article.blog_slug}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-video relative overflow-hidden">
              <ImageWithFallback
                src={article.filename || '/assets/blogs/default-blog.jpg'}
                alt={article.blog_name}
                width={400}
                height={225}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {article.category_name && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {article.category_name}
                </span>
              )}
            </div>

            <div className="p-4">
              <h4 className="font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {article.blog_name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;

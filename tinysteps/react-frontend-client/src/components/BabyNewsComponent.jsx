import { useState, useEffect } from 'react';
import MilestonesService from '../MilestonesService';
import '../index.css';

const BabyNewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Baby News - TinySteps';
    MilestonesService.getBabyNews().then((res) => {
      setArticles(res.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError("Couldn't load news articles right now.");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  return (
    <div>
      <h2 className="page-title">Baby & Parenting News 📰</h2>
      <p className="page-subtitle">The latest articles on baby development and milestones</p>

      {articles.length === 0 ? (
        <p className="empty-msg">No articles found right now. Check back later!</p>
      ) : (
        <div className="news-list">
          {articles.map((article, index) => (
            <div className="news-card" key={index}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <div className="news-content">
                <h3 className="news-title">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p className="news-source">Source: {article.source?.name || 'Unknown'}</p>
                <p className="news-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BabyNewsComponent;

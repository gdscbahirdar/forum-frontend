import { useNavigate } from "react-router-dom";
import { articles } from "./contents";
import { Card, Tag } from "components/ui";
import useQuery from "utils/hooks/useQuery";

const ArticleList = () => {
  const navigate = useNavigate();

  const query = useQuery();
  const category = query.get("category");

  const categoryArticles =
    articles.find(item => item.category === category)?.articles || [];

  const onArticleClick = title => {
    navigate(`/help-article?category=${category}&title=${title}`);
  };

  return (
    <section className="max-w-[1000px] mx-auto">
      {categoryArticles.map(article => (
        <article key={article.id}>
          <Card
            className="group mb-4"
            clickable
            onClick={() => onArticleClick(article.title)}
          >
            <div className="px-8 py-3 relative">
              <div className="flex items-center justify-between mb-2">
                <h5 className="group-hover:underline">{article.title}</h5>
                <Tag className={`border-0 rounded capitalize`}>{category}</Tag>
              </div>
              <p>
                {article.content.length > 230
                  ? article.content.substring(0, 229) + "..."
                  : article.content}
              </p>
            </div>
          </Card>
        </article>
      ))}
    </section>
  );
};

export default ArticleList;

import { AdaptableCard, Container } from "components/shared";
import useQuery from "utils/hooks/useQuery";
import { articles } from "./contents";
import { MdPreview } from "md-editor-rt";

const ArticleContent = () => {
  const query = useQuery();
  const category = query.get("category");
  const title = query.get("title");

  const categoryArticles =
    articles.find(item => item.category === category)?.articles || [];

  const article = categoryArticles.find(item => item.title === title);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <Container>
      <AdaptableCard bodyClass="lg:flex gap-4">
        <div className="my-6 max-w-[800px] w-full mx-auto">
          <h3>{article.title}</h3>
          <div className="mt-8 prose dark:prose-invert max-w-none text-justify">
            <MdPreview modelValue={article.content} />
          </div>
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default ArticleContent;

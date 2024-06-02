import React from "react";
import { categories } from "./contents";
import { Card } from "components/ui";
import { useNavigate } from "react-router-dom";

const BodySection = () => {
  const navigate = useNavigate();
  const onCategoryClick = name => {
    navigate(`/help-articles?category=${name}`);
  };

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {categories.map(cat => (
        <Card
          clickable
          key={cat.name}
          onClick={() => onCategoryClick(cat.name)}
        >
          <div className="mb-4 flex justify-center">
            <div></div>
          </div>
          <div className="text-center">
            <h5 className="mb-1">{cat.name}</h5>
            <strong>{cat.articleCounts} </strong>
            <span>Articles</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BodySection;

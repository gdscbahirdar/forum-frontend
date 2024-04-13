import React from "react";
import { Card, Tag } from "components/ui";
import { Link } from "react-router-dom";

const GridItem = ({ data }) => {
  const { name, description } = data;

  return (
    <Card bodyClass="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <Link to={`/questions/tagged/${name}`}>
            <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border border-blue-200 rounded mr-1 text-xs font-light">
              {name}
            </Tag>
          </Link>
        </div>
        <p className="mt-4">
          {description.length > 230
            ? description.substring(0, 229) + "..."
            : description}
        </p>
      </div>
    </Card>
  );
};

export default GridItem;

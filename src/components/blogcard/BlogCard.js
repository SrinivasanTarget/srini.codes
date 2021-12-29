import React from "react";

const BlogCard = ({ title, tags, source }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-title">{title}</div>
      <div className="blog-card-tags">{tags}</div>
      <div className="blog-card-source">{source}</div>
    </div>
  );
};

export default BlogCard;

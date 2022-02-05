import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      </Helmet>
    </HelmetProvider>
  );
};

Meta.defaultProps = {
  title: "Dev-Connector",
  description: "The best place to connect with other developers",
  keywords: "Software Engineering, developers, social media",
};

export default Meta;

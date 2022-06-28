import { FC } from 'react';

export type MetaProps = {
  title?: string;
  url?: string;
  description?: string; //Should be no longer than 200 characters
  image?: string;
};

const Meta: FC<MetaProps> = ({ title, url, description, image }) => (
  <>
    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </>
    )}
    {description && (
      <>
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
      </>
    )}
    {image && <meta name="og:image" content={image} />}
    {url && <meta name="og:url" content={url} />}
  </>
);

export default Meta;

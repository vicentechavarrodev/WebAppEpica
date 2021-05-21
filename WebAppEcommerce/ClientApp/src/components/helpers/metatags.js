import React from 'react';
import { Helmet } from 'react-helmet';

const Metatags = ({ description, title, siteTitle }) => {
    return (
        <Helmet
            title={title}
            titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
            meta={[
                {
                    name: `description`,
                    content: description,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: description,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: description,
                },
            ]}
        />
    )
}

export default Metatags;
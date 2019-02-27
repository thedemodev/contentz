const { Fragment } = require("react");
const { jsx } = require("@emotion/core");
const format = require("date-fns/format");

const { Title, Description } = require("./lead");
const Header = require("./header");

function ArchivePage({ config = {}, articles = [] } = {}) {
  return jsx(
    Fragment,
    null,
    jsx(Header, { ...config, target: "/" }),
    jsx(
      "section",
      {
        css: {
          margin: "0 auto",
          maxWidth: "50em",
          "@media (max-width: 50em)": {
            padding: "0 1.5em"
          }
        }
      },
      jsx(Title, null, "Articles"),
      jsx(Description, null, `List of articles of ${config.title}`),
      jsx(
        "ul",
        {
          css: {
            listStyleType: "none",
            paddingLeft: 0
          }
        },
        articles
          .filter(article => article.published)
          .sort((a, b) => b.date - a.date)
          .map(article =>
            jsx(
              "li",
              {
                key: JSON.stringify(article),
                css: {
                  margin: "1em 0",
                  fontSize: "1.25em",
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr",
                  gridTemplateRows: "2",
                  gridTemplateAreas: '"date title" ". description"',
                  "@media (max-width: 50em) and (orientation: landscape)": {
                    gridTemplateColumns: "1fr auto",
                    gridTemplateRows: "auto auto",
                    gridTemplateAreas: '"title date" "description description"'
                  },
                  "@media (max-width: 50em) and (orientation: portrait)": {
                    gridTemplateColumns: "auto",
                    gridTemplateRows: "auto auto auto",
                    gridTemplateAreas: '"title" "date" "description"'
                  }
                }
              },
              article.date &&
                jsx(
                  "time",
                  {
                    dateTime: article.date.toJSON(),
                    css: {
                      fontWeight: "200",
                      marginRight: "1em",
                      gridArea: "date",
                      textAlign: "right",
                      "@media (max-width: 50em) and (orientation: landscape)": {
                        marginRight: "0",
                        marginLeft: "1em"
                      },
                      "@media (max-width: 50em) and (orientation: portrait)": {
                        marginRight: "0",
                        marginTop: "0.5em"
                      }
                    }
                  },
                  format(article.date, "MMMM DD, YYYY")
                ),
              jsx(
                "h2",
                { css: { gridArea: "title", margin: 0, fontSize: "1em" } },
                jsx(
                  "a",
                  {
                    href: article.path,
                    css: {
                      color: "black",
                      "@media (prefers-color-scheme: dark)": { color: "white" }
                    }
                  },
                  article.title
                )
              ),
              article.description &&
                jsx(
                  "p",
                  { css: { gridArea: "description" } },
                  article.description
                )
            )
          )
      )
    )
  );
}

module.exports = ArchivePage;

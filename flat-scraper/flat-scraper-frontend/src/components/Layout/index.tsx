import { ReactNode } from "react";

import "./Layout.css";

interface Props {
  isScraping: boolean;
  hasPagination: boolean;
  children: ReactNode;
  onScrapeClicked: () => void;
  onPaginationClicked: () => void;
}

const Layout = ({
  isScraping,
  hasPagination,
  children,
  onScrapeClicked,
  onPaginationClicked,
}: Props) => {
  return (
    <div className="layout">
      <div className="header">
        <h1>
          Apartment Rental <br />
          <button onClick={onScrapeClicked} disabled={isScraping}>
            {isScraping ? "Scraping" : "Scrape"}
          </button>
        </h1>
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        <div className="pagination">
          {hasPagination && (
            <button onClick={onPaginationClicked}>More Apartments</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;

import "./recently_updated_sections.styles.css";

function RecentlyUpdatedSection() {
  // Todo: Make this an API call instead
  const recently_updated_urls = [
    "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_1.jpeg",
    "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_2.jpeg",
    "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_4.jpeg",
    "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_5.jpeg",
    "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_6.jpeg",
  ];

  return (
    <div>
      <h1 className="recently-updated-text">Recently Updated</h1>
      {recently_updated_urls.map((url) => {
        return (
          <a href="https://google.com">
            <img className="cover-image" src={url} width="100" height="180" />
          </a>
        );
      })}
    </div>
  );
}

export default RecentlyUpdatedSection;

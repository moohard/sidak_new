import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import moment from "moment";
import { useRouter } from "next/router";

interface NewsCardProps {
  data: {
    id: number;
    title: string;
    summary?: string;
    cover_url?: string;
    published_at: string;
    category_name: string;
    slug: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/portal/news/${data.slug}`);
  };

  return (
    <Card className="news-card shadow-sm h-100 mb-4" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="news-image-wrapper" style={{ height: "180px", overflow: "hidden" }}>
        <img
          src={data.cover_url || "/assets/images/dashboard/default-news.png"}
          alt={data.title}
          className="img-fluid w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardBody className="d-flex flex-column">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <Badge color="primary" pill>{data.category_name}</Badge>
          <small className="text-muted">{moment(data.published_at).format("DD MMM YYYY")}</small>
        </div>
        <h5 className="news-title line-clamp-2 mb-2">{data.title}</h5>
        <p className="news-summary text-muted small line-clamp-3 mb-0">
          {data.summary || "Klik untuk membaca selengkapnya..."}
        </p>
      </CardBody>
    </Card>
  );
};

export default NewsCard;

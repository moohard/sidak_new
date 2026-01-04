import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge, Button } from "reactstrap";
import { useRouter } from "next/router";
import { getNewsDetail } from "../../../api/newsService";
import moment from "moment";
import { ArrowLeft, Share2, Calendar, User, Tag } from "react-feather";
import { toast } from "react-toastify";

const NewsDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      try {
        const res = await getNewsDetail(slug as string);
        setData(res.data.data);
      } catch (error) {
        toast.error("Berita tidak ditemukan");
        router.push("/portal/news");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) return <div className="p-5 text-center">Memuat berita...</div>;
  if (!data) return null;

  return (
    <div className="page-body-wrapper pt-4">
      <Container>
        <Row className="justify-content-center">
          <Col lg="10">
            <Button color="link" className="px-0 mb-3 text-decoration-none text-dark" onClick={() => router.back()}>
              <ArrowLeft size={18} className="me-2" /> Kembali
            </Button>
            
            <Card className="border-0 shadow-sm overflow-hidden mb-5">
              <div className="detail-news-image" style={{ height: "400px", overflow: "hidden" }}>
                <img
                  src={data.cover_url || "/assets/images/dashboard/default-news.png"}
                  alt={data.title}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardBody className="p-4 p-md-5">
                <div className="d-flex flex-wrap gap-3 mb-4 text-muted small align-items-center">
                  <Badge color="primary" pill>{data.category_name}</Badge>
                  <span className="d-flex align-items-center"><Calendar size={14} className="me-1" /> {moment(data.published_at).format("DD MMMM YYYY")}</span>
                  <span className="d-flex align-items-center"><User size={14} className="me-1" /> Admin Kepegawaian</span>
                </div>

                <h1 className="mb-4 fw-bold">{data.title}</h1>
                
                <div 
                  className="news-content-body" 
                  dangerouslySetInnerHTML={{ __html: data.content }}
                  style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
                />

                <hr className="my-5" />
                
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div className="tags-list">
                    <span className="me-2 text-muted"><Tag size={16} /> Tags:</span>
                    {data.tags?.map((tag: any, idx: number) => (
                      <Badge key={idx} color="light" className="text-dark me-2" pill>#{tag.title}</Badge>
                    ))}
                  </div>
                  <Button color="light" size="sm" onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link disalin!");
                  }}>
                    <Share2 size={16} className="me-2" /> Bagikan
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsDetail;

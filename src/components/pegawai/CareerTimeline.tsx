import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Briefcase, Award } from "react-feather";

interface CareerTimelineProps {
  jabatan: any[];
  pangkat: any[];
}

const CareerTimeline = ({ jabatan, pangkat }: CareerTimelineProps) => {
  // Combine and sort events by date
  const events = [
    ...jabatan.map((j) => ({
      date: j.tmt_jabatan,
      title: j.jabatan,
      subtitle: j.unit_kerja,
      type: "jabatan",
      icon: <Briefcase />,
      iconBg: "rgb(33, 150, 243)",
    })),
    ...pangkat.map((p) => ({
      date: p.tmt_pangkat,
      title: `Kenaikan Pangkat: ${p.pangkat}`,
      subtitle: `Golongan ${p.golongan}`,
      type: "pangkat",
      icon: <Award />,
      iconBg: "rgb(233, 30, 99)",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="career-timeline">
      <VerticalTimeline layout="1-column-left">
        {events.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#f8f9fa", color: "#333", boxShadow: "0 3px 0 #ddd" }}
            contentArrowStyle={{ borderRight: "7px solid  #f8f9fa" }}
            date={event.date}
            iconStyle={{ background: event.iconBg, color: "#fff" }}
            icon={event.icon}
          >
            <h5 className="vertical-timeline-element-title">{event.title}</h5>
            <h6 className="vertical-timeline-element-subtitle text-muted">{event.subtitle}</h6>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default CareerTimeline;

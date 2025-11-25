import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const AdminWelcome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const today = format(currentTime, "EEEE, dd 'tháng' MM, yyyy", { locale: vi });
  const time = format(currentTime, "HH:mm:ss");

  return (
    <div className="container py-5 min-vh-90 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-4 fw-bold text-dark mb-4 animate__animated animate__fadeIn">
          Chào mừng quay lại!
        </h1>

        <p className="fs-3 text-secondary mb-3">
          Hôm nay là <strong className="text-dark">{today}</strong>
        </p>

        <div className="d-inline-block bg-white rounded-4 shadow-lg px-5 py-4 border">
          <h2 className="display-5 fw-bold text-dark mb-0 tracking-wider">
            {time}
          </h2>
        </div>

        <div className="mt-4">
          <small className="text-muted opacity-75">
            AVELINE Admin Panel • Đang hoạt động
          </small>
        </div>
      </div>

      <style jsx>{`
        .tracking-wider {
          letter-spacing: 4px;
          font-family: "SF Mono", "Roboto Mono", Menlo, monospace;
        }
        .border {
          border: 3px solid #f0f0f0 !important;
        }
        @media (max-width: 576px) {
          .display-4 {
            font-size: 2.5rem;
          }
          .display-5 {
            font-size: 2.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminWelcome;
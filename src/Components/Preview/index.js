import React, { useEffect } from "react";

const Preview = ({ children, showAddSuccessfully }) => {
  return (
    <div className="preview-section">
      {showAddSuccessfully && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            right: "40%",
            color: "green",
            // background:'silver',
            boxShadow: "0 0 10px 2px gray",
            padding: "10px",
            borderRadius: "10px",
          }}
          data-aos="zoom-out"
          data-aos-duration="2000"
          data-aos-anchor-placement="center-bottom"
        >
          تمت الاضافه بنجاح✅
        </span>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

export default Preview;

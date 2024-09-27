import React, { useState } from "react";

function CustomBanner({ isPremium }) {
  const [bannerText, setBannerText] = useState("Welcome to Premium!");

  if (!isPremium) {
    return <p>Upgrade to set custom banners.</p>;
  }

  const handleBannerChange = (e) => {
    setBannerText(e.target.value);
  };

  return (
    <div>
      <h2>Custom Banner</h2>
      <input
        type="text"
        value={bannerText}
        onChange={handleBannerChange}
        placeholder="Enter your custom banner text"
      />
      <p>{bannerText}</p>
    </div>
  );
}

export default CustomBanner;

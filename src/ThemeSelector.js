import React, { useState } from "react";

function ThemeSelector({ isPremium }) {
  const [theme, setTheme] = useState("light");

  if (!isPremium) {
    return <p>Upgrade to customize your theme.</p>;
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.setAttribute("data-theme", e.target.value);
  };

  return (
    <div>
      <h2>Select Theme</h2>
      <select value={theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

export default ThemeSelector;

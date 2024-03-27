import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      {/* footer bottom */}
      <div className="bg-Black">
        <p className="text-white text-center items-center py-3">
          © {currentYear} Zara, B2005766.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

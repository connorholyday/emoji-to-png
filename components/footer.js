import React from "react";
import theme from "./theme";

export default () => (
  <footer className="footer">
    <p>
      Built with 💖by
      <a href="https://aranja.com" target="_blank" rel="noopener noreferrer">
        aranja
      </a>
    </p>

    <style jsx>{`
      .footer {
        font-size: 0.875rem;
        text-align: center;
        margin-bottom: 1rem;
      }

      .footer p {
        margin: 0;
      }

      .footer a {
        color: ${theme.colors.aranja};
        font-weight: 700;
        text-decoration: none;
      }
    `}</style>
  </footer>
);

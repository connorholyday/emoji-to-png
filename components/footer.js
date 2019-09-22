import React from 'react';
import theme from './theme';

export default () => (
  <footer className="footer">
    <p>
      Built with{' '}
      <img src="/static/sparkling_heart.png" width="16px" height="16px" /> by
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
        display: flex;
        align-items: center;
      }

      .footer img {
        margin: 0 0.25em;
      }

      .footer a {
        margin-left: 0.25em;
        color: ${theme.colors.aranja};
        font-weight: 700;
        text-decoration: none;
      }
    `}</style>
  </footer>
);

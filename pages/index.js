import React, { useRef, useState, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { animated, useTransition } from 'react-spring';
import EmojiConverter from '../utils/emoji2';
import theme from '../components/theme';
import Layout from '../components/layout';

const Home = () => {
  const emojiRef = useRef(new EmojiConverter());
  const [path, setPath] = useState('/unicorn.png');
  const [name, setName] = useState('Emoji to Png');
  const [id, setId] = useState('unicorn');
  const [set, setSet] = useState('apple');
  const sets = [
    'apple',
    'google',
    'twitter',
    'emojione',
    'messenger',
    'facebook',
  ];

  const handleSelect = ({ colons, name, id }) => {
    setName(name);
    setId(id);
    setPath(emojiRef.current.replace_colons(colons));
  };

  const mainImage = useTransition(path, null, {
    initial: { transform: 'rotate(1turn)' },
    from: { transform: 'rotate(0turn)' },
    enter: { transform: 'rotate(1turn)' },
    leave: { transform: 'rotate(1turn)' },
  });

  return (
    <>
      <div className="home">
        <Layout>
          <main className="main">
            <h1 className="logo">
              {mainImage.map(({ item, key, props }) => (
                <animated.img
                  key={id}
                  style={props}
                  src={`/static${path}`}
                  alt={name}
                />
              ))}
            </h1>
            <div className="container">
              <div>
                <a
                  className="download"
                  href={`/static${path}`}
                  download={`${id}.png`}
                >
                  Download {id}.png
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5l4 4 4-4M5 1v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Choose an emoji and then download it as an image
              </p>
              <Picker
                onSelect={handleSelect}
                set={set}
                title="Pick your emoji..."
                emoji="point_up"
                exclude={['recent']}
              />
            </div>
          </main>
        </Layout>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .download {
          font-size: 18px;
          font-weight: 600;
          padding: 12px 24px;
          margin-bottom: 1rem;
          color: white;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
          background: #6772e5;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .download:hover,
        .download:active,
        .download:focus {
          background: #8d96fb;
          transform: translateY(-1px);
        }
        .download svg {
          color: white;
          margin-left: 16px;
        }
        .home {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .logo {
          text-align: center;
          margin: 0 0 1.5rem;
          position: relative;
          height: 160px;
        }

        .logo img {
          vertical-align: middle;
        }

        .form {
          text-align: center;
          margin-bottom: 5rem;
        }

        .input-group {
          position: relative;
          display: flex;
          text-align: center;
          max-width: 30rem;
          height: 3.75rem;
          margin: 0 auto;
          padding: 4px;
          border-radius: 12px;
          background: linear-gradient(
            to right,
            ${theme.colors.secondary},
            ${theme.colors.primary}
          );
        }

        .input-group .input {
          flex: 1;
          border: none;
          font-size: 2rem;
          text-align: center;
          color: ${theme.colors.primary};
          padding: 0.5rem;
          background: white;
          border-radius: 10px 0 0 10px;
        }

        .input:focus {
          outline-color: ${theme.colors.primary};
        }

        .input-group .button {
          flex-shrink: 0;
          background: transparent;
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1;
          padding: 1rem;
          box-shadow: none;
          border: 0;
          cursor: pointer;
        }

        .input-group .button:focus {
          outline-color: ${theme.colors.primary};
        }

        .label {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: block;
        }
      `}</style>
    </>
  );
};

export default Home;

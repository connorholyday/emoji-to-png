import React, { useRef, useState, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { animated, useTransition } from 'react-spring';
import EmojiConverter from '../utils/emoji2';
import theme from '../components/theme';
import Layout from '../components/layout';

const Home = () => {
  const emojiRef = useRef(new EmojiConverter());
  const [path, setPath] = useState('1f3a8.png');
  const [name, setName] = useState('Emoji to Png');
  const [id, setId] = useState('art');
  const [set, setSet] = useState('apple');
  const sets = {
    apple: 'apple-160',
    google: 'google-136',
    twitter: 'twitter-72',
    facebook: 'facebook-96',
    messenger: 'messenger-128',
  };

  const handleSelect = ({ colons, name, id }) => {
    setName(name);
    setId(id);
    setPath(
      emojiRef.current
        .replace_colons(colons)
        .split('/')
        .pop()
    );
  };

  const mainImage = useTransition(path, null, {
    initial: { transform: 'rotate(1turn)' },
    from: { transform: 'rotate(0turn)' },
    enter: { transform: 'rotate(1turn)' },
    leave: { opacity: 0 },
  });

  return (
    <>
      <div className="home">
        <Layout>
          <main className="main">
            <div className="content">
              <h1 className="logo">
                {mainImage.map(({ item, key, props }) => (
                  <animated.img
                    key={key}
                    style={{
                      ...props,
                      verticalAlign: 'middle',
                      height: 'auto',
                      maxWidth: '100%',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    src={`/static/emoji-data/img-${sets[set]}/${path}`}
                    alt={name}
                  />
                ))}
              </h1>
              <div>
                <a
                  className="button download"
                  href={`/static/emoji-data/img-${sets[set]}/${path}`}
                  download={`${id}.png`}
                >
                  Download {id}.png
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </a>
              </div>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Choose an emoji and then download it as an&nbsp;image
              </p>
              <div className="buttons buttons-lg">
                {Object.keys(sets).map(key => (
                  <button
                    key={key}
                    role="button"
                    className={`set-button ${key === set && 'active'}`}
                    onClick={() => setSet(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            <div className="container">
              <Picker
                onSelect={handleSelect}
                set={set}
                title="Pick your emoji..."
                emoji="point_up"
                exclude={['recent']}
                style={{ maxWidth: '100%' }}
              />
            </div>
            <div className="buttons buttons-sm">
              {Object.keys(sets).map(key => (
                <button
                  key={key}
                  role="button"
                  className={`set-button ${key === set && 'active'}`}
                  onClick={() => setSet(key)}
                >
                  {key}
                </button>
              ))}
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
        .button {
          font-size: 18px;
          font-size: 16px;
          padding: 12px 24px;
          margin-bottom: 1rem;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
          background: #6772e5;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .button:hover,
        .button:active,
        .button:focus {
          background: #8d96fb;
          transform: translateY(-1px);
        }
        .download {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .download svg {
          color: white;
          margin-left: 16px;
        }
        .buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 16px;
        }
        .buttons-lg {
          display: none;
        }
        .set-button {
          font-size: 16px;
          text-transform: capitalize;
          background: none;
          border: none;
          margin: 8px 16px;
          cursor: pointer;
        }
        .set-button:active,
        .set-button:focus {
          outline: none;
          text-decoration: underline;
        }
        .set-button.active {
          color: #6772e5;
          font-weight: 600;
          text-decoration: none;
        }
        .home {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          padding: 0 16px;
        }

        .main {
          flex: 1;
          max-width: 100%;
          margin-bottom: 20px;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo {
          text-align: center;
          margin: 0 0 1.5rem;
          position: relative;
          height: 80px;
          width: 80px;
          position: relative;
        }

        @media (min-width: 768px) {
          .main {
            display: flex;
            align-items: center;
          }

          .content {
            margin-right: 80px;
          }
          .buttons {
            margin-top: 0;
          }
          .buttons-sm {
            display: none;
          }
          .buttons-lg {
            display: flex;
          }

          .logo {
            height: 160px;
            width: 160px;
          }

          .set-button {
            margin: 0 4px;
          }
        }
      `}</style>
    </>
  );
};

export default Home;

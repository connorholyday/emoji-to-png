import React, { useRef, useState, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import theme from '../components/theme';
import Layout from '../components/layout';

const Home = () => {
  const formRef = useRef();
  const [value, setValue] = useState('');
  const [hasJs, setHasJs] = useState(false);

  useEffect(() => void setHasJs(typeof window !== 'undefined'), []);

  return (
    <>
      <div className="home">
        <Layout>
          <main className="main">
            <h1 className="logo">
              <img src="/static/unicorn.png" alt="Emoji to Png" />
            </h1>
            {hasJs ? (
              <div>
                <p style={{ textAlign: 'center' }}>Choose an emoji to download it as an image</p>
                <Picker
                  onSelect={() => void formRef.current.submit()}
                  set="apple"
                  title="Pick your emoji..."
                  emoji="point_up"
                />
              </div>
            ) : (
              <form
                ref={formRef}
                className="form"
                autoComplete="off"
                method="POST"
                action="/emoji"
              >
                <label className="label" htmlFor="emoji">
                  Type your emoji to download a png
                </label>
                <div className="input-group">
                  <input
                    name="emoji"
                    id="emoji"
                    type="text"
                    className="input"
                    autoFocus
                    onChange={e => setValue(e.target.value)}
                    value={value}
                  />
                  <button type="submit" className="button">
                    Go!
                  </button>
                </div>
              </form>
            )}
          </main>
        </Layout>
      </div>
      <style jsx>{`
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
          margin: 0 0 2.5rem;
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

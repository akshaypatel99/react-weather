import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    color: hsl(209, 15%, 28%);
  }

  h1 {
    font-weight: 600;
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4, p {
    font-size: 1rem;
  }

  h5 {
    font-size: 0.8rem;
  }

  @media (max-width:1024px){
    h1 {
      font-size: 1.75rem;
    }
  }

  @media (max-width:768px){
    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    h4, p {
      font-size: 1rem;
    }

    h5 {
      font-size: 0.8rem;
    }
  }

  @media (max-width:500px){
    h1 {
      font-size: 1.3rem;
    }

    h2 {
      font-size: 1.1rem;
    }

    h3 {
      font-size: 1rem;
    }

    h4, p {
      font-size: 0.9rem;
    }

    h5 {
      font-size: 0.8rem;
    }
  }
`;

export default GlobalStyle;

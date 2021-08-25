import { useScrollPosition, useWindowDimensions } from '../../hooks';
import './styles.css';
import bonfireImgSrc from '../../assets/bonfire_v2.gif';

const App = () => {

  const scrollPosition = useScrollPosition();
  const { height: viewportHeight, width: viewportWidth } = useWindowDimensions();
  
  const isBonfireInView = scrollPosition >= viewportHeight * 1.75
  return (
    <div className="App">
      <header className="App-header">
        <p>scroll position: {scrollPosition} / {viewportHeight * 4}</p>
        <p>bonfire breakpoint: {viewportHeight * 1.75}</p>
        <p>width: {viewportWidth}</p>
      </header>
      <main className="App-main">
        <img
          className={
            !isBonfireInView ?
              "bonfire-gif"
              : "bonfire-gif-fixed"
          }
          src={bonfireImgSrc}
          alt=""
        />
      </main>
      
    </div>
  );
}

export default App;

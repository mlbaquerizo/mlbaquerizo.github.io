import { useScrollPosition, useWindowDimensions } from '../../hooks';
import ImageWithFadein from '../ImageWithFadein';
import './styles.css';
import bonfireImgSrc from '../../assets/bonfire_v2.gif';

const App = () => {

  const scrollPosition = useScrollPosition();
  const { height: viewportHeight, width: viewportWidth } = useWindowDimensions();

  return (
    <div className="App">
      <header className="App-header">
        <p>scroll position: {scrollPosition} / {viewportHeight * 4}</p>
        <p>bonfire breakpoint: {viewportHeight * 1.75}</p>
        <p>width: {viewportWidth} height: {viewportHeight}</p>
        <p>position when fixed: {((viewportHeight * .75) - 400)}</p>
      </header>
      <main className="App-main">
        <ImageWithFadein
          src={bonfireImgSrc}
          centerOffset={-15}
          scrollTo={250}
          imageTop={80}
        />
      </main>
      
    </div>
  );
}

export default App;

import { ImageWithFadein } from '@concarne/react-scroll-fade';
import bonfireImgSrc from '../../assets/bonfire_v2.gif';
import styles from './App.module.css';

const App = () => {

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>MATTHEW BAQUERIZO</h1>
      </header>
      <main>
        <ImageWithFadein
          src={bonfireImgSrc}
          centerOffset={-5}
          scrollTo={250}
          imageTop={80}
        />
      </main>

    </div>
  );
}

export default App;

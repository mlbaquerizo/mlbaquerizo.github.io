import { useRef } from 'react';
// import Typist from 'react-typist';
import ImageWithFadein from '../ImageWithFadein';
import { useIntersectionObserver } from '../../hooks';
import bonfireImgSrc from '../../assets/bonfire_v2.gif';
import sittingImgSrc from '../../assets/sitting.png';
import styles from './App.module.css';

const App = () => {

  const typistContainer1 = useRef(null);
  const isTypistContainer1InView = useIntersectionObserver(typistContainer1);

  console.log(isTypistContainer1InView);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>MATTHEW BAQUERIZO</h1>
      </header>
      <main>
        <div ref={typistContainer1} className={styles.typistContainer}>
          {/* <Typist
            cursor={{ show: false }}
            avgTypingDelay={100}
          >
            <p>hello.</p>
            <Typist.Delay ms={600} />
            <p>what is going on?</p>
          </Typist> */}
        </div>
        <ImageWithFadein
          src={bonfireImgSrc}
          centerOffset={-5}
          scrollTo={250}
          imageTop={80}
        />
        <ImageWithFadein
          src={sittingImgSrc}
          width={200}
          centerOffset={15}
          scrollTo={350}
          imageTop={105}
        />
      </main>

    </div>
  );
}

export default App;

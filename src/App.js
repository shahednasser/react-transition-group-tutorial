import { Alert, CloseButton, Container } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, SwitchTransition, Transition, TransitionGroup } from 'react-transition-group';
import 'animate.css';

const defaultLanguages = [
  {
    id: 1,
    name: 'Java'
  },
  {
    id: 2,
    name: 'JavaScript'
  },
  {
    id: 3,
    name: 'PHP'
  },
  {
    id: 4,
    name: 'CSS'
  },
  {
    id: 5,
    name: 'C'
  },
  {
    id: 6,
    name: 'C#'
  },
  {
    id: 7,
    name: 'HTML'
  },
  {
    id: 8,
    name: 'Kotlin'
  },
  {
    id: 9,
    name: 'TypeScript'
  },
  {
    id: 10,
    name: 'Swift'
  }
];

const randomItems = (arr, count) => arr.concat().reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1];

/** Used for Using Transitions Section */
const transitions = {
  entering: {
    display: 'block'
  },
  entered: {
    opacity: 1,
    display: 'block'
  },
  exiting: {
    opacity: 0,
    display: 'block'
  },
  exited: {
    opacity: '0',
    display: 'none'
  }
};

function App() {
  /** Start Variables for Using Transitions */
  const [transitionState, setTransitionState] = useState(false)
  /** End Variables for Using Transitions */
  /** Start Variables for Using CSS Transitions  */
  const [showCat, setShowCat] = useState(false);
  const [imageClasses, setImageClasses] = useState("d-none");
  /** End Variables for Using CSS Transitions  */
  /** Start Variables for Using Transition Groups  */
  const [languages, setLanguages] = useState(randomItems(defaultLanguages, 4));
  const [counter, setCounter] = useState(11);
  /** End Variables for Using Transition Groups  */
  /** Start Variables for Using Switch Transitions  */
  const [isDanger, setIsDanger] = useState(true);
  const [isDanger2, setIsDanger2] = useState(true);
  /** End Variables for Using Switch Transitions  */

  /** Start Helper Functions for Using CSS Transitions */
  function toggleCat () {
    setShowCat(!showCat);
  }

  function hideImage() {
    setImageClasses("d-none");
  }

  function showImage(node) {
    setImageClasses("d-block");
    node.style.opacity = 0;
  }

  function removeOpacity (node) {
    node.style.opacity = 1;
  }
  /** End Helper Functions for Using CSS Transitions */

  /** Start Helper Functions for Using Transition Groups */
  function addLanguage() {
    const newLanguages = languages.splice(0);
    const newItem = Object.assign({}, randomItems(defaultLanguages, 1)[0]);
    newItem.id = counter;
    newLanguages.push(newItem);
    setLanguages(newLanguages);
    setCounter(counter + 1);
  }

  function removeLanguage (id) {
    const newLanguages = languages.splice(0);
    const ind = newLanguages.findIndex((language) => language.id === id);
    if (ind !== -1) {
      newLanguages.splice(ind, 1);
      setLanguages(newLanguages);
    }
  }
  /** End Helper Functions for Using Transition Groups */

  return (
    <Container className="mb-5">
      <h1>React Transition Group Examples</h1>

      <div>
        <h2>Using Transitions</h2>
        <Button onClick={() => setTransitionState(!transitionState)}>{transitionState ? 'Hide' : 'Show'} Cat</Button>
        <Transition in={transitionState} timeout={300} >
          {state => (
            <img src="https://cataas.com/cat" alt="Cat" style={{
              transition: 'all .1s',
              opacity: 0,
              display: 'none',
              ...transitions[state]
            }} className="mt-2" />
          )}
        </Transition>
      </div>
      
      <div>
        <h2>Using CSS Transitions</h2>
        <Button onClick={toggleCat}>{showCat ? 'Hide' : 'Show'} Cat</Button>
        <CSSTransition in={showCat} timeout={500} classNames={{
          enterActive: 'animate__bounceIn',
          exit: 'animate__bounceOut'
        }} 
        onEnter={showImage}
        onEntered={removeOpacity}
        onExited={hideImage}
        className={`animate__animated my-4 ${imageClasses}`}>
          <img src="https://cataas.com/cat" alt="Cat" />
        </CSSTransition>
      </div>

      <div className="mt-4">
        <h2>Using Transition Groups</h2>
        <ul style={{listStyleType: 'none'}} className="ps-0 my-4">
          <TransitionGroup>
            {languages.map(({id, name}) => (
              <CSSTransition key={id} classNames={{
                enter: 'animate__animated animate__lightSpeedInLeft',
                exit: 'animate__animated animate__lightSpeedOutLeft'
              }} timeout={900}>
                <li className="p-3 border mb-3 shadow-sm rounded border-info d-flex justify-content-between">
                  <span>{name}</span>
                  <CloseButton onClick={() => removeLanguage(id)}></CloseButton>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
        <Button onClick={addLanguage}>Add</Button>
      </div>

      <div className="mt-4">
        <h2>Using Switch Transition</h2>
        <h3>Mode: out-in</h3>
        <SwitchTransition mode="out-in">
          <CSSTransition key={isDanger} classNames={{
            enter: 'animate__animated animate__flipInX',
            exit: 'animate__animated animate__flipOutX'
          }}
          timeout={500}>
            <div>
              <Alert variant={isDanger ? 'danger' : 'success'}>{isDanger ? "You're in danger" : "Danger cleared"}</Alert>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <Button onClick={() => setIsDanger(!isDanger)}>
          {isDanger ? 'Clear Danger' : 'Bring Danger'}
        </Button>
      </div>

      <div className="mt-4">
        <h2>Using Switch Transition</h2>
        <h3>Mode: in-out</h3>
        <SwitchTransition mode="in-out">
          <CSSTransition key={isDanger2} classNames={{
            enter: 'animate__animated animate__flipInX',
            exit: 'animate__animated animate__flipOutX'
          }}
          timeout={500}>
            <div>
              <Alert variant={isDanger2 ? 'danger' : 'success'}>{isDanger2 ? "You're in danger" : "Danger cleared"}</Alert>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <Button onClick={() => setIsDanger2(!isDanger2)}>
          {isDanger2 ? 'Clear Danger' : 'Bring Danger'}
        </Button>
      </div>
    </Container>
  );
}

export default App;

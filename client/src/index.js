import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { register } from './serviceWorker';


const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const render = (Component) => {
  const rootElement = document.getElementById('root');
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    rootElement
  );
};


render(App);

register();

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}

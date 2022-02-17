import React from 'react';
import Home from './pages/home';
import MyCanvas from './pages/my-canvas';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'myCanvas') {
      return <MyCanvas />;
    }

  }

  render() {
    return (
    <>
      { this.renderPage() }
    </>
    );
  }
}

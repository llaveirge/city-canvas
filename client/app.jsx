import React from 'react';
import Home from './pages/home';
import MyCanvas from './pages/my-canvas';
import NotFound from './pages/not-found';
import AppNav from './components/navbar';
import NewPin from './pages/new-pin';
import PinPage from './pages/pin-page';
import PinMap from './pages/pin-map';
import UpdatePin from './pages/update-pin';
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
    if (route.path === 'new-pin') {
      return <NewPin />;
    }
    if (route.path === 'pins') {
      const postId = route.params.get('postId');
      return <PinPage postId={ +postId } />;
    }
    if (route.path === 'pin-map') {
      const lat = route.params.get('lat');
      const lng = route.params.get('lng');
      const img = route.params.get('img');
      const pinId = route.params.get('pinId');
      return <PinMap lat={ +lat } lng={ +lng } img={ img } pinId={ pinId }/>;
    }
    if (route.path === 'update-pin') {
      const postId = route.params.get('postId');
      return <UpdatePin postId={ +postId } />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        <AppNav />
          { this.renderPage() }
      </>
    );
  }
}

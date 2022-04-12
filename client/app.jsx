import React from 'react';
import Home from './pages/home';
import MyCanvas from './pages/my-canvas';
import NotFound from './pages/not-found';
import AppNav from './components/navbar';
import NewPin from './pages/new-pin';
import PinPage from './pages/pin-page';
import PinMap from './pages/pin-map';
import UpdatePin from './pages/update-pin';
import ArtFinder from './pages/art-finder';
import SavedPins from './pages/saved-pins';
import Registration from './pages/registration';
import AppContext from './lib/app-context';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };

    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('city-canvas-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'my-canvas') {
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
    if (route.path === 'art-finder') {
      return <ArtFinder />;
    }
    if (route.path === 'my-saved-pins') {
      return <SavedPins />;
    }
    if (route.path === 'registration') {
      const form = route.params.get('form');
      return <Registration form={ form }/>;
    }

    return <NotFound />;
  }

  render() {
    const { route, user } = this.state;
    const { handleSignIn } = this;
    const contextValue = { route, user, handleSignIn };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          { route.path === 'registration' ? null : <AppNav /> }
            { this.renderPage() }
        </>
      </AppContext.Provider>

    );
  }
}

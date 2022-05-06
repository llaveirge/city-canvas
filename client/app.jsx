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
import decodeToken from './lib/decode-token';
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
    this.handleSignOut = this.handleSignOut.bind(this);

  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('city-canvas-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('city-canvas-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('city-canvas-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === 'registration') {
      const form = route.params.get('form');
      return <Registration form={ form }/>;
    }
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

    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;

    const { route, user } = this.state;
    const { handleSignIn, handleSignOut, renderPage } = this;
    const contextValue = { route, user, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          { route.path === 'registration' ? null : <AppNav /> }
            { renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}

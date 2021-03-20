import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// UI
import ScrollToTop from 'components/scroll-to-top';
import Header from 'modules/header';
// Pages
import HomePage from 'pages/home-page';
import SignInPage from 'pages/sign-in-page';
import SignUpPage from 'pages/sign-up-page';
import EventsPage from 'pages/events-page';
import TransactionsPage from 'pages/transactions-page';
import RewardsPage from 'pages/rewards-page';
import LiveEventsPage from 'pages/live-events-page';
import PlayerRankingsPage from 'pages/player-rankings-page';
import HelpPage from 'pages/help-page';
import WithdrawPage from 'pages/withdraw-page';
// Styles
import './app.sass';

export const signInContext = React.createContext();

const App = () => {
  const [isSigned, setIsSigned] = React.useState(false);
  const handleSignIn = () => setIsSigned(true);
  const handleSignOut = () => setIsSigned(false);

  return (
    <div className="app">
      <signInContext.Provider value={{ isSigned, handleSignIn, handleSignOut }}>
        <Header isSigned={isSigned} />
        <div className="app__wrap">
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/sign-in" exact component={SignInPage} />
              <Route path="/sign-up" exact component={SignUpPage} />
              <Route path="/events" exact component={EventsPage} />
              <Route path="/live-events" exact component={LiveEventsPage} />
              <Route path="/transactions" exact component={TransactionsPage} />
              <Route path="/player-rankings" exact component={PlayerRankingsPage} />
              <Route path="/help" exact component={HelpPage} />
              <Route path="/rewards" exact component={RewardsPage} />
              <Route path="/withdraw" component={WithdrawPage} />
              <Redirect to="/" />
            </Switch>
          </ScrollToTop>
        </div>
      </signInContext.Provider>
    </div>
  );
};

export default App;

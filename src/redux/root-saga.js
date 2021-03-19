import { all, call } from 'redux-saga/effects';
// Sagas
import { fetchEventsData } from 'redux/events/sagas';
import { fetchOpenBetsData } from 'redux/open-bets/sagas';
import { fetchTransactionsData } from 'redux/transactions/sagas';
import { fetchLiveEventsData } from 'redux/live-events/sagas';

function* rootSaga() {
  yield all([
    call(fetchEventsData),
    call(fetchOpenBetsData),
    call(fetchTransactionsData),
    call(fetchLiveEventsData),
  ]);
}

export default rootSaga;

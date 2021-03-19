import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Redux
import { fetchEventsRequest } from 'redux/events/actions';
import { selectEvents } from 'redux/events/selectors';
import { selectBetSlips } from 'redux/bet-slips/selectors';
import { toggleBetSlip } from 'redux/bet-slips/actions';
// UI
import PageLayout from 'components/page-layout';
import EventsFilters from 'modules/events-filters';
import Bets from 'modules/bets';
import Accordion from 'components/accordion';
import List from 'components/list';
import ErrorIndicator from 'components/error-indicator';
import Spinner from 'components/spinner';
// Styles
import './styles.sass';

const EventsPage = ({ fetchEventsRequest, events: { loading, data, error }, betSlips, toggleBetSlip }) => {
  React.useLayoutEffect(() => {
    fetchEventsRequest();
  }, [fetchEventsRequest]);

  const handleSelectBet = (eventIdx, betId) => toggleBetSlip({ eventIdx, betId });

  return (
    <PageLayout className="events-page">
      <div className="events-page__filters">
        <EventsFilters />
      </div>
      <div className="events-page__preview">
        <div className="events-page__list">
          {error && <ErrorIndicator retry={fetchEventsRequest} />}
          {(!error && loading) && <Spinner boxed />}
          {(!error && !loading && data) &&
            <Fragment>
              {data.map(({ id, title, date, time, games }, eventIdx) => (
                <Accordion expanded={eventIdx === 0} className="events-page__list-item" key={id}>
                  <Accordion.Tab title={title} date={date} time={time} />
                  <Accordion.Content>
                    <List header="Winner" items={games} handleSelect={betId => handleSelectBet(eventIdx, betId)} selected={betSlips} />
                  </Accordion.Content>
                </Accordion>
              ))}
            </Fragment>
          }
        </div>
        <div className="events-page__bets">
          <Bets />
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  events: selectEvents,
  betSlips: selectBetSlips
});

const mapDispatchToProps = {
  fetchEventsRequest,
  toggleBetSlip
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);

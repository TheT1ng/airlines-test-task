import React from "react";
import { connect } from "react-redux";

import FilterAndCurrency from "../components/FilterAndCurrency";
import SingleTicket from "../components/SingleTicket";

import {
  ticketsRequest,
  currencyChange,
  ticketsFilter
} from "../actions/asyncActions/tikcetsAsyncActions";

import logo from "../images/logo.svg";
import filterIcon from "../images/filterIcon.svg";

class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stopsArr: [false, false, false, false, false],
      currency: "RUB",
      isModalOpened: false
    };
  }

  componentDidMount() {
    const { onTicketsRequest } = this.props;
    onTicketsRequest();
  }

  onCurrencySelect = async e => {
    const symbol = e.target.innerText;
    const { onCurrencyChange, ticketsList } = this.props;
    const { currency } = this.state;
    await onCurrencyChange(currency, symbol, ticketsList);
    this.setState({
      currency: symbol
    });
  };

  onCheck = e => {
    const checkboxIndex = e.target.name;
    const { onTicketsFilter } = this.props;
    this.setState(
      prevState => ({
        stopsArr: prevState.stopsArr.map((elem, index) =>
          +checkboxIndex === index ? !elem : elem
        ),
        currency: "RUB"
      }),
      () => {
        const { stopsArr } = this.state;
        onTicketsFilter(stopsArr);
      }
    );
  };

  onOnlyClick = e => {
    const checkboxIndex = e.target.name;
    const { onTicketsFilter } = this.props;
    this.setState(
      prevState => ({
        stopsArr: prevState.stopsArr.map(
          (elem, index) => +checkboxIndex === index
        ),
        currency: "RUB"
      }),
      () => {
        const { stopsArr } = this.state;
        onTicketsFilter(stopsArr);
      }
    );
  };

  onModalToggle = () => {
    this.setState(prevState => ({
      isModalOpened: !prevState.isModalOpened
    }));
  };

  render() {
    const { isLoading, isFail, ticketsList, onTicketsRequest } = this.props;
    const { stopsArr, currency, isModalOpened } = this.state;
    return (
      <div className="container-fluid">
        <div
          className={`mobileStickyButton d-inline-block position-fixed d-md-none row ${isModalOpened &&
            "w-100 h-100 overflow-hidden backdrop-gray"}`}
        >
          {isModalOpened ? (
            <FilterAndCurrency
              onCheck={this.onCheck}
              onOnlyClick={this.onOnlyClick}
              values={stopsArr}
              currency={currency}
              onCurrencySelect={this.onCurrencySelect}
              isModalOpened
              onModalToggle={this.onModalToggle}
            />
          ) : (
            <button
              type="button"
              onClick={this.onModalToggle}
              className="btn btn-sm btn-primary shadow"
            >
              <img src={filterIcon} alt="Show filters and currency selector" />
            </button>
          )}
        </div>
        <img
          src={logo}
          alt="Website logo"
          className="d-block mx-auto mt-4 mb-3"
        />
        <div className="row justify-content-center">
          <FilterAndCurrency
            onCheck={this.onCheck}
            onOnlyClick={this.onOnlyClick}
            values={stopsArr}
            currency={currency}
            onCurrencySelect={this.onCurrencySelect}
          />
          <div className="col-xxxl-3 col-xxl-4 col-xl-6 col-lg-7 col-md-7 col-sm-12 col-12">
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <div className="spinner-border text-primary d-block mx-auto mt-5" />
            ) : isFail ? (
              <div>
                <h3 className="text-center mt-5">Something went wrong(</h3>
                <button
                  className="btn btn-primary w-50 text-uppercase d-block mx-auto"
                  type="button"
                  onClick={onTicketsRequest}
                >
                  retry
                </button>
              </div>
            ) : (
              ticketsList.map(ticket => (
                <SingleTicket
                  key={Math.random()} // Should have an id
                  price={ticket.price}
                  currency={
                    currency === "RUB" ? "₽" : currency === "USD" ? "$" : "€"
                  }
                  departureDate={new Date(ticket.departure_date)}
                  departureTime={ticket.departure_time}
                  arrivalDate={new Date(ticket.arrival_date)}
                  arrivalTime={ticket.arrival_time}
                  origin={ticket.origin}
                  originName={ticket.origin_name}
                  destination={ticket.destination}
                  destinationName={ticket.destination_name}
                  stops={ticket.stops}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ticketsReducer.isLoading,
    isFail: state.ticketsReducer.isFail,
    isSuccess: state.ticketsReducer.isSuccess,
    ticketsList: state.ticketsReducer.ticketsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTicketsRequest: () => dispatch(ticketsRequest()),
    onTicketsFilter: filteredList => dispatch(ticketsFilter(filteredList)),
    onCurrencyChange: (base, symbol, list) =>
      dispatch(currencyChange(base, symbol, list))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);

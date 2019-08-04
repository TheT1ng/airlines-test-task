import React from "react";
import taLogo from "../images/turkishAirlinesLogo.png";
import plane from "../images/plane.svg";

const SingleTicket = ({
  price,
  currency,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  origin,
  originName,
  destination,
  destinationName,
  stops
}) => (
  <div className="row justify-content-center bg-white rounded shadow mb-3 no-gutters">
    <div className="col col-lg-4 col-md-4 col-sm-4 col-11 p-3 border-right">
      <img
        src={taLogo}
        alt="Turkish airlines"
        className="img-fluid w-75 d-block mx-auto m-3"
      />
      <button
        type="button"
        className="purchaseButton w-100 rounded shadow-sm py-1"
      >
        Купить
        <br />
        {`за ${price}${currency}`}
      </button>
    </div>
    <div className="col col-lg-8 col-md-8 col-sm-8 col-11 p-3">
      <div className="row no-gutters mb-1">
        <h3 className="col-lg-3 col-md-3 col-sm-4 col-4 text-left flightTime m-0 font-weight-normal">
          {departureTime}
        </h3>
        <div className="col-lg-6 col-md-6 col-sm-4 col-4 text-center d-flex flex-column align-items-center">
          <p className="text-uppercase mb-0 text-small text-nowrap">
            {/* eslint-disable-next-line no-nested-ternary */}
            {stops !== 0 ? (
              stops % 10 > 1 ? (
                `${stops} пересадки`
              ) : (
                `${stops} пересадка`
              )
            ) : (
              <span>&nbsp;</span>
            )}
          </p>
          <div className="w-100 d-flex align-items-center">
            <div className="w-100 flightLine" />
            <img src={plane} alt="plane" aria-hidden className="h-100" />
          </div>
        </div>
        <h3 className="col-lg-3 col-md-3 col-sm-4 col-4 text-right flightTime m-0 font-weight-normal">
          {arrivalTime}
        </h3>
      </div>
      <div className="row no-gutters justify-content-between">
        <div className="col-5 text-left small">
          <strong className="mb-0">{`${origin}, ${originName}`}</strong>
          <p className="font-weight-light text-gray">{`${departureDate.getDate()} ${departureDate
            .toLocaleString("ru-RU", { month: "short" })
            .slice(
              0,
              -1
            )} ${departureDate.getFullYear()}, ${departureDate.toLocaleString(
            "ru-RU",
            { weekday: "short" }
          )}`}</p>
        </div>
        <div className="col-5 text-right small">
          <strong className="mb-0">{`${destination}, ${destinationName}`}</strong>
          <p className="font-weight-lighter text-gray">{`${arrivalDate.getDate()} ${arrivalDate
            .toLocaleString("ru-RU", { month: "short" })
            .slice(
              0,
              -1
            )} ${arrivalDate.getFullYear()}, ${arrivalDate.toLocaleString(
            "ru-RU",
            { weekday: "short" }
          )}`}</p>
        </div>
      </div>
    </div>
  </div>
);

export default SingleTicket;

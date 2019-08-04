import React from "react";

const checkboxesHash = {
  0: {
    id: "id-0",
    type: 0,
    text: "Все"
  },
  1: {
    id: "id-1",
    type: 1,
    text: "Без пересадок"
  },
  2: {
    id: "id-2",
    type: 2,
    text: "1 пересадка"
  },
  3: {
    id: "id-3",
    type: 3,
    text: "2 пересадки"
  },
  4: {
    id: "id-4",
    type: 4,
    text: "3 пересадки"
  }
};

const FilterAndCurrency = ({
  onCheck,
  values,
  currency,
  onCurrencySelect,
  onOnlyClick,
  isModalOpened,
  onModalToggle
}) => (
  <div
    className={`col-xxxl-1 col-xxl-2 col-xl-2 col-lg-3 col-md-3 bg-white rounded shadow py-3 filterAndCurrencyContainer d-md-block ${!isModalOpened &&
      "d-none"}`}
  >
    <h6 className="text-uppercase mb-3">Валюта</h6>
    <div className="row no-gutters justify-content-between currencyButtonsContainer mb-5">
      <button
        className={`col-4 text-uppercase btn-lg currencyButton ${currency ===
          "RUB" && "isSelected"}`}
        type="button"
        onClick={onCurrencySelect}
      >
        rub
      </button>
      <button
        className={`col-4 text-uppercase btn-lg currencyButton ${currency ===
          "USD" && "isSelected"}`}
        type="button"
        onClick={onCurrencySelect}
      >
        usd
      </button>
      <button
        className={`col-4 text-uppercase btn-lg currencyButton ${currency ===
          "EUR" && "isSelected"}`}
        type="button"
        onClick={onCurrencySelect}
      >
        eur
      </button>
    </div>
    <h6 className="text-uppercase mb-3">количество пересадок</h6>

    {Object.values(checkboxesHash).map((elem, index) => (
      <div
        className="row px-3 py-2 align-items-center stopsContainer"
        key={index}
      >
        <div className="col-9 p-0">
          <input
            type="checkbox"
            className="stopsCheckbox"
            id={elem.id}
            name={index}
            onChange={onCheck}
            checked={values[index]}
          />
          <label className="mb-0 text-nowrap" htmlFor={elem.id}>
            {elem.text}
          </label>
        </div>
        <div className="col-3 p-0 justify-content-end d-none">
          <button
            className="onlyButton p-0 text-uppercase font-weight-bold"
            type="button"
            onClick={onOnlyClick}
            name={index}
          >
            только
          </button>
        </div>
      </div>
    ))}
    <button
      type="button"
      className="btn btn-danger w-100 text-uppercase d-md-none"
      onClick={onModalToggle}
    >
      close
    </button>
  </div>
);

export default FilterAndCurrency;

import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 294px;
  padding: 30px 0 20px;
  border: 1px solid #e9f1ff;
  border-radius: 16px;

  background: #ffffff;
  box-shadow: 0 4px 8px rgb(0, 0, 0, 35%);
  /* stylelint-disable selector-class-pattern */
  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    background: transparent;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;

    button {
      border: none;

      font-size: 18px;
      font-weight: 600;
      color: #40b59f;

      background: none;
    }
  }

  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__month-view__weekdays {
    font-size: 13px;
    font-weight: 500;
    color: #848a94;
    text-align: center;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0;
  }

  .react-calendar__tile {
    position: relative;

    margin: 10px 0 0;
    padding: 0;
    border: none;
    border-radius: 0;

    font-size: 13px;
    font-weight: 500;

    background: none;
  }

  .react-calendar__tile:focus {
    background: none !important;
    outline: none !important;
  }

  .react-calendar__tile:focus-visible {
    background: #40b59f33 !important;
    outline: none !important;
  }

  .react-calendar__tile:hover {
    background: #40b59f33 !important;
  }

  .past-day {
    pointer-events: none;
    cursor: default;
    color: #848a94 !important;
  }

  .future-day {
    color: #002055;
  }

  .not-this-month {
    color: #848a94 !important;
  }

  .custom-drag-range,
  .react-calendar__tile--range {
    color: #002055;
    background: #40b59f33;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd,
  .single-day,
  .drag-start,
  .drag-end {
    position: relative;
    z-index: 1;
    color: white !important;
    background-color: transparent;
  }

  .react-calendar__tile--rangeStart::before,
  .drag-start::before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    left: 50%;

    width: 50%;
    height: 100%;

    background-color: #40b59f33;
  }

  .react-calendar__tile--rangeEnd::before,
  .drag-end::before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 50%;
    height: 100%;

    background-color: #40b59f33;
  }

  .react-calendar__month-view__days__day {
    height: 32px;
  }

  .react-calendar__tile--rangeStart abbr,
  .react-calendar__tile--rangeEnd abbr,
  .drag-start abbr,
  .drag-end abbr {
    display: inline-block;

    width: 32px;
    height: 32px;
    border-radius: 50%;

    line-height: 32px;
    color: white;

    background-color: #40b59f;
  }

  .single-day::before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    border-radius: 50%;

    background: none;
  }

  .single-day abbr {
    display: inline-block;

    width: 32px;
    height: 32px;
    border-radius: 50%;

    line-height: 32px;
    color: white;

    background-color: #40b59f;
  }
  /* stylelint-enable selector-class-pattern */
`;

export const TileOverlay = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: transparent;
`;

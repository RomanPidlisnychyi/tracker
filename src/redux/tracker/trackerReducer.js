import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { trackerActions } from '.';

const localState = localStorage.getItem('testTracker');

const initialState = localState ? JSON.parse(localState) : [];

const initialCurrent = Date.now();

const setTracker = (state, { payload }) => {
  const currentDate = Date.now();
  const tracker = {
    name: payload ? payload : currentDate,
    id: uuidv4(),
    start: currentDate,
    stop: null,
  };

  const newState = [tracker, ...state];

  localStorage.setItem('testTracker', JSON.stringify(newState));

  return newState;
};

const startTracker = (state, { payload: trackerId }) => {
  const newState = state.map(tracker => {
    if (tracker.id === trackerId) {
      const timeTracked = tracker.stop - tracker.start;
      tracker = { ...tracker, start: Date.now() - timeTracked, stop: null };
    }
    return tracker;
  });

  localStorage.setItem('testTracker', JSON.stringify(newState));

  return newState;
};

const stopTracker = (state, { payload: trackerId }) => {
  const newState = state.map(tracker => {
    if (tracker.id === trackerId) {
      tracker = { ...tracker, stop: Date.now() };
    }
    return tracker;
  });

  localStorage.setItem('testTracker', JSON.stringify(newState));

  return newState;
};

const removeTracker = (state, { payload: trackerId }) => {
  const newState = state.filter(tracker => tracker.id !== trackerId);

  newState.length > 0
    ? localStorage.setItem('testTracker', JSON.stringify(newState))
    : localStorage.removeItem('testTracker');

  return newState;
};

const trackers = createReducer(initialState, {
  [trackerActions.set]: setTracker,
  [trackerActions.start]: startTracker,
  [trackerActions.stop]: stopTracker,
  [trackerActions.remove]: removeTracker,
});

const currentDate = createReducer(initialCurrent, {
  [trackerActions.setCurrentDate]: (_, { payload }) => payload,
});

export default combineReducers({
  trackers,
  currentDate,
});

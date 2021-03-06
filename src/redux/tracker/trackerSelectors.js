import { createSelector } from '@reduxjs/toolkit';
import getTimeFormat from '../../common/getTimeFormat';

const getTrackers = state => state.trackers;
const getCurrentDate = state => state.currentDate;

const getCurrentFormatTimeById = createSelector(
  [getTrackers, getCurrentDate, (state, trackerId) => trackerId],
  (trackers, currentDate, trackerId) => {
    const tracker = trackers.find(tracker => tracker.id === trackerId);
    const time = tracker.stop
      ? tracker.stop - tracker.start
      : Date.now() - tracker.start;
    return getTimeFormat(time);
  }
);

const trackerSelectors = {
  getTrackers,
  getCurrentDate,
  getCurrentFormatTimeById,
};

export default trackerSelectors;

import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { format } from 'd3-format';

// get list data
const getData = state => state.data;
const getSettings = state => state.settings;
const getCurrentLocation = state => state.currentLocation;
const getColors = state => state.colors;
const getSentences = state => state.config.sentences;

// get lists selected
export const getFilteredData = createSelector(
  [getData, getCurrentLocation],
  (data, currentLocation) => {
    if (isEmpty(data)) return null;

    return data
      .filter(
        item => item.country === currentLocation.value && item.year !== 9999
      )
      .map(item => ({
        male: item.femempl
          ? (item.forempl - item.femempl) * 1000
          : item.forempl * 1000,
        female: item.femempl ? item.femempl * 1000 : null,
        year: item.year
      }));
  }
);

export const parseData = createSelector(
  [getFilteredData, getSettings, getColors],
  (data, settings, colors) => {
    if (isEmpty(data)) return [{ noContent: true }];

    const { year } = settings;
    const selectedFAO = data.filter(item => item.year === year);
    const { male, female } = selectedFAO[0];
    if (!female) return [{ noContent: true }];

    const total = male + female;
    const formatedData = [
      {
        label: 'Male',
        value: male,
        color: colors.male,
        percentage: male / total * 100
      },
      {
        label: 'Female',
        value: female,
        color: colors.female,
        percentage: female / total * 100
      }
    ];
    return formatedData;
  }
);

export const getSentence = createSelector(
  [getFilteredData, getSettings, getCurrentLocation, getSentences],
  (data, settings, currentLocation, sentences) => {
    if (!data) return null;
    const { year } = settings;
    const { initial, withFemales } = sentences;
    const selectedFAO = data.find(item => item.year === year);
    let employees = 0;
    let females = 0;
    if (selectedFAO) {
      employees = selectedFAO.female
        ? selectedFAO.male + selectedFAO.female
        : selectedFAO.male;
      females = parseInt(selectedFAO.female, 10);
    }
    const percentage = 100 * females / employees;

    const params = {
      location: `${currentLocation &&
        currentLocation &&
        currentLocation.label}'s`,
      value: `${employees ? format('.3s')(employees) : 'no'}`,
      percent: percentage >= 0.1 ? `${format('.2r')(percentage)}%` : '<0.1%',
      year
    };

    return {
      sentence: females ? withFemales : initial,
      params
    };
  }
);

export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroDelete = (id) => {
  return {
    type: "HERO_DELETE",
    payload: id,
  };
};

export const heroAdd = (newhero) => {
  return {
    type: "HERO_ADD",
    payload: newhero,
  };
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const activeFilterChanged = (filter) => {
  return {
    type: "ACTIVE_FILTER",
    payload: filter,
  };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import {
  filtersFetched,
  filtersFetchingError,
  filtersFetching,
  activeFilterChanged,
} from "../../actions";

import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  const btnsRender = (filters, filtersLoadingStatus) => {
    if (filtersLoadingStatus === "loading") {
      return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }
    return filters.map(({ name, className, label }) => {
      return (
        <button
          key={name}
          id={name}
          className={classNames("btn", className, {
            active: name === activeFilter,
          })}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {btnsRender(filters, filtersLoadingStatus)}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;

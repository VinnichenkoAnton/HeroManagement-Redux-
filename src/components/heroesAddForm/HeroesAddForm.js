import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";
import { heroAdd } from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { request } = useHttp();

  const dispatch = useDispatch();
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescription,
      element: heroElement,
    };
    request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(newHero))
      .then(dispatch(heroAdd(newHero)))
      .catch((err) => console.log(err));
    setHeroName("");
    setHeroDescription("");
    setHeroElement("");
  };

  const renderFiltersList = (arr, status) => {
    if (status === "loading") {
      return <option value="Загрузка фильтров">Загрузка фильтров</option>;
    } else if (status === "error") {
      return <option value="Ошибка загрузки">Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return arr.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === "all") return;
        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };
  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          value={heroName}
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          value={heroDescription}
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          onChange={(e) => setHeroDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          value={heroElement}
          required
          className="form-select"
          id="element"
          name="element"
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option value="">Я владею элементом...</option>
          {renderFiltersList(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;

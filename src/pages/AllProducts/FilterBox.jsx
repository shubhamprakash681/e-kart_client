import React, { useEffect, useRef, useState } from "react";
import { accentColor } from "../../assets/ui";
import MultiRangeSlider from "multi-range-slider-react";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";

import { getCategoryList, getProducts } from "../../actions/productActions";

const FilterBox = ({ setOpenFilter, currPage }) => {
  const { uiTheme, windowSize } = useSelector((state) => state.uiReducer);
  const { searchKeyword, categoryList } = useSelector(
    (state) => state.allProducts
  );
  const filterBoxRef = useRef();
  const dispatch = useDispatch();

  // filter options
  const [lowerRange, setLowerRange] = useState(0);
  const [upperRange, setUpperRange] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (filterBoxRef.current) {
        if (!filterBoxRef.current.contains(e.target)) {
          setOpenFilter(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [dispatch, setOpenFilter]);

  useEffect(() => {
    dispatch(getCategoryList());

    dispatch(
      getProducts(
        searchKeyword,
        currPage,
        Number(lowerRange),
        Number(upperRange),
        Number(minRating),
        category
      )
    );
    // console.log("dispatched");
  }, [
    dispatch,
    searchKeyword,
    currPage,
    lowerRange,
    upperRange,
    minRating,
    category,
  ]);

  return (
    <>
      <div ref={filterBoxRef} className={`filter-box ${uiTheme}`}>
        <div className="filter-header">
          {windowSize.innerWidth < 860 && (
            <span className="btn-ghost" onClick={() => setOpenFilter(false)}>
              <BsArrowLeft size={"1.5rem"} />{" "}
            </span>
          )}

          <span className="filter-hed-lab">Filter</span>
        </div>
        <div className="filter-price">
          <div className="f-label">Price</div>

          <LabelledInput
            type={"text"}
            name={"lower-range"}
            id={"lower-range"}
            label={"Lower Range"}
            value={lowerRange}
            setValue={setLowerRange}
            valueToBeCom={upperRange}
          />
          <LabelledInput
            type={"text"}
            name={"upper-range"}
            id={"upper-range"}
            label={"Upper Range"}
            value={upperRange}
            setValue={setUpperRange}
            valueToBeCom={lowerRange}
          />

          <div className="price-slider">
            <MultiRangeSlider
              onChange={(e) => {
                setLowerRange(e.minValue);
                setUpperRange(e.maxValue);
              }}
              min={0}
              thumbLeftColor={accentColor}
              thumbRightColor={accentColor}
              max={200000}
              barInnerColor={accentColor}
              ruler={false}
              minValue={lowerRange}
              maxValue={upperRange}
            />
          </div>
        </div>

        <div className="filter-cat">
          <div className="f-label">Category</div>
          <div className="f-cat-options">
            {categoryList &&
              categoryList.map((cat, index) => (
                <option
                  className={"btn-ghost cat-options"}
                  id={category === cat.value ? `selected-cat` : ``}
                  key={index}
                  value={cat.value}
                  onClick={(e) => setCategory(e.target.value)}
                >
                  {cat.label}
                </option>
              ))}
          </div>
        </div>

        <div className="filter-rating">
          <div className="f-label">Minimum Rating</div>
          <input
            type="range"
            min={0}
            max={5}
            value={minRating}
            className="slider-inp"
            onChange={(e) => setMinRating(e.target.value)}
          />
          <div className="rating-slider-lab">
            <span>0</span>
            <span>5</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBox;

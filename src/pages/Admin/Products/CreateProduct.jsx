import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbBrandProducthunt } from "react-icons/tb";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription, MdOutlineAdUnits } from "react-icons/md";
import {
  createProduct,
  getProdDetailsAdmin,
  updateProduct,
} from "../../../actions/Admin/adminProductActions";
import Loader from "../../../components/Loader/Loader";
import { getCategoryList } from "../../../actions/productActions";
import { useParams } from "react-router-dom";
import { urlToObject } from "../../../utils/cloudinary";

const CreateProduct = ({ isUpdate = false }) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  const { product } = useSelector((state) => state.adminReducer.updateProd);
  useEffect(() => {
    if (isUpdate) {
      dispatch(getProdDetailsAdmin(params.id));
    }
  }, [dispatch, isUpdate, params.id]);

  useEffect(() => {
    if (isUpdate) {
      if (product) {
        let tempImgsFiles = [];
        let tempImages = [];

        product.product.images.forEach(async (img) => {
          const imgFile = await urlToObject(img.url);
          tempImages = [...tempImages, imgFile];
          tempImgsFiles = [...tempImgsFiles, URL.createObjectURL(imgFile)];
          setImageFiles(tempImgsFiles);
          setData({ ...product.product, images: tempImages });
        });
      }
    }
  }, [product, isUpdate]);

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    productDescription: "",
    stock: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);

  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { categoryList } = useSelector((state) => state.allProducts);
  const { loading } = useSelector((state) => state.adminReducer.createProd);

  const [newCat, setNewCat] = useState(false);
  const catChangeHandler = (e) => {
    if (e.target.value === "new-cat") {
      setNewCat(true);
      setData({ ...data, category: "" });
    } else {
      setData({ ...data, category: e.target.value.toLowerCase() });
    }
  };

  const changeHandler = (e) => {
    let title = e.target.name;
    let value = e.target.value;

    if (title === "price" || title === "stock") {
      value = Number(value);
    }

    if (title === "imageFiles") {
      value = URL.createObjectURL(e.target.files[0]);
      setImageFiles([...imageFiles, value]);

      let tempList = [...data.images, e.target.files[0]];
      setData({ ...data, images: tempList });
    } else {
      setData({ ...data, [title]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isUpdate) {
      dispatch(
        updateProduct(
          data.name,
          data.price,
          data.category,
          data.productDescription,
          data.stock,
          data.images,
          params.id
        )
      );
    } else {
      dispatch(
        createProduct(
          data.name,
          data.price,
          data.category,
          data.productDescription,
          data.stock,
          data.images
        )
      );
    }
  };

  return (
    <>
      {/* {console.log(data)}
      {console.log("imageFiles: ", imageFiles)} */}
      <div className="create-prod-cont">
        {loading ? (
          <Loader />
        ) : (
          <form className="form-conatiner" onSubmit={submitHandler}>
            <span className="form-header form-header-user">
              {isUpdate ? "Update" : "Create"} Product
            </span>

            <div className={`auth-input-container`}>
              <span>
                <TbBrandProducthunt size={"1.4rem"} />
              </span>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                className={`${uiTheme}`}
                required
                placeholder={"Product Name"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <HiOutlineCurrencyRupee size={"1.4rem"} />
              </span>
              <input
                type="text"
                name="price"
                id="price"
                value={data.price}
                className={`${uiTheme}`}
                required
                placeholder={"Price"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <BiCategory size={"1.4rem"} />
              </span>

              {newCat ? (
                <input
                  type="text"
                  name="category"
                  id="category"
                  className={`${uiTheme}`}
                  required
                  placeholder={"Enter new category"}
                  onChange={catChangeHandler}
                />
              ) : (
                <select
                  required
                  name="category"
                  id="category"
                  className={uiTheme}
                  onChange={catChangeHandler}
                >
                  <option value={null}>Choose a category</option>
                  {categoryList &&
                    categoryList.map((cat, index) => (
                      <option key={index} className="temp" value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  <option value="new-cat">Enter a New Category</option>
                </select>
              )}
            </div>

            <div className={`auth-input-container`}>
              <span>
                <MdOutlineDescription size={"1.4rem"} />
              </span>
              <textarea
                name="productDescription"
                id="productDescription"
                value={data.productDescription}
                className={`${uiTheme} prod-desc`}
                required
                placeholder="Enter Product Description"
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <MdOutlineAdUnits size={"1.4rem"} />
              </span>
              <input
                type="text"
                name="stock"
                id="stock"
                value={data.stock}
                className={`${uiTheme}`}
                required
                placeholder={"Stock"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <input
                className="custom-file-input"
                placeholder="Product Images"
                type="file"
                accept="image/*"
                multiple
                name="imageFiles"
                id="imageFiles"
                title="Product Images"
                onChange={changeHandler}
              />
            </div>

            {imageFiles.length > 0 && (
              <div className={`cr-prod-images`}>
                <div>
                  {imageFiles.map((img, index) => (
                    <span key={index}>
                      <img src={img} alt="img" />
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="btn-solid form-sub-btn ">
              {isUpdate ? "Update" : "Create"} Product
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default CreateProduct;

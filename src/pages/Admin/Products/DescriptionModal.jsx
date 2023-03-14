import React, { useState } from "react";
import { MdOutlineDescription, MdOutlineTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import DescriptionPreviewCard from "./DescriptionPreviewCard";

const DescriptionModal = ({ setOpenDesModal, data, setData }) => {
  const { uiTheme } = useSelector((state) => state.uiReducer);

  const [newProdDesc, setNewProdDes] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [newProdDesImgPrev, setNewProdDesImgPrev] = useState(null);

  const newDesSubmitHandler = (e) => {
    e.preventDefault();

    if (newProdDesc.description && newProdDesc.title) {
      setData({
        ...data,
        productDescription: [
          ...data.productDescription,
          { ...newProdDesc, newProdDesImgPrev },
        ],
      });

      setNewProdDes({
        title: "",
        description: "",
        image: null,
      });
      setNewProdDesImgPrev(null);
    }
  };
  const changeHandler = (e) => {
    let title = e.target.name;
    let value = e.target.value;

    if (title === "image") {
      setNewProdDesImgPrev(URL.createObjectURL(e.target.files[0]));

      setNewProdDes({ ...newProdDesc, [title]: e.target.files[0] });
    } else {
      setNewProdDes({ ...newProdDesc, [title]: value });
    }
  };

  const descriptionSubmitHandler = (e) => {
    e.preventDefault();

    setOpenDesModal(false);
  };

  return (
    <>
      <div className="des-modal-outer">
        <div className="des-modal-main">
          <div className={`des-modal-inner ${uiTheme}`}>
            <div className="des-mod-header">
              <span></span>
              <span>Product Description</span>
              <button
                onClick={() => setOpenDesModal(false)}
                className="btn-outline"
              >
                Close
              </button>
            </div>

            <div className="des-modal-cont">
              <div className="des-modal-des-inp">
                <div className="form-conatiner" id="des-modal-inp-form">
                  <h2>Add Product Description</h2>

                  <div className={`auth-input-container`}>
                    <span>
                      <MdOutlineTitle size={"1.4rem"} />
                    </span>

                    <input
                      name="title"
                      value={newProdDesc.title}
                      onChange={changeHandler}
                      type="text"
                      required
                      placeholder="Description Title (required)"
                      className={`${uiTheme}`}
                    />
                  </div>

                  <div className={`auth-input-container`}>
                    <span>
                      <MdOutlineDescription size={"1.4rem"} />
                    </span>

                    <textarea
                      name="description"
                      id="description"
                      className={`${uiTheme} prod-desc`}
                      required
                      placeholder="Enter Product Description"
                      value={newProdDesc.description}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className={`auth-input-container`}>
                    <input
                      className="custom-file-input"
                      type="file"
                      accept="image/*"
                      name="image"
                      id="image"
                      title="Product Images"
                      onChange={changeHandler}
                    />
                  </div>

                  {newProdDesImgPrev && (
                    <div className={`cr-prod-images`}>
                      <div>
                        <span>
                          <img src={newProdDesImgPrev} alt="img" />
                        </span>
                      </div>
                    </div>
                  )}

                  <button className="btn-outline" onClick={newDesSubmitHandler}>
                    Add
                  </button>
                </div>
              </div>

              <div id="des-modal-des-preview">
                <div className="des-modal-des-preview-inner">
                  <h2>Preview </h2>

                  {data && data.productDescription.length > 0 ? (
                    <>
                      {data.productDescription.map((des, index) => (
                        <DescriptionPreviewCard
                          data={data}
                          setData={setData}
                          key={index}
                          title={des.title}
                          image={des.newProdDesImgPrev}
                          description={des.description}
                        />
                      ))}

                      <div className="des-sub-btn-cont">
                        <button
                          className="btn-solid"
                          onClick={descriptionSubmitHandler}
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="prod-des-prev-empty">
                        No Product Description
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionModal;

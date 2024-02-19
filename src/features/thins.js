import React, { useEffect, useState } from "react";
import trash from "../../Assets/Images/trashicon.png";
import edit from "../../Assets/Images/editicon.png";
import publish from "../../Assets/Images/publishicon.png";
import restore from "../../Assets/Images/restoreIcon.png";
import CustomizedDialogs from "../ConfirmationModal";
import Modal from "react-modal";
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";
import { customStyles } from "../../Misc/modalStyle";
import { useDispatch, useSelector } from "react-redux";
import EditFaqInput from "../Faqs/EditFaqInput";
import OutsideClickHandler from "react-outside-click-wrapper";
import {
  editFaqs,
  deleteFaqs,
  getFilteredFaqs,
  restoreFaqs,
  setDeleteFaqModal,
} from "../Pages/Slice/Faq/FaqsSlice";
import { getStatus } from "../../Utility/faqs";

const DropModal = ({ selectedValue, id, toggleDropModal }) => {
  const [openEditFaq, setOpenEditFaq] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(true);
  const [addFaq, setAddFaq] = useState(false);

  const dispatch = useDispatch();
  const { deleteFaqModal } = useSelector((state) => state.adminFaqs);
  console.log(deleteOpen);

  const handleSubmit = async (data) => {
    await dispatch(editFaqs({ id, data }));
    await dispatch(getFilteredFaqs({ status: getStatus(selectedValue) }));
    setAddFaq(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteFaqs(id));
    await dispatch(getFilteredFaqs({ status: getStatus(selectedValue) }));
    setDeleteOpen(false);
  };

  const handleRestore = async () => {
    await dispatch(restoreFaqs(id));
    await dispatch(getFilteredFaqs({ status: getStatus(selectedValue) }));
    setDeleteOpen(false);
  };

  const deleteModal = async () => {
    setDeleteOpen(!deleteOpen);
    dispatch(setDeleteFaqModal(id));
  };
console.log('value selected',selectedValue);
  return (
    <div>
      <div className="w-[135px]  z-30 bg-[white] 2xl:w-[180px] shadow pl-4 rounded-lg">
        {/* Drafted FAQs Delete Modal */}
        {
          <div>
            <div>
              <div
                className="flex  items-center mb-2 cursor-pointer"
                onClick={() => {
                  // toggleDropModal(null);
                  // setDeleteOpen(true);
                }}
              >
                <img className="2xl:w-[15px]" src={trash} alt="" />
                <div className="ml-4">
                  <p className="text-[7.4px] 2xl:text-[15px]">Delete</p>
                  <p className="text-[6.6px] 2xl:text-[12px] text-gray_400">
                    Delete this FAQ
                  </p>
                </div>
              </div>
              {selectedValue === "publish"  && (
                  <div
                    className="flex  items-center mb-2 cursor-pointer"
                    onClick={() => {
                      setOpenEditFaq(true);
                    }}
                  >
                    <img className="2xl:w-[15px]" src={edit} alt="" />
                    <div className="ml-4 ">
                      <p className="text-[7.4px] 2xl:text-[15px] ">Edit</p>
                      <p className="text-[6.6px]  2xl:text-[12px] text-gray_400">
                        Edit this FAQ
                      </p>
                    </div>
                  </div>
                )}
                {
                selectedValue === "drafted" && (
                  <div
                    className="flex  items-center mb-2 cursor-pointer"
                    onClick={() => {
                      setOpenEditFaq(true);
                    }}
                  >
                    <img className="2xl:w-[15px]" src={edit} alt="" />
                    <div className="ml-4 ">
                      <p className="text-[7.4px] 2xl:text-[15px] ">Edit</p>
                      <p className="text-[6.6px]  2xl:text-[12px] text-gray_400">
                        Edit this FAQ
                      </p>
                    </div>
                  </div>
                )}
              {selectedValue === "drafted" && (
                <div className="flex  items-center mb-2 cursor-pointer">
                  <img className="2xl:w-[15px]" src={publish} alt="" />
                  <div className="ml-4 ">
                    <p className="text-[7.4px] 2xl:text-[15px] ">Publish</p>
                    <p className="text-[6.6px] 2xl:text-[12px] text-gray_400">
                      Publish this FAQ
                    </p>
                  </div>
                </div>
              )}
              {selectedValue === "trash" && (
                <div className="flex  items-center mb-2 cursor-pointer">
                  <img className="2xl:w-[15px]" src={restore} alt="" />
                  <div className="ml-4 ">
                    <p className="text-[7.4px] 2xl:text-[15px] ">Restore</p>
                    <p className="text-[6.6px] 2xl:text-[12px] text-gray_400">
                      Restore this FAQ
                    </p>
                  </div>
                </div>
              )}
            </div>
            {deleteOpen && (
              // <OutsideClickHandler
              // onOutsideClick={() => setDeleteOpen(null)}>

              <CustomizedDialogs
                openModal={deleteOpen}
                onClose={() => setDeleteOpen(null)}
                onClickDecline={() => setDeleteOpen(false)}
                onClickAccept={handleDelete}
                title="Delete FAQ? "
                accept="Yes, delete"
                decline="No, keep it"
                description={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<span>Deleting this means your FAQ will be moved to trash. <br>Are you sure of this </span><span class="font-bold"></span>?`,
                    }}
                  />
                }
              />
              // </OutsideClickHandler>
            )}
            {openEditFaq && (
              <div>
                <div>
                  <Modal
                    isOpen={openEditFaq}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <div className="flex flex-col mr-4 ml-4 space-y-6 max-w-md md:space-y-0 md:flex-row justify-between">
                      <div>
                        <h2 className="text-[#101828] font-semibold text-lg">
                          Edit FAQ?
                        </h2>
                      </div>
                      <button
                        onClick={() => setOpenEditFaq(!openEditFaq)}
                        className="text-[#667085] hover:text-[red]"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>

                    <EditFaqInput
                      onSubmit={handleSubmit}
                      id={id}
                      setOpenEditFaq={setOpenEditFaq}
                      openEditFaq={openEditFaq}
                    />
                  </Modal>
                </div>
              </div>
            )}
          </div>
        }
        
      </div>
    </div>
  );
};

export default DropModal;

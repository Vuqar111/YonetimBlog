import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { AppDispatch, RootState } from '../redux/store';
import {
  categoryUpdate,
  categoryDetails,
  categoryList,
} from '../redux/slices/categorySlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CategoryUpdateModal = ({
  onCloseUpdateModal,
  isUpdateModalOpen,
  setUpdateModalOpen,
  id,
}: {
  onCloseUpdateModal: () => void;
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: (isOpen: boolean) => void;
  id: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    categoryDetails: data,
    // categoryDetailsLoading: loading,
    // categoryDetailsError: error,
  } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(categoryDetails({ id }));
  }, [dispatch, id, isUpdateModalOpen, setUpdateModalOpen]);

  const [title, setTitle] = useState<string | undefined>(
    data?.title || undefined,
  );

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategory = {
      title,
    };

    try {
      const response = await dispatch(categoryUpdate({ id, updatedCategory }));
      await dispatch(categoryList());
      setUpdateModalOpen(false);
      if (response) {
        swal('Başarılı!', 'Başarılı bir şekilde duzenlediniz!', 'success');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred',
        icon: 'error',
      });
    }
  };

  return (
    <div
      className={`${
        isUpdateModalOpen
          ? 'fixed inset-0 flex items-center justify-center z-50'
          : 'hidden'
      }`}
    >
      <div className="w-[50%] shadow bg-white p-6.5 rounded-md shadow-default">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-black ">
            Kateqoriya düzəliş et
          </h3>
          <button
            onClick={onCloseUpdateModal}
            className="cursor-pointer mt-4 p-2 font-medium bg-[#dc3545] text-white  hover:bg-opacity-80"
          >
           Bağla
          </button>
        </div>

        <div className="flex-1 gap-[30px] my-4">
          {data && (
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Kateqoriya düzəliş et
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Kateqoriya adini yazin"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className=" cursor-pointer w-full inline-flex items-center justify-center mt-4 gap-2.5 bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-8"
              >
                Kateqoriyani Düzəliş Et
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdateModal;

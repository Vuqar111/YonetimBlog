import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { AppDispatch } from '../redux/store';
import { categoryCreate, categoryList } from '../redux/slices/categorySlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CategoryCreateModal = ({
  onClose,
  isPreviewModalOpen,
  setPreviewModalOpen,
}: {
  onClose: () => void;
  isPreviewModalOpen: boolean;
  setPreviewModalOpen: (isOpen: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string | undefined>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const category = {
      title,
    };

    try {
      await dispatch(categoryCreate({ category }));
      await dispatch(categoryList());
      setPreviewModalOpen(false);
      swal('Başarılı!', 'Başarılı bir şekilde giriş yaptınız!', 'success');
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
        isPreviewModalOpen
          ? 'fixed inset-0 flex items-center justify-center z-50'
          : 'hidden'
      }`}
    >
      {/* <div className="absolute inset-0  opacity-80" onClick={onClose}></div> */}
      <div className="w-[50%] shadow bg-white p-6.5 rounded-md shadow-default">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-black ">Kateqoriya Yarat</h3>
          <button
            onClick={onClose}
            className="cursor-pointer mt-4 p-2 font-medium bg-[#dc3545] text-white  hover:bg-opacity-80"
          >
          Bağla
          </button>
        </div>

        <div className="flex-1 gap-[30px] my-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Kateqoriya yarat
              </label>
              <input
                type="text"
                required
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
              Kateqoriyani əlavə et
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreateModal;

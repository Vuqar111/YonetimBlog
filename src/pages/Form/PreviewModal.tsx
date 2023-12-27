import React from 'react';

const ProductPreviewModal = ({ product, onClose, isPreviewModalOpen }: {
  product: any;
  onClose: () => void;
  isPreviewModalOpen: boolean;
}) => {
  return (
    <div
      className={`${
        isPreviewModalOpen
          ? 'fixed inset-0 flex items-center justify-center z-50'
          : 'hidden'
      }`}
    >
      <div className="absolute inset-0  opacity-80" onClick={onClose}></div>
      <div className="w-[50%] bg-white p-6.5 rounded-md shadow-default">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-black ">Məhsul ön izlənməsi</h3>
          <button
            onClick={onClose}
            className="cursor-pointer mt-4 p-2 font-medium bg-primary text-white  hover:bg-opacity-80"
          >
           Bağla
          </button>
        </div>

        <div className="flex gap-[30px] my-4">
          <div>
            <img
              src={product.image}
              alt="Product"
              className="max-w-full rounded-[10px] max-h-[400px]"
            />
          </div>
          <div>
            <h2 className='font-bold text-[32px]'>{product.title}</h2>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.unit}</p>
            <div>{product.description}</div>

            <p>{product.unit}</p>
            {/* Display the image here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;

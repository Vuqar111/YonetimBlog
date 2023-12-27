import { useEffect, useState } from 'react';
import Select from 'react-select';

const OrderAddForm = ({
  loading,
  error,
  data,
  productOptions,
  setPrdctId,
  setQuantity,
  fullname,
  setFullName,
  phoneNumber,
  setPhoneNumber,
}: {
  data: any;
  loading: any;
  error: any;
  productOptions: any;
  setPrdctId: any;
  setQuantity: any;
  fullname: any;
  setFullName: any;
  phoneNumber: any;
  setPhoneNumber: any;
}) => {
  const [productId, setProductId] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setPrdctId(productId);
    setQuantity(qty);
  }, [productId, setQuantity, qty, setPrdctId]);

  return (
    <>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-2/4">
          <label className="mb-2.5 block text-black dark:text-white">
            Müştəri adı
          </label>
          <input
            type="text"
            value={fullname}
            required
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Müştərinin adını qeyd edin"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="w-full xl:w-2/4">
          <label className="mb-2.5 block text-black dark:text-white">
            Əlaqə nömrəsi
          </label>
          <input
          required
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Müştərinin əlaqə nömrəsi qeyd edin"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-2/4">
          <label className="mb-2.5 block text-black dark:text-white">
            Məhsul
          </label>
          <Select
            value={productOptions?.find(
              (option: any) => option.value === productId
            )}
            options={productOptions}
            onChange={(selectedOption) => setProductId(selectedOption.value)}
            isSearchable
            placeholder={
              loading
                ? 'Gözləyin...'
                : error
                ? error
                : 'Məhsulun adını qeyd edin'
            }
          />
        </div>
        <div className="w-full xl:w-2/4">
          <label className="mb-2.5 block text-black dark:text-white">Say</label>
          <input
            type="number"
            value={qty}
            required
            onChange={(e) => setQty(parseInt(e.target.value))}
            placeholder="Məhsulun adını qeyd edin"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
    </>
  );
};

export default OrderAddForm;

import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { adminOrderCreate } from '../../redux/slices/orderSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { productList } from '../../redux/slices/productSlice';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import OrderAddForm from '../../components/OrderAddForm';

const OrderCreate = () => {
  const [productId, setProductId] = useState<string | undefined>('');
  const [qty, setQty] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number>(1);

  const toPrice = (num: number) => Number(num.toFixed(2));
  const totalPrice = toPrice(qty * 1);

  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery, setSearchQuery] = useState('test');

  useEffect(() => {
    dispatch(productList({searchQuery}));
  }, [dispatch]);

  const productOptions = data?.map((product: any) => ({
    value: `${product?._id}`,
    label: `${product?.title} - ${product?.category} - ${product?.unit}`,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productDetails = data?.find(
      (product: any) => product._id === productId
    );
    const product = { ...productDetails, qty };
    const order = {
      orderItems: {
        product,
      },
      totalPrice,
      customer: {
        name,
        phoneNumber,
      },
    };
    try {
      await dispatch(adminOrderCreate({ order }));
      swal('Başarılı!', 'Başarılı bir şekilde giriş yaptınız!', 'success').then(
        () => {
          window.location.replace('/orders');
        }
      );
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Sifariş Əlavə Et" />
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sifariş əlavə et
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <OrderAddForm
                  data={data}
                  loading={loading}
                  error={error}
                  setPrdctId={setProductId}
                  setQuantity={setQty}
                  productOptions={productOptions}
                  fullname={name}
                  setFullName={setName}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Sifarişi əlavə et - {totalPrice ? totalPrice : ''}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCreate;

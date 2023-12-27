import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderDetails } from '../../redux/slices/orderSlice';
import { AppDispatch, RootState } from '../../redux/store';
import OrderDetailsTitle from '../../components/OrderDetailsTitle';
import OrderedProducts from '../../components/OrderedProducts';
import CustomerDetails from '../../components/CustomerDetails';
import Loader from '../../common/Loader';
const OrderDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = window.location.pathname.split('/')[2];

  const {
    orderDetails: order,
    orderDetailsLoading: loading,
    orderDetailsError: error,
  } = useSelector((state: RootState) => state.order);


  useEffect(() => {
    dispatch(orderDetails({ id }));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <h1>{error}</h1>;
  }


  return (
    <div>
      <OrderDetailsTitle id={order?._id} status={order?.status} />
      <div className="grid grid-cols-6 mt-8 gap-4">
        <OrderedProducts orderedItems={order?.orderItems} totalPrice={order?.totalPrice}/>
        <CustomerDetails customer={order?.customer} />
      </div>
    </div>
  );
};

export default OrderDetails;

import OrderListTable from '../../components/OrderListTable';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import { orderList } from '../../redux/slices/orderSlice';
import { AppDispatch } from '../../redux/store';
const OrderList = () => {

  const dispatch: AppDispatch = useDispatch();

  const {loading, error, data} = useSelector((state: any) => state.order);

  useEffect(() => {
    dispatch(orderList());
  }, [dispatch]);

  if(loading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div>{error}</div>
  }
  return (
    <div>
        <OrderListTable data={data}/>
    </div>
  )
}

export default OrderList
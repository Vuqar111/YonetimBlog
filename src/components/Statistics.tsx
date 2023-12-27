import Box from './Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminStatistics } from '../redux/slices/statisticsSlice';
import { AppDispatch, RootState } from '../redux/store';
const Statistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.statistics
  );
  useEffect(() => {
    dispatch(adminStatistics());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <Box title="Total users" count={data?.totalProduct} />
      <Box title="Total blogs" count={data?.totalCategories} />
    </div>
  );
};

export default Statistics;

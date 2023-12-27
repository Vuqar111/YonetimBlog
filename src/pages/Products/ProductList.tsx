import ProductListTable from '../../components/ProductListTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { productList } from '../../redux/slices/productSlice';
import { AppDispatch } from '../../redux/store';
const ProductList = () => {
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useSelector((state: any) => state.products);

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    dispatch(productList({ searchQuery }));
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <ProductListTable
        data={data}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default ProductList;

import UserListTable from '../../components/UserListTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listUsers } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/store';
const ProductList = () => {
  const dispatch: AppDispatch = useDispatch();

  const { listUsersLoading, listUsersError, listUsersData } = useSelector((state: any) => state.users);

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  if (listUsersLoading) {
    return <div>Loading...</div>;
  }
  if (listUsersError) {
    return <div>{listUsersError}</div>;
  }
  return (
    <div>
      <UserListTable
        data={listUsersData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default ProductList;

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { listUsers } from '../redux/slices/userSlice';
import { productDelete } from '../redux/slices/productSlice';
interface User {
  id: number;
  name: string;
  surname: string;
  email: string,
  position: string,
}

interface Props {
  data: User[];
  searchQuery: string;
  setSearchQuery: any;
  handleInputChange: any;
}

const UserListTable: React.FC<Props> = ({
  data,
  searchQuery,
  setSearchQuery,
  handleInputChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(productDelete({ id }));
        await dispatch(listUsers());

        
        Swal.fire({
          title: 'User Deleted',
          text: 'User has been deleted successfully',
          icon: 'success',
          timer: 3000,
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred',
          icon: 'error',
        });
      }
    }
  };



  

  return (
    <>
      <div className="grid grid-cols-4 mb-4">
      <div className="col-span-4 w-[100%] my-2">
          <div></div>
          {/* <div className='w-[100%]'>
            <Link
              to="/blog-create"
              className="inline-flex w-[100%] items-center justify-center  bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             Create user
            </Link>
          </div>   */}
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All users ({data?.length})
          </h4>
        </div>

        <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">User name</p>
          </div>
          <div className="col-span-2 items-center sm:flex">
            <p className="font-medium">User surname</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">User email</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">User position</p>
          </div>
         
        </div>
        {data?.map((product, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    
                    {product?.name}

                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product?.surname}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-meta-3">{product?.email}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">{product?.position}</p>
              </div>
              
              <div className="col-span-1 flex items-center space-x-3.5">
   
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserListTable;

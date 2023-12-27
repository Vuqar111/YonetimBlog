import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Editor from '../Form/Editor';
import ImageUpload from '../Form/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { productUpdate, productDetails } from '../../redux/slices/productSlice';
import { categoryList } from '../../redux/slices/categorySlice';
import { AppDispatch, RootState } from '../../redux/store';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
const ProductEdit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = window.location.pathname.split('/')[2];

  const { data: categoryListData } = useSelector(
    (state: RootState) => state.category
  );

  const {
    productDetails: data,
    productDetailsLoading: loading,
    productDetailsError: error,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(productDetails({ id }));
    dispatch(categoryList());
  }, [dispatch, id]);

  const [name, setName] = useState<string | undefined>(
    data?.name || undefined
  );
  const [subtitle, setSubtitle] = useState<string | undefined>(
    data?.subtitle || undefined
  );

  const [price, setPrice] = useState<string | undefined>(
    data?.price || undefined
  );

  const [category, setCategory] = useState<string | undefined>(
    data?.category || undefined
  );

  const [unit, setUnit] = useState<string | undefined>(data?.unit || undefined);

  const [image, setImage] = useState<string>(data?.image || undefined);

  const [description, setDescription] = useState<string>(
    data?.description || undefined
  );

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setCategory(data.category || '');
      setSubtitle(data.subtitle || '');
      setImage(data.image || '');
      setDescription(data.description || '');
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      subtitle,
      category,
      image,
      description,
    };

    try {
      const response = await dispatch(productUpdate({ id, updatedProduct }));
      if (response) {
        swal(
          'Başarılı!',
          'Başarılı bir şekilde giriş yaptınız!',
          'success'
        ).then(() => {
          window.location.replace('/blogs');
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred',
        icon: 'error',
      });
    }
  };

  

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  


  return (
    <div>
      <Breadcrumb pageName="Məhsul Redakte Et" />
      <div>
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Məhsul haqqında məlumat
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Blog name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Write your blog name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>


                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Blog subtitle
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Write your subtitle"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                

                <Editor
                  description={description}
                  setDescription={setDescription}
                />
             
              </div>
              <div>
                <div>
                  <div className="border-b border-stroke py-4 px-6.5  dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Blog image
                    </h3>
                  </div>
                  <ImageUpload image={image} setImage={setImage} setLoadingUpload={setLoadingUpload} setErrorUpload={setErrorUpload}  loadingUpload={loadingUpload} errorUpload={errorUpload}/>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                 Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;

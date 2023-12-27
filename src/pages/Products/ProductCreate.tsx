import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Editor from '../Form/Editor';
import ImageUpload from '../Form/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { productCreate } from '../../redux/slices/productSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
const ProductCreate = () => {
  const [name, setName] = useState<string | undefined>('');
  const [subtitle, setSubtitle] = useState<string | undefined>('');
  const [category, setCategory] = useState<string | undefined>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);

  const product = {
    id: Math.random() * 1000000000000000000,
    name,
    subtitle,
    category,
    description,
    image,
  };
  const dispatch = useDispatch<AppDispatch>();

  const { productCreateSuccess: success, productCreateError: createError } =
    useSelector((state: RootState) => state.products);



 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(productCreate({ product }));
      swal('Başarılı!', 'Blog created!', 'success').then(() => {
        window.location.replace('/blogs');
      });
      // if(success) {
      //   swal('Başarılı!', 'Məhsul əlavə edildi!', 'success').then(
      //     () => {
      //       window.location.replace('/products');
      //     },
      //   );
      // }
      if (createError) {
        Swal.fire({
          title: 'Error',
          text: 'Pleasse try again later!',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Please try again later!',
        icon: 'error',
      });
    }
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);


  return (
    <div>
      <Breadcrumb pageName="Blog create" />
      <div>
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Blog information
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
                      required
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
                      required
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Write subtitle"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <input
                      type="text"
                      value={category}
                      required
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Write category"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
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
                  <ImageUpload
                    image={image}
                    setImage={setImage}
                    loadingUpload={loadingUpload}
                    setLoadingUpload={setLoadingUpload}
                    errorUpload={errorUpload}
                    setErrorUpload={setErrorUpload}
                  />
                </div>

                <button
                  disabled={loadingUpload}
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                 Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;

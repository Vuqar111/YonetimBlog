import { ChangeEvent } from 'react';
import axios from 'axios';

const ImageUpload = ({
  image,
  setImage,
  setLoadingUpload,
  setErrorUpload,
  loadingUpload,
  errorUpload,
}: {
  image: string;
  setImage: (image: string) => void;
  setLoadingUpload: (loading: boolean) => void;
  setErrorUpload: (error: boolean) => void;
  loadingUpload: boolean;
  errorUpload: boolean;
}) => {
  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post(
          'https://kabelmarket-backend.vercel.app/api/uploads',
          bodyFormData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }

        );
        setImage(data?.url);
        setLoadingUpload(false);
      } catch (error: any) {
        setErrorUpload(error);
        setLoadingUpload(false);
      }
    }
  };

  return (
    <div className="p-6.5">
      <div
        id="FileUpload"
        className="relative my-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          onChange={uploadFileHandler}
        />
        {loadingUpload ? (
          <div className='text-center'>Şəkil yüklənir...</div>
        ) : errorUpload ? (
          <div>Error...</div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            {image ? (
              <img
                src={image}
                alt="Selected"
                className="max-w-full h-auto max-h-40 rounded-[10px]"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark-bg-boxdark">
                {/* Your upload icon */}
              </span>
            )}
            <p>
              <span className="text-primary">Yükləmək üçün toxun</span> və ya
              sürüklə
            </p>
            <p className="mt-1.5">PNG, JPG</p>
            <p>(max, 800 X 800px)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

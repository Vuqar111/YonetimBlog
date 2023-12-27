import { useState } from 'react';
import Category from '../../components/Category';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../redux/slices/categorySlice';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';
import CategoryCreateModal from '../../components/CategoryCreateModal';

const ProductCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);

  const openPreviewModal = () => {
    setPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  };

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <div>
          <div
            onClick={openPreviewModal}
            className="inline-flex items-center justify-center cursor-pointer gap-2.5 bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Yeni Kateqoriya Əlavə Et
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data?.map((category: any, i: number) => {
          return <Category category={category} key={i} />;
        })}
      </div>
      <CategoryCreateModal
        onClose={closePreviewModal}
        isPreviewModalOpen={isPreviewModalOpen}
        setPreviewModalOpen={setPreviewModalOpen}
      />
    </>
  );
};

export default ProductCategories;

import CartItem from './CartItem';

const OrderedProducts = ({ orderedItems, totalPrice }: { orderedItems: any, totalPrice: number }) => {
  return (
    <div className="col-span-full lg:col-span-4  flex-col items-center">
      <h2 className="font-bold">Sifariş detalları ({orderedItems?.length})</h2>
      <div className="mt-4">
        {orderedItems?.map((item: any) => {
          return <CartItem item={item} />;
        })}
      </div>
      <div className="flex items-end justify-end mt-4">
        <h2 className="font-bold text-[24px]">Ümumi: {totalPrice} AZN</h2>
      </div>
    </div>
  );
};

export default OrderedProducts;

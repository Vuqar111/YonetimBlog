

const CartItem = ({item}: any) => {
  return (
    <div className="flex justify-between mt-2">
      <div className="flex gap-6 mt-2">
        <div className="max-w-[60px] max-h-[60px] cursor-pointer">
          <img
            src={item?.image}
            className="w-[100%] h-[100%] object-contain"
            alt="productImage"
          />
        </div>
        <div>
        <h2 className="font-bold">{item?.title}</h2>
        <p>Kateqoriya: {item?.category}</p>
        </div>
       
      </div>
      <div className='flex gap-6'>
        <span>x{item?.qty}</span>
        <span className='font-bold'>{item?.price * item?.qty}</span>
      </div>
    </div>
  );
};

export default CartItem;


const OrderDetailsTitle = ({id, status}:{id:string, status: string}) => {

  return (
    <div className='flex justify-between items-center'>
        <h2 className='font-bold text-[28px]'>Sifariş #{id?.slice(0,8)}</h2>
        <button className='shadow outline-none px-4 py-2 cursor-pointer rounded-[5px] font-bold'>{status}</button>
    </div>
  )
}

export default OrderDetailsTitle
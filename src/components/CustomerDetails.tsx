import {AiOutlinePhone} from 'react-icons/ai';
const CustomerDetails = ({customer}: {customer: any}) => {
  return (
    <div className="col-span-full lg:col-span-2 flex flex-col p-4 bg-[#fff] rounded-[5px]">
      <h2 className="text-[24px] font-bold ">Müştəri məlumatları</h2>
      <div className="pt-4 flex mt-4">
        <div className="max-w-[60px] max-h-[60px] shadow rounded-[50%] ">
          <img
            className="w-full h-full rounded-[50%]"
            src="https://www.kolivan.az/static/media/asim.c7e99c681f07ea508b48.jpg"
            alt=""
          />
        </div>
        <div className="pl-2">
          <h2 className="text-[#000] font-bold">Müştəri adı</h2>
          <p>{customer?.name}</p>
        </div>
      </div>
      <div className="pt-4 flex mt-4">
        <div className="max-w-[60px] max-h-[60px] bg-white shadow p-4 rounded-[50%]">
          <AiOutlinePhone  className='text-[30px]'/>
        </div>
        <div className="pl-2">
          <h2 className="text-[#000] font-bold">Əlaqə nömrəsi</h2>
          <p>{customer?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;

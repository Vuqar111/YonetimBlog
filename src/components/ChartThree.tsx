import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AppDispatch, RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { categoryList } from '../redux/slices/categorySlice';
interface ChartThreeState {
  series: number[];
}
const ChartThree: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  const labelsData = [];
  const productSeries: number[] = [];

  for (let i = 0; i < data?.length; i++) {
    labelsData.push(data[i].title);
    productSeries.push(data[i].productCount);
  }

  const [state, setState] = useState<ChartThreeState>({
    series: [2,5,2,5,8,3],
  });




  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B','#259AE6', '#FFA70B'],
    labels: labelsData,
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark-text-white">
           Məhsul Analizi
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            labels={labelsData}
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;

import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import College from '../components/College';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { getCollegeList } from '../actions/collegeActions';
import Search from '../components/Search';

const CollegeListScreen = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const pagenumber = searchParams.get('pagenumber') || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const collegeList = useSelector((state) => state.collegeList);
  const { colleges, loading, error, pages, page } = collegeList;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(keyword, pagenumber);
    dispatch(getCollegeList(keyword, pagenumber));
  }, [keyword, pagenumber, dispatch]);

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Colleges
      </div>
      {error && <Alert>{error}</Alert>}

      {userInfo.userType === 'admin' && (
        <div className='flex justify-around mb-6 text-2xl'>
          <Link
            to={`/colleges/create`}
            className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
          >
            Create
          </Link>
        </div>
      )}

      {keyword && <Link to='/colleges'>Back</Link>}

      <Search url='/colleges' />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {colleges.length ? (
            <div className='px-10 pb-10 lg:px-40'>
              <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
                {colleges.map((college) => (
                  <College data={college} key={college._id} />
                ))}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center w-full h-40 text-lg '>
              <div>We have no colleges for you as of now!!!</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollegeListScreen;

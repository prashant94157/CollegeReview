import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import User from '../../components/User';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import { getUserList } from '../../actions/userActions';
import Search from '../../components/Search';

const UserListScreen = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);

  const keyword = searchParams.get('keyword') || '';
  const userLogin = useSelector((state) => state.userLogin);
  const userList = useSelector((state) => state.userList);

  const { userInfo } = userLogin;
  const { error, loading, pages, users, keyword: searchWord } = userList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchWord !== keyword) setPageNumber(1);

    if (pageNumber <= pages) dispatch(getUserList(keyword, pageNumber));
  }, [keyword, pageNumber, dispatch]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 >=
      document.documentElement.scrollHeight
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => handleInfiniteScroll());

    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Users
      </div>
      {error && <Alert>{error}</Alert>}

      {keyword && <Link to='/users'>Back</Link>}

      <Search url='/users' placeholder='Search user...' />

      {users.length ? (
        <div className='px-10 pb-10 lg:px-40'>
          <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
            {users.map((user) => (
              <User key={user._id} data={user} />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center w-full h-40 text-lg '>
          <div>No users found</div>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default UserListScreen;

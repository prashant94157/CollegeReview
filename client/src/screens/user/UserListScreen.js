import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import User from '../../components/User';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import { getUserList } from '../../actions/userActions';
import Search from '../../components/Search';

const UserListScreen = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const pagenumber = searchParams.get('pagenumber') || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const userList = useSelector((state) => state.userList);

  const { userInfo } = userLogin;
  const { error, loading, success, pages, page, users } = userList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Users
      </div>

      {keyword && <Link to='/colleges'>Back</Link>}

      <Search url='/users' placeholder='Search user...' />

      {error && <Alert>{error}</Alert>}

      {loading ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default UserListScreen;

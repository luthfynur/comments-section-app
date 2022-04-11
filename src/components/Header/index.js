import Button from '../Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header({ user, setUser }) {
  const navigate = useNavigate();
  const logout = async () => {
    await axios
      .post(
        'https://lnwics-api.herokuapp.com/api/user/logout',
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser({ currentUser: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <div className={`flex flex-row justify-end w-full pb-6 h-fit`}>
      <h1 className="font-rubik text-[7vw] sm:text-[2vw] pr-2 font-light">
        {user?.currentUser?.username}
      </h1>
      {user?.currentUser ? (
        <Button text="LOGOUT" onClick={() => logout()} />
      ) : (
        <Button text="LOGIN" onClick={() => login()} />
      )}
    </div>
  );
}

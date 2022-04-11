import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setErrors(null);
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    await axios
      .post(
        'https://lnwics-api.herokuapp.com/api/user/login',
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then(async () => {
        setLoading(true);
        await axios
          .get('https://lnwics-api.herokuapp.com/api/user/current-user', {
            withCredentials: true,
          })
          .then((response) => {
            setLoading(true);
            setUser(response.data);
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
        setErrors(err.response.data);
      });
  };
  return (
    <div
      className={`bg-lightGray flex w-full items-center justify-center pl-4 pr-4 pt-8 pb-8 h-screen`}
    >
      <div
        className={`${
          loading ? 'animate-pulse' : ''
        } flex items-center flex-col rounded-xl bg-white w-[80vw] sm:w-[30vw] h-fit pb-8`}
      >
        <h1 className="text-moderateBlue font-rubik text-center text-[7vw] sm:text-[2vw] p-4">
          Interactive Comments
        </h1>
        <form
          className="h-fit flex flex-col items-center gap-3 w-full  pl-9 pr-9 "
          onSubmit={login}
        >
          <Input
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            type="submit"
            text="LOGIN"
            position="self-end"
            disabled={loading}
          />
          <p className="font-rubik text-center">
            Don't have an account?{' '}
            <span>
              <a className="text-moderateBlue underline" href="/signup">
                Create Account
              </a>
            </span>
          </p>
          {errors ? (
            <div className="bg-softRed text-black rounded-lg p-2 text-center w-full ">
              {errors?.error?.message}
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
}

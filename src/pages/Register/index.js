import axios from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';

export default function Register() {
  const [errors, setErrors] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [passwordsMatch, setPasswordMatch] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    await axios
      .post(
        'https://lnwics-api.herokuapp.com/api/user/register',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(async () => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        setErrors(err.response.data);
      });
  };

  const handlePassword = (e) => {
    setErrors(null);
    if (e.target.value !== cpassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setErrors(null);
    if (e.target.value !== password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    setCPassword(e.target.value);
  };

  useEffect(() => {
    setLoading(false);
    setErrors(null);
    setPasswordMatch(false);
  }, []);

  return (
    <div
      className={`bg-lightGray flex w-full items-center justify-center pl-4 pr-4 pt-8 pb-8 h-screen`}
    >
      <div
        className={`flex items-center flex-col rounded-xl bg-white w-[80vw] sm:w-[30vw] h-fit pb-8 ${
          loading ? 'animate-pulse' : ''
        }`}
      >
        <h1 className="text-moderateBlue font-rubik text-center text-[7vw] sm:text-[2vw] p-4">
          Sign Up
        </h1>
        <form
          className="h-fit flex flex-col items-center gap-3 w-full  pl-9 pr-9 "
          onSubmit={register}
        >
          <Input
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors(null);
            }}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => {
              handlePassword(e);
            }}
            type="password"
          />

          <Input
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={(e) => handleConfirmPassword(e)}
            error={passwordsMatch}
            type="password"
          />
          <Button
            type="submit"
            text="SIGN UP"
            position="self-end"
            disabled={passwordsMatch || loading}
          />
          {success ? (
            <div className="bg-moderateBlue text-white rounded-lg p-2 text-center w-full ">
              <p>
                Success,{' '}
                <span>
                  <a
                    className="bg-white text-black rounded-md p-[3px]"
                    href="/login"
                  >
                    Login
                  </a>
                </span>
              </p>
            </div>
          ) : (
            ''
          )}
          {passwordsMatch ? (
            <div className="bg-softRed text-black rounded-lg p-2 text-center w-full ">
              Password didn't match
            </div>
          ) : (
            ''
          )}
          {errors
            ? errors?.errors?.map((err) => {
                return (
                  <div className="bg-softRed text-black rounded-lg p-2 text-center w-full ">
                    {err.message}
                  </div>
                );
              })
            : ''}
        </form>
      </div>
    </div>
  );
}

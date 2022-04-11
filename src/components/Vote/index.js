import upVoteIcon from '../../assets/Images/icon-plus.svg';
import downVoteIcon from '../../assets/Images/icon-minus.svg';
import axios from 'axios';
import { useState } from 'react';

export default function Vote({ data, update, setUpdate, visibility, user }) {
  const [loading, setLoading] = useState(false);
  const upVote = async () => {
    setLoading(true);
    await axios
      .put(
        `https://lnwics-api.herokuapp.com/api/comments/${data._id}/upvote`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUpdate(update + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const downVote = async () => {
    setLoading(true);
    await axios
      .put(
        `https://lnwics-api.herokuapp.com/api/comments/${data._id}/downvote`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setLoading(false);
        setUpdate(update + 1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div
      className={`${visibility} ${
        loading ? 'animate-pulse' : ''
      } sm:mt-4 w-fit h-fit sm:h-[140px] flex pt-1 pl-4 pr-3 pb-1 flex-row gap-5 sm:pt-2 mt-1 sm:flex-col rounded-lg bg-lightGray text-moderateBlue font-rubik font-medium text-[20px]`}
    >
      <div className="w-[20px] h-[20px] pt-2" onClick={() => upVote()}>
        <img
          className={`h-[11px] mt-auto mb-auto ${
            user.currentUser !== null ? 'block' : 'hidden'
          }`}
          src={upVoteIcon}
          alt="plus"
        />
      </div>

      <p className="sm:mb-5 sm:mt-7">
        {data?.upVote.length - data?.downVote.length}
      </p>
      <div className="w-[20px] h-[20px] pt-3" onClick={() => downVote()}>
        <img
          className={`h-[3px] mt-auto mb-auto ${
            user.currentUser !== null ? 'block' : 'hidden'
          }`}
          src={downVoteIcon}
          alt="minus"
        />
      </div>
    </div>
  );
}

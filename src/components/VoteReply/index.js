import upVoteIcon from '../../assets/Images/icon-plus.svg';
import downVoteIcon from '../../assets/Images/icon-minus.svg';
import axios from 'axios';
import { useState } from 'react';

export default function VoteReply({
  data,
  update,
  setUpdate,
  visibility,
  user,
  replyData,
}) {
  const [loading, setLoading] = useState(false);
  const upVote = async () => {
    setLoading(true);
    await axios
      .put(
        `https://lnwics-api.herokuapp.com/api/comments/${data._id}/replies/${replyData._id}/upvote`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUpdate(update + 1);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const downVote = async () => {
    setLoading(true);
    await axios
      .put(
        `https://lnwics-api.herokuapp.com/api/comments/${data._id}/replies/${replyData._id}/downvote`,
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
      } sm:mt-4 w-fit h-fit flex flex-row gap-0  mt-1 sm:flex-col rounded-lg bg-lightGray text-moderateBlue font-rubik font-medium text-[20px]`}
    >
      <div
        className={`w-[30px] h-[30px] p-2 rounded-t-lg rounded-b-lg hover:bg-black/20 mt-auto mb-auto  ${
          user.currentUser !== null ? 'block' : 'hidden'
        }`}
        onClick={() => upVote()}
      >
        <img
          className={`h-fit w-fit sm:ml-[1px]`}
          src={upVoteIcon}
          alt="plus"
        />
      </div>

      <p className="pr-2 pl-2">
        {replyData?.upVote.length - replyData?.downVote.length}
      </p>
      <div
        className={`w-[30px] h-[30px] pt-3 pl-2 rounded-t-lg rounded-b-lg hover:bg-black/20 mt-auto mb-auto ${
          user.currentUser !== null ? 'block' : 'hidden'
        }`}
        onClick={() => downVote()}
      >
        <img
          className={`h-fit w-fit sm:ml-[1px]`}
          src={downVoteIcon}
          alt="minus"
        />
      </div>
    </div>
  );
}

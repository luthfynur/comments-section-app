import userImage from '../../assets/Images/image-maxblagun.png';
import moment from 'moment';
import deleteIcon from '../../assets/Images/icon-delete.svg';
import editIcon from '../../assets/Images/icon-edit.svg';
import axios from 'axios';
import { useState } from 'react';
import Button from '../Button';
import Vote from '../Vote';
import replyIcon from '../../assets/Images/icon-reply.svg';
import Reply from '../Reply';
import AddReply from '../AddReply';

export default function Comment({
  data,
  user,
  update,
  setUpdate,
  setDeleteModal,
  setDeleteId,
  setDeleteReplyModal,
  setDeleteReplyId,
  setCommentId,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(data.comments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isReply, setIsReply] = useState(false);
  const [repliedUser, setRepliedUser] = useState('');

  const postEdit = async () => {
    setLoading(true);
    await axios
      .put(
        `https://lnwics-api.herokuapp.com/api/comments/${data._id}`,
        {
          comments: edit,
        },
        { withCredentials: true }
      )
      .then(() => {
        setLoading(false);
        setUpdate(update + 1);
        setIsEdit(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.response);
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex flex-row h-fit w-full rounded-md p-2 bg-white mb-0">
        <div className="flex w-fit h-fit sm:pl-4 sm:mr-2">
          <Vote
            data={data}
            update={update}
            setUpdate={setUpdate}
            visibility="sm:block hidden"
            user={user}
          />
        </div>
        <div
          key={data._id}
          className="flex-col bg-white w-full h-fit p-4 rounded-md mb-5"
        >
          {/* Head */}
          <div className="flex w-full h-fit">
            <div className="flex flex-row w-full h-fit">
              <img alt="user" src={userImage} className="h-[30px]" />
              <h1 className="font-rubik text-black font-medium pl-3  pr-2 text-[16px] mt-auto mb-auto">
                {data.userId.username}
              </h1>
              {user?.currentUser?.username === data.userId.username && (
                <div className="bg-moderateBlue text-white pr-1 pl-1 rounded-sm mt-1 h-fit w-fit font-rubik text-[15px]">
                  you
                </div>
              )}
              <h1 className="font-rubik text-grayishBlue font-normal pl-2 pr-4 text-[16px] mt-auto mb-auto">
                {moment(data.date).fromNow()}
              </h1>
            </div>
            {user?.currentUser?.id !== data.userId._id &&
              user.currentUser !== null && (
                <div className="hidden w-full h-fit justify-end sm:flex">
                  <button
                    className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                    onClick={() => {
                      setIsReply(!isReply);
                      setRepliedUser(data.userId.username);
                    }}
                  >
                    <span className="pt-1 pr-2">
                      <img src={replyIcon} alt="reply icon" />
                    </span>
                    Reply
                  </button>
                </div>
              )}
            {user?.currentUser?.id === data.userId._id && (
              <div className="hidden w-full h-fit justify-end mt-0 sm:flex">
                <button
                  className="flex flex-row bg-transparent pl-1 pr-1 hover:opacity-50 font-medium h-fit w-fit text-rubik text-softRed"
                  onClick={() => {
                    setDeleteModal(true);
                    setDeleteId(data._id);
                  }}
                >
                  <span className="pt-1 pr-2">
                    <img src={deleteIcon} alt="delete icon" />
                  </span>
                  Delete
                </button>

                <button
                  className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <span className="pt-1 pr-2">
                    <img src={editIcon} alt="edit icon" />
                  </span>
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Body */}
          {isEdit ? (
            <div className="flex flex-col bg-white w-full h-fit p-4 rounded-md mt-1">
              <textarea
                id="edit"
                className={`w-full h-[100px] border-2 border-solid border-lightGray p-6 mb-4 ${
                  error ? 'bg-paleRed' : 'bg-white'
                }`}
                onChange={(e) => setEdit(e.target.value)}
                value={edit}
              />
              <Button
                text="UPDATE"
                position="self-end"
                loading={loading}
                onClick={() => postEdit()}
              />
            </div>
          ) : (
            <div className="flex w-full h-fit pt-4 font-rubik text-grayishBlue ">
              <p>{data.comments}</p>
            </div>
          )}

          {/* Foot */}
          <div className="flex flex-row w-full h-fit mt-4">
            <div className="flex w-1/2 h-fit justify-start">
              <Vote
                data={data}
                update={update}
                setUpdate={setUpdate}
                visibility="sm:hidden block"
                user={user}
              />
            </div>
            {user?.currentUser?.id !== data.userId._id &&
              user.currentUser !== null && (
                <div className="flex w-full h-fit justify-end sm:hidden mt-3">
                  <button
                    className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                    onClick={() => {
                      setIsReply(!isReply);
                      setRepliedUser(data.userId.username);
                    }}
                  >
                    <span className="pt-1 pr-2">
                      <img src={replyIcon} alt="reply icon" />
                    </span>
                    Reply
                  </button>
                </div>
              )}
            {user?.currentUser?.id === data.userId._id && (
              <div className="flex w-1/2 h-fit justify-end mt-3 sm:hidden">
                <button
                  className="flex flex-row bg-transparent pl-1 pr-1 hover:opacity-50 font-medium h-fit w-fit text-rubik text-softRed"
                  onClick={() => {
                    setDeleteModal(true);
                    setDeleteId(data._id);
                  }}
                >
                  <span className="pt-1 pr-2">
                    <img src={deleteIcon} alt="delete icon" />
                  </span>
                  Delete
                </button>

                <button
                  className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <span className="pt-1 pr-2">
                    <img src={editIcon} alt="edit icon" />
                  </span>
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isReply && (
        <AddReply
          comment={data}
          setUpdate={setUpdate}
          update={update}
          setIsReply={setIsReply}
          repliedUser={repliedUser}
        />
      )}
      <Reply
        data={data}
        user={user}
        update={update}
        setUpdate={setUpdate}
        setDeleteReplyModal={setDeleteReplyModal}
        setDeleteReplyId={setDeleteReplyId}
        setCommentId={setCommentId}
        repliedUser={repliedUser}
      />
    </div>
  );
}

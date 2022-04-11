import userImage from '../../assets/Images/image-maxblagun.png';
import moment from 'moment';
import deleteIcon from '../../assets/Images/icon-delete.svg';
import editIcon from '../../assets/Images/icon-edit.svg';
import axios from 'axios';
import { useState } from 'react';
import Button from '../Button';
import replyIcon from '../../assets/Images/icon-reply.svg';
import VoteReply from '../VoteReply';
import AddReply from '../AddReply';

export default function Reply({
  data,
  user,
  update,
  setUpdate,
  setDeleteReplyModal,
  setDeleteReplyId,
  setCommentId,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [isReply, setIsReply] = useState(null);
  const [repliedUser, setRepliedUser] = useState(null);

  const postEdit = async () => {
    setLoading(true);
    await axios
      .put(
        `https://lnwics-api.herokuapp.com/api/comments/${data._id}/replies/${replyId}`,
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
    <div className="flex w-full h-fit pl-0 sm:pl-10 mb-5">
      <div className="flex flex-col w-full border-l-2 border-black/10 gap-0 pl-3 sm:pl-7">
        {data?.replies?.map((reply) => {
          return (
            <div
              key={reply._id}
              className="flex flex-row h-fit w-full rounded-md p-2 bg-white mt-5"
            >
              <div className="flex w-fit h-fit sm:pl-4 sm:mr-2">
                <VoteReply
                  data={data}
                  replyData={reply}
                  update={update}
                  setUpdate={setUpdate}
                  visibility="sm:block hidden"
                  user={user}
                />
              </div>
              <div className="flex-col bg-white w-full h-fit p-4 rounded-md mb-5">
                {/* Head */}
                <div className="flex w-full h-fit">
                  <div className="flex flex-row w-full h-fit">
                    <img alt="user" src={userImage} className="h-[30px]" />
                    <h1 className="font-rubik text-black font-medium pl-3  pr-2 text-[16px] mt-auto mb-auto">
                      {reply?.userId.username}
                    </h1>
                    {user?.currentUser?.username === reply?.userId.username && (
                      <div className="bg-moderateBlue text-white pr-1 pl-1 rounded-sm mt-1 h-fit w-fit font-rubik text-[15px]">
                        you
                      </div>
                    )}
                    <h1 className="font-rubik text-grayishBlue font-normal pl-2 pr-4 text-[16px] mt-auto mb-auto">
                      {moment(reply?.date).fromNow()}
                    </h1>
                  </div>
                  {user?.currentUser?.id !== reply.userId._id &&
                    user.currentUser !== null && (
                      <div className="hidden w-full h-fit justify-end sm:flex">
                        <button
                          onClick={() => {
                            setIsReply(!isReply);
                            setRepliedUser(reply.userId.username);
                          }}
                          className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                        >
                          <span className="pt-1 pr-2">
                            <img src={replyIcon} alt="reply icon" />
                          </span>
                          <a href="#add-reply">Reply</a>
                        </button>
                      </div>
                    )}
                  {user?.currentUser?.id === reply.userId._id && (
                    <div className="hidden w-full h-fit justify-end mt-0 sm:flex">
                      <button
                        className="flex flex-row bg-transparent pl-1 pr-1 hover:opacity-50 font-medium h-fit w-fit text-rubik text-softRed"
                        onClick={() => {
                          setDeleteReplyModal(true);
                          setDeleteReplyId(reply._id);
                          setCommentId(data._id);
                        }}
                      >
                        <span className="pt-1 pr-2">
                          <img src={deleteIcon} alt="delete icon" />
                        </span>
                        Delete
                      </button>

                      <button
                        className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                        onClick={() => {
                          setEdit(reply.comments);
                          setIsEdit(!isEdit);
                          setReplyId(reply._id);
                        }}
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
                {isEdit && replyId === reply._id ? (
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
                      onClick={() => {
                        postEdit();
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex w-full h-fit pt-4 font-rubik text-grayishBlue ">
                    <p>
                      <span className="text-moderateBlue font-rubik font-medium">
                        {reply?.comments.split(' ')[0]}
                      </span>{' '}
                      {reply?.comments.split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                )}

                {/* Foot */}
                <div className="flex flex-row w-full h-fit mt-4">
                  <div className="flex w-1/2 h-fit justify-start">
                    <VoteReply
                      data={data}
                      replyData={reply}
                      update={update}
                      setUpdate={setUpdate}
                      visibility="sm:hidden block"
                      user={user}
                    />
                  </div>
                  {user?.currentUser?.id !== reply?.userId._id &&
                    user.currentUser !== null && (
                      <div className="flex w-full h-fit justify-end sm:hidden mt-3">
                        <button
                          onClick={() => {
                            setIsReply(!isReply);
                            setRepliedUser(reply.userId.username);
                          }}
                          className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                        >
                          <span className="pt-1 pr-2">
                            <img src={replyIcon} alt="reply icon" />
                          </span>
                          <a href="#add-reply">Reply</a>
                        </button>
                      </div>
                    )}
                  {user?.currentUser?.id === reply?.userId._id && (
                    <div className="flex w-1/2 h-fit justify-end mt-3 sm:hidden">
                      <button
                        className="flex flex-row bg-transparent pl-1 pr-1 hover:opacity-50 font-medium h-fit w-fit text-rubik text-softRed"
                        onClick={() => {
                          setDeleteReplyModal(true);
                          setDeleteReplyId(reply._id);
                          setCommentId(data._id);
                        }}
                      >
                        <span className="pt-1 pr-2">
                          <img src={deleteIcon} alt="delete icon" />
                        </span>
                        Delete
                      </button>

                      <button
                        className="flex flex-row bg-transparent pl-1 pr-1 ml-2 hover:opacity-50 font-medium h-fit w-fit text-rubik text-moderateBlue"
                        onClick={() => {
                          setIsEdit(!isEdit);
                          setReplyId(reply._id);
                          setEdit(reply.comments);
                        }}
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
          );
        })}
        {isReply && (
          <AddReply
            comment={data}
            setUpdate={setUpdate}
            update={update}
            setIsReply={setIsReply}
            repliedUser={repliedUser}
          />
        )}
      </div>
    </div>
  );
}

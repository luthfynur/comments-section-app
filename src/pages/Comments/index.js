import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CommentsContainer from '../../components/CommentsContainer';
import AddComment from '../../components/AddComment';
import DeleteModal from '../../components/DeleteModal';
import DeleteReplyModal from '../../components/DeleteReplyModal';

export default function Comments({ user, setUser }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteReplyModal, setDeleteReplyModal] = useState(false);
  const [deleteReplyId, setDeleteReplyId] = useState(null);
  const [commentId, setCommentId] = useState(null);

  const deleteComment = async () => {
    await axios
      .delete(`https://lnwics-api.herokuapp.com/api/comments/${deleteId}`, {
        withCredentials: true,
      })
      .then(() => {
        setUpdate(update + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReply = async () => {
    await axios
      .delete(
        `https://lnwics-api.herokuapp.com/api/comments/${commentId}/replies/${deleteReplyId}`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setUpdate(update + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('https://lnwics-api.herokuapp.com/api/comments', {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          setComments(response.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchData();
  }, [update]);

  return (
    <div className={`flex bg-lightGray w-full min-h-screen h-fit`}>
      <div
        className={`${
          loading ? 'animate-pulse' : ''
        } w-full p-4 sm:pt-20 sm:pr-60 sm:pl-60`}
      >
        <Header user={user} setUser={setUser} />

        {comments === null || comments?.length < 1 ? (
          <div className="flex flex-row justify-center font-rubik font-bold mt-10 text-4xl">
            No Comments Yet
          </div>
        ) : (
          <CommentsContainer
            data={comments}
            user={user}
            update={update}
            setUpdate={setUpdate}
            setDeleteModal={setDeleteModal}
            setDeleteId={setDeleteId}
            setDeleteReplyId={setDeleteReplyId}
            setDeleteReplyModal={setDeleteReplyModal}
            setCommentId={setCommentId}
          />
        )}
        {user?.currentUser !== null && (
          <AddComment update={update} setUpdate={setUpdate} />
        )}
      </div>
      <DeleteModal
        visibility={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteComment={deleteComment}
      />
      <DeleteReplyModal
        visibility={deleteReplyModal}
        setDeleteReplyModal={setDeleteReplyModal}
        deleteReply={deleteReply}
      />
    </div>
  );
}

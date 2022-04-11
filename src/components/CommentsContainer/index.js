import Comment from '../Comment';

export default function CommentsContainer({
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
  return data.map((data) => {
    return (
      <Comment
        key={data._id}
        data={data}
        user={user}
        update={update}
        setUpdate={setUpdate}
        setDeleteModal={setDeleteModal}
        setDeleteId={setDeleteId}
        setDeleteReplyId={setDeleteReplyId}
        setDeleteReplyModal={setDeleteReplyModal}
        setCommentId={setCommentId}
      />
    );
  });
}

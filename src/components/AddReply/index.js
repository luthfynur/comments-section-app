import axios from 'axios';
import { useState } from 'react';
import Button from '../Button';
import profilIcon from '../../assets/Images/image-maxblagun.png';

export default function AddReply({
  comment,
  setUpdate,
  update,
  setIsReply,
  repliedUser,
}) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  const postReply = async (e) => {
    setLoading(true);
    await axios
      .post(
        `https://lnwics-api.herokuapp.com/api/comments/${comment._id}/replies`,
        { comments: '@' + repliedUser + ' ' + comments, date: Date.now() },
        { withCredentials: true }
      )
      .then(() => {
        setLoading(false);
        setUpdate(update + 1);
        document.getElementById('reply').value = '';
        setIsReply(false);
        setComments(null);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div
      id="add-reply"
      className="flex flex-col bg-white w-full h-fit p-4 rounded-md mt-5 mb-5"
    >
      <div className="flex">
        <img className="h-10 mr-4" src={profilIcon} alt="profil" />
        <textarea
          id="reply"
          className="w-full h-[100px] bg-white border-2 border-solid border-lightGray p-6 mb-4"
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add a reply..."
        />
      </div>

      <Button
        text="REPLY"
        position="self-end"
        loading={loading}
        onClick={(e) => postReply(e)}
      />
    </div>
  );
}

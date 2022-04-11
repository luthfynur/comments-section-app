import axios from 'axios';
import { useState } from 'react';
import Button from '../Button';
import profilIcon from '../../assets/Images/image-maxblagun.png';

export default function AddComment({ setUpdate, update }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  const postComments = async (e) => {
    setLoading(true);
    await axios
      .post(
        'https://lnwics-api.herokuapp.com/api/comments',
        { comments: comments, date: Date.now() },
        { withCredentials: true }
      )
      .then(() => {
        setLoading(false);
        setUpdate(update + 1);
        document.getElementById('comment').value = '';
        setComments(null);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col bg-white w-full h-fit p-4 rounded-md mt-10">
      <div className="flex">
        <img className="h-10 mr-4" src={profilIcon} alt="profil" />
        <textarea
          id="comment"
          className="w-full h-[100px] bg-white border-2 border-solid border-lightGray p-6 mb-4"
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add a comment..."
        />
      </div>

      <Button
        text="SEND"
        position="self-end"
        loading={loading}
        onClick={(e) => postComments(e)}
      />
    </div>
  );
}

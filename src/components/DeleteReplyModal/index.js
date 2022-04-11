export default function DeleteReplyModal({
  visibility,
  setDeleteReplyModal,
  deleteReply,
}) {
  return (
    <div
      className={`fixed h-screen w-screen bg-black/40 ${
        visibility ? 'block z-50' : 'hidden z-0'
      }`}
    >
      <div className="flex h-screen w-screen bg-transparent justify-center items-center">
        <div className="bg-white rounded-md h-fit w-[80vw] sm:w-[40vw] p-4">
          <h1 className="text-black font-rubik font-bold text-[20px]">
            Delete comment
          </h1>
          <p className="mt-2 text-grayishBlue font-rubik text-[18px] text-left">
            Are you sure want to delete this comment? This will remove the
            comment and can't be undone
          </p>
          <div className="flex flex-row h-fit w-full gap-3 mt-2">
            <button
              onClick={() => setDeleteReplyModal(false)}
              className="hover:opacity-50 w-1/2 h-fit p-2 bg-grayishBlue text-white font-rubik font-medium rounded-md"
            >
              NO, CANCEL
            </button>
            <button
              onClick={() => {
                setDeleteReplyModal(false);
                deleteReply();
              }}
              className="hover:opacity-50 w-1/2 h-fit p-2 bg-softRed text-white font-rubik font-medium rounded-md"
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

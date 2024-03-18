import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, SetLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    SetLoading(true);
    axios
      .get(`http://localhost:4000/book/${id}`)
      .then((response) => {
        setBook(response.data);
        SetLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit-p-4">
          <div className="my-4">
            <span className="text-xl mr-4">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4">Title:</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4">Author:</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4">Description:</span>
            <span>{book.description}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4">Created:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4">Updated:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;

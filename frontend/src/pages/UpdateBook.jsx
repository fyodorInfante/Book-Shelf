import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() =>{
    setLoading(true);
    axios.get(`http://localhost:4000/book/${id}`)
    .then((response) =>{
      setAuthor(response.data.author);
      setTitle(response.data.title);
      setDescription(response.data.description);
    })
    .catch((error) =>{
      setLoading(false);
      alert('an error happened')
      console.log(error);
    })
  }, [])

  const handleBook = () => {
    const data = {
      title,
      author,
      description,
    };

    setLoading(true);

    axios
      .patch(`http://localhost:4000/book/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("an error happened!");
        console.log(error);
      });
  };

  return (
  <div className="p-4">
    <BackButton/>
    <h1 className="text-3xl my-4">Edit Book</h1>
    {loading ? <Spinner/> : ''}
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
        <label className="text-xl m-4 text-gray-500">Title</label>
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <div className="my-4">
        <label className="text-xl m-4 text-gray-500">Author</label>
        <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <div className="my-4">
        <label className="text-xl m-4 text-gray-500">Description</label>
        <textarea
        rows='4'
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>
      <button className="p-2 bg-sky-300 m-8" onClick={handleBook}>
        Save
      </button>
    </div>
  </div>
  );
}

export default UpdateBook;

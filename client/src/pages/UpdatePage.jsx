import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsById, EditBlogHandler } from "../store/action";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function UpdatePage() {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { id } = useParams();
	const { isLoading, isError, blog } = useSelector((state) => state);
	const [showResults, setShowResults] = useState(true);

	const [image, setImage] = useState(null);
	const [input, setInput] = useState({
		title: "",
		authorName: "",
		content: "",
	});

	const blogGetter = () => {
		dispatch(fetchBlogsById(id));
		setInput({
			title: blog.title,
			authorName: blog.authorName,
			content: blog.content,
			imageUrl: blog.imageUrl,
		});
	};

	useEffect(() => {
		blogGetter();
	}, [dispatch]);

	const [isErrorClient, setIsErrorClient] = useState(false);

	const [imageUrl, setImageUrl] = useState({});

	const handleEditBlog = (e) => {
		e.preventDefault();

		if (input.title === "" || input.authorName === "" || input.content === "" || imageUrl === "") {
			return setIsErrorClient(true);
		}

		const form = new FormData();
		form.append("title", input.title);
		form.append("authorName", input.authorName);
		form.append("content", input.content);
		form.append("imageUrl", imageUrl)
	
		dispatch(EditBlogHandler({form, id}));
		navigate("/");
	};

	const changeInputImage = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0]));
		}
		setShowResults(false);
		setImageUrl(e.target.files[0]);
	};

	const Results = () => (
		<div>
			<img src={input.imageUrl} className="img-fluid image-edit" alt="" />
		</div>
	);

	const changeHandler = (e, key) => {
		const newInput = { ...input };
		newInput[key] = e.target.value;
		setInput(newInput);
	};

	if (isLoading) return <h1>Loading ... </h1>;
	if (isError) return <h1>Error: {JSON.stringify(isError)}</h1>;

	return (
		<>
			<BackButton />
			<section id="add-page">
				<div className="add-page wrapper">
					<div class="container-fluid">
						<div class="card-body justify-content-start">
							{isErrorClient && <p>all field must be filled</p>}
							<div>
								<h3 className="text-center">Edit blog post</h3>
							</div>
							<form>
								<div className="form-group">
									<label className="form-label text-start">Insert Title</label>
									<input value={input.title} onChange={(e) => changeHandler(e, "title")} type="text" className="form-control border-1 rounded" />
								</div>
								<div className="form-group">
									<label className="form-label">Author Name</label>
									<input value={input.authorName} onChange={(e) => changeHandler(e, "authorName")} type="text" className="form-control border-1 rounded" />
								</div>
								<div className="form-group">
									<label className="form-label">Insert Blog Contents</label>

									<textarea
										style={{ maxWidth: "100%", minHeight: "150px", height: "100%", width: "100%" }}
										value={input.content}
										onChange={(e) => changeHandler(e, "content")}
										type="text"
										className="form-control border-1 rounded text-justify"
										
									/>
								</div>
								{ showResults ? <Results /> : null }
								<div className="form-group">
									<img src={image} className="img-fluid image-edit" alt="" />
								</div>
								<div className="form-group">
									<input type="file" accept="image/*" onChange={changeInputImage} />
								</div>
								<div className="d-flex justify-content-between">
									<Link to="/">
										<button className="btn btn-primary">Cancel</button>
									</Link>
									<button onClick={handleEditBlog} type="submit" className="btn btn-primary">
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default UpdatePage;

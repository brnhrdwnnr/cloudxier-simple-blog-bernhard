import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBlog } from "../store/action";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AddPage() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, isError } = useSelector((state) => state);
	const [input, setInput] = useState({
		title: "",
		authorName: "",
		content: "",
	});

	const [imageUrl, setImageUrl] = useState({});
	const [isErrorClient, setIsErrorClient] = useState(false);

	const handleaddBlog = () => {
		if (input.title === "" || input.authorName === "" || input.content === "" || imageUrl === "") {
			return setIsErrorClient(true);
		}

		const form = new FormData();
		form.append("title", input.title);
		form.append("authorName", input.authorName);
		form.append("content", input.content);
		form.append("imageUrl", imageUrl);

		dispatch(addBlog(form));
		navigate('/')
	};

	const changeHandler = (e, key) => {
		const newInput = { ...input };
		newInput[key] = e.target.value;
		setInput(newInput);
	};
	const changeInputImage = (e) => {
		setImageUrl(e.target.files[0]);
	};

	if (isLoading) return <h1>Loading ... </h1>;
	if (isError) return <h1>Error: {JSON.stringify(isError)}</h1>;
	return (
		<>
			<Navbar />
			<section id="add-page">
				<div className="add-page wrapper">
					<div class="container-fluid">
						<div class="card-body justify-content-start">
							{isErrorClient && <p>all field must be filled</p>}
							<div>
								<h3 className="text-center mb-3">Create new blog post</h3>
							</div>
							<form>
								<div className="form-group">
									<label className="form-label text-start">Insert Title</label>
									<input value={input.title} onChange={(e) => changeHandler(e, "title")} type="text" className="form-control border-1 rounded" placeholder="Insert your blog title" />
								</div>
								<div className="form-group">
									<label className="form-label">Author Name</label>
									<input value={input.authorName} onChange={(e) => changeHandler(e, "authorName")} type="text" className="form-control border-1 rounded" placeholder="Insert author name" />
								</div>
								<div className="form-group">
									<label className="form-label">Insert Blog Contents</label>

									<textarea
										style={{ maxWidth: "100%", minHeight: "150px", height: "100%", width: "100%" }}
										value={input.content}
										onChange={(e) => changeHandler(e, "content")}
										type="text"
										className="form-control border-1 rounded text-justify"
										placeholder="Put description of your article"
									/>
								</div>
								<div className="form-group">
									<label className="form-label">Image URL</label>
									<input type="file" accept="image/*" onChange={changeInputImage} />
								</div> 
								<div className="d-flex justify-content-between">
									<Link to="/" smooth={true}>
										<button className="btn btn-primary">Cancel</button>
									</Link>
									<button type="submit" className="btn btn-primary" onClick={handleaddBlog}>
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

export default AddPage;

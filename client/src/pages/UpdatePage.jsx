import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBlog, fetchBlogsById, EditBlogHandler } from "../store/action";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";

function UpdatePage() {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { id } = useParams();
	const { isLoading, isError, isSuccess, blog } = useSelector((state) => state);
	const override = css`
		display: block;
		border-color: red;
		margin-top: 20%;
	`;

	const [input, setInput] = useState({
		title: "",
		authorName: "",
		content: "",
	});
	const [isErrorClient, setIsErrorClient] = useState(false); //handler client error

	const [imageUrl, setImageUrl] = useState({});

	useEffect(() => {
		dispatch(fetchBlogsById(id));
	}, []);

	useEffect(() => {
		//handler error dari server
		if (isError) {
			console.log(isError);
		}
	}, [isError]);

	useEffect(() => {
		//handler routing
		if (isSuccess) {
			navigate("/");
		}
	}, [isSuccess]);

	const handleEditBlog = (e) => {
		e.preventDefault();
		const form = new FormData();
		form.append("id", id);
		form.append("title", input.title);
		form.append("authorName", input.authorName);
		form.append("content", input.content);
		form.append("imageUrl", imageUrl);
		dispatch(EditBlogHandler(blog));
		navigate("/");
	};

	const changeInputImage = (e) => {
		setImageUrl(e.target.files[0]);
	  };

	const changeEditBlogHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		dispatch(
			setBlog({
				...blog,
				[name]: value,
			})
		);
	};

	if (isLoading) return <PropagateLoader css={override} size={40} color={"#3d2514"} />;
	if (isError) return <h1>Error: {JSON.stringify(isError)}</h1>;
	return (
		<>
			<Navbar />
			<section id="update-page">
				<div className="update-page wrapper">
					<div class="container-fluid">
						{/* <div class="card shadow mb-12"> */}
						<div class="card-body justify-content-start">
							{isErrorClient && <p>all field must be filled</p>}
							<div>
								<h3 className="text-center mb-3">Edit blog post</h3>
							</div>
							<form onSubmit={handleEditBlog} className="user">
								<div className="form-group">
									<label className="form-label text-start">Insert Title</label>
									<input name="title" value={blog.title} onChange={changeEditBlogHandler} type="text" className="form-control border-1 rounded" placeholder="Insert your blog title" />
								</div>
								<div className="form-group">
									<label className="form-label">Author Name</label>
									<input name="name" value={blog.authorName} onChange={changeEditBlogHandler} type="text" className="form-control border-1 rounded" placeholder="Insert author name" />
								</div>
								<div className="form-group">
									<label className="form-label">Insert Blog Contents</label>

									<textarea
										style={{ maxWidth: "100%", minHeight: "150px", height: "100%", width: "100%" }}
										name="content"
										value={blog.content}
										onChange={changeEditBlogHandler}
										type="text"
										className="form-control border-1 rounded text-justify"
										placeholder="Put description of your article"
									/>
								</div>
								<div className="form-group">
									<label className="form-label">Image URL</label>
									<input name="name" value={blog.imageUrl} onChange={changeEditBlogHandler} type="text" className="form-control border-1 rounded" placeholder="Insert Image URL" />
								</div>
								<div className="d-flex justify-content-between">
									<Link to="/" smooth={true}>
										<button className="btn btn-primary">Cancel</button>
									</Link>
									<button type="submit" className="btn btn-primary">
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* </div> */}
			</section>
		</>
	);
}

export default UpdatePage;

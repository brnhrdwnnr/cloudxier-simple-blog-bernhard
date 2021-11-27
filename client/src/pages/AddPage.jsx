import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBlog } from "../store/action";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";

function AddPage() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess } = useSelector((state) => state);

	const override = css`
		display: block;
		border-color: red;
		margin-top: 20%;
	`;

	const [input, setInput] = useState({
		title: "",
		authorName: "",
		content: "",
		imageUrl: "",
	});
	const [isErrorClient, setIsErrorClient] = useState(false);

	useEffect(() => {
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

	const handleaddBlog = (e) => {
		e.preventDefault();

		if (input.title === "" || input.authorName === "" || input.content === "" || input.imageUrl === "") {
			return setIsErrorClient(true);
		}
		dispatch(addBlog(input));
	};

	const changeaddBlogHandler = (e) => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value,
		});
	};

	if (isLoading) return <PropagateLoader css={override} size={40} color={"#3d2514"} />;
	if (isError) return <h1>Error: {isError.message}</h1>;
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
							<form onSubmit={handleaddBlog}>
								<div className="form-group">
									<label className="form-label text-start">Insert Title</label>
									<input name="title" value={input.title} onChange={changeaddBlogHandler} type="text" className="form-control border-1 rounded" placeholder="Insert your blog title" />
								</div>
								<div className="form-group">
									<label className="form-label">Author Name</label>
									<input name="authorName" value={input.authorName} onChange={changeaddBlogHandler} type="text" className="form-control border-1 rounded" placeholder="Insert author name" />
								</div>
								<div className="form-group">
									<label className="form-label">Insert Blog Contents</label>

									<textarea
										style={{ maxWidth: "100%", minHeight: "150px", height: "100%", width: "100%" }}
										name="content"
										value={input.content}
										onChange={changeaddBlogHandler}
										type="text"
										className="form-control border-1 rounded text-justify"
										placeholder="Put description of your article"
									/>
								</div>
								<div className="form-group">
									<label className="form-label">Image URL</label>
									<input name="imageUrl" value={input.imageUrl} onChange={changeaddBlogHandler} type="file" accept="image/*" className="form-control border-1 rounded" placeholder="Insert Image URL" />
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
			</section>
		</>
	);
}

export default AddPage;

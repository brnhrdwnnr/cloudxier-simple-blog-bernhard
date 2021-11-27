import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsById, deleteBlogHandler } from "../store/action";
import Swal from "sweetalert2";


function Detail() {
	const { id } = useParams();
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isError, blogs, blog } = useSelector((state) => state);

	const handleEdit = (id) => {
		navigate(`/edit/${id}`);
	};

	const handleDelete = (id) => {
		dispatch(deleteBlogHandler({ blogs, id }));
		navigate("/");
	};
	useEffect(() => {
		dispatch(fetchBlogsById(id));
	}, []);

	if (isLoading) return <h1>Loading ... </h1>;
	if (isError) return <h1>Error: {JSON.stringify(isError)}</h1>;

	return (
		<>
			<BackButton />

			<section id="all-blogs">
				<div className="all-blogs wrapper">
					<br />
					<h5> Blog Posts - Featured Home</h5>
					<div className="container">
						<div className="row align-items-between">
							<div className="col-sm-7">
								<div className="card border-0">
									<img src={blog.imageUrl} alt="" />
								</div>
							</div>
							<div className="col-lg-5 col-md-12 text-sec align-items-between">
								<div className="d-flex justify-content-between">
									<h2>{blog.title}</h2>
									<i className="far fa-heart love fa-2x"></i>
								</div>

								<p>{blog.content}</p>
								<div className="d-flex justify-content-between">
									<button onClick={() => handleEdit(blog.id)} className="main-btn mt-4">
										Edit Blog
									</button>
									<button onClick={() => handleDelete(blog.id)} className="main-btn mt-4">
										Delete Blog
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Detail;

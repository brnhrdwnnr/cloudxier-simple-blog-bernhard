import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsById } from "../store/action";

function Detail() {
	const { id } = useParams();
	let navigate = useNavigate();

	const dispatch = useDispatch();
	const { blog } = useSelector((state) => state);

	const handleEdit = (id) => {
		navigate(`/edit/${id}`);
	};

	const handleDelete = (id) => {
		navigate(`/detail/${id}`);
	};
	useEffect(() => {
		dispatch(fetchBlogsById(id));
	}, []);

	return (
		<>
			<BackButton />
			<section id="detail">
				<div className="detail-section wrapper">
					<br />
					<h5> Blog Posts > Featured Home</h5>
					<div className="container">
						<div className="row align-items-between">
							<div className="col-lg-7 col-md-12 mb-lg-0 mb-5">
								<div className="card border-0">
									<img src={blog.imageUrl} alt="" />
								</div>
							</div>
							<div className="col-lg-5 col-md-12 text-sec align-items-between">
								<div className="d-flex justify-content-between">
									<h2>{blog.title}</h2>
									<i className="far fa-heart love fa-2x"></i>
								</div>

								<p>
								{blog.content}
								</p>
								<div className="d-flex justify-content-between">
									<button onClick={() => handleEdit(blog.id)} className="main-btn mt-4">Edit Blog</button>
									<button onClick={() => handleDelete(blog.id)} className="main-btn mt-4">Delete Blog</button>
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

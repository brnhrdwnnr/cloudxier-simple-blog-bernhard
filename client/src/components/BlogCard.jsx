import React from "react";
import { useNavigate } from "react-router-dom";

function BlogCard(props) {
	let navigate = useNavigate();
	const handleDetail = (id) => {
		navigate(`/detail/${id}`);
	};

	return (
		<div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
			<div className="card">
				<img onClick={() => handleDetail(props.data.id)} src={props.data.imageUrl} className="img-fluid image-card" alt="" />
				<div className="pt-3">
					<div className="d-flex justify-content-between">
						<h4>{props.data.title}</h4>
						<i styles={{ size: "17px" }} className="fas fa-ellipsis-v"></i>
					</div>
					<div className="d-flex justify-content-between">
						<p>{props.data.Comments?.length} comments</p>
						<p>By {props.data.authorName}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BlogCard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

function BlogCard(props) {
	let navigate = useNavigate();
	const handleDetail = (id) => {
		navigate(`/detail/${id}`);
	};
	const [loading, setLoading] = useState(false);
	const override = css`
		display: block;
		border-color: red;
		margin-top: 20%;
	`;
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	return (
		<div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
			{loading ? (
				<PropagateLoader css={override} size={40} color={"#3d2514"} loading={loading} />
			) : (
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
			)}
		</div>
	);
}

export default BlogCard;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchBlogs } from "../store/action";
import BlogCard from "../components/BlogCard";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";

function Home() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isError } = useSelector((state) => state);
	const { blogs } = useSelector((state) => state);

	const override = css`
	display: block;
	border-color: red;
	margin-top: 20%;
`;

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

	if (isLoading) return <PropagateLoader css={override} size={40} color={"#3d2514"} />;
	if (isError) return <h1>Error: {JSON.stringify(isError)}</h1>;

	return (
		<>
			<Navbar />
			<section id="all-blogs">
				<div className="all-blogs wrapper">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div className="text-content text-center">
									<h3>Recent Articles</h3>
								</div>
							</div>
						</div>
						<div className="row pt-3">
							{blogs?.map((blog) => {
								return <BlogCard key={blog.id} data={blog} />;
							})}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Home;

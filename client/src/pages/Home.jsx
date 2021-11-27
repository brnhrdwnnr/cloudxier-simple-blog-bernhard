import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchBlogs } from "../store/action";
import BlogCard from "../components/BlogCard";

function Home() {
	const dispatch = useDispatch();
	const { isLoading, isError } = useSelector((state) => state);
	const { blogs } = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

	if (isLoading) return <h1>Loading ... </h1>;
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

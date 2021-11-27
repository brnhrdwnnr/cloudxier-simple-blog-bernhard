import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchBlogs } from "../store/action";
import BlogCard from "../components/BlogCard";

function Home() {
	const dispatch = useDispatch();
	const { blogs } = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

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
							{blogs.map((blog) => {
								return <BlogCard key={blog.id} data={blog} />;
							})}
							{/* <div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
								<div className="card">
									<img src="https://www.smalldesignideas.com/wp-content/uploads/2018/09/57-12.jpg" className="img-fluid image-card" alt="" />
									<div className="pt-3">
										<div className="d-flex justify-content-between">
											<h4>Turning 150 square feet apartment into minimalist homes</h4>
											<i styles={{ size: "17px" }} className="fas fa-ellipsis-v"></i>
										</div>
										<div className="d-flex justify-content-between">
											<p>8 comments</p>
											<p>By Laurel Jones</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
								<div className="card">
									<img src="https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.405magazine.com/content/uploads/2021/10/k/p/mbedroom-51-1024x819.jpg" className="img-fluid image-card" alt="" />
									<div className="pt-3">
										<div className="d-flex justify-content-between">
											<h4>Home office in the heart of city</h4>
											<i className="fas fa-ellipsis-v"></i>
										</div>
										<div className="d-flex justify-content-between">
											<p>12 comments</p>
											<p>By Rose</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
								<div className="card">
									<img src="https://static.insideoutmagazine.ae/imgs/1319_IO_190314_HOTY_DIP_Stefan06-xlarge.jpg" className="img-fluid image-card" alt="" />
									<div className="pt-3">
										<div className="d-flex justify-content-between">
											<h4>Step inside this comfortable home</h4>
											<i className="fas fa-ellipsis-v"></i>
										</div>
										<div className="d-flex justify-content-between">
											<p>9 comments</p>
											<p>By John Doe</p>
										</div>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Home;

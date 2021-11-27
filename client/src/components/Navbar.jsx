import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<header>
			<nav className="navbar navbar-expand-lg navigation-wrap">
				<div className="container">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
						<i className="fas fa-bars"></i>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/addpage">
									Add Blog
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function BackButton() {
	return (
		<header>
			<nav className="navbar navbar-expand-lg navigation-wrap">
				<div className="container">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
						<Link className="nav-link" to="/">
							<i class="fas fa-arrow-left fa-lg"></i>
						</Link>
					</button>
				</div>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default BackButton;

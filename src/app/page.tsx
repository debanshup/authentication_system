"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
    const router = useRouter()
    function signupBtnClickHandler(): void {
        router.push('/signup')
    }
    function loginBtnClickHandler(): void {
        router.push('/login')
    }

    return (
        <div className="container-fluid bg-light vh-100 d-flex flex-column">
            {/* Hero Section */}
            <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 bg-primary text-white text-center p-5">
                <h1 className="display-3 fw-bold mb-4">Welcome to Our Platform</h1>
                <p className="lead mb-4">
                    Explore endless possibilities with our user-friendly and secure platform.
                    Join us today and unlock exclusive features.
                </p>
                <div className="d-flex gap-3">
                    <button onClick={signupBtnClickHandler} className="btn btn-light btn-lg">Sign Up</button>
                    <button onClick={loginBtnClickHandler} className="btn btn-outline-light btn-lg">Log In</button>
                </div>
            </div>

            {/* Features Section */}
            <div className="container my-5">
                <h2 className="text-center fw-bold mb-5">Why Choose Us?</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-shield-check text-success display-4 mb-3"></i>
                                <h5 className="card-title fw-bold">Secure and Reliable</h5>
                                <p className="card-text">
                                    Enjoy top-notch security and reliable services tailored to your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-people text-primary display-4 mb-3"></i>
                                <h5 className="card-title fw-bold">Connect with Others</h5>
                                <p className="card-text">
                                    Expand your network and collaborate with like-minded individuals.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-gear text-danger display-4 mb-3"></i>
                                <h5 className="card-title fw-bold">Easy to Use</h5>
                                <p className="card-text">
                                    Our platform is designed for effortless navigation and usage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-dark text-white text-center py-3">
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Our Platform. All rights reserved.
                </p>
            </footer>
        </div>

    )
}

export default Home